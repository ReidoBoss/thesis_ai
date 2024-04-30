<template>
  <div>
    <!-- User input -->
    <input v-model="newSentence" placeholder="Enter a sentence">
    <button @click="classifySentence">Classify</button>
    
    <!-- Display prediction -->
    <div v-if="prediction !== null">
      <p>{{ prediction }}</p>
    </div>

    <!-- Progress bar -->
    <div>
      <p>Training progress: {{ trainingProgress }}%</p>
      <div class="progress-bar">
        <div class="progress" :style="{ width: trainingProgress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as tf from '@tensorflow/tfjs';
import { ref, onMounted } from "vue";

const dataset = ref([]); 
const vocabulary = new Map(); 
let index = 1; 
let model; 
let trainingProgress = ref(0); 

onMounted(async () => {
  model = await getDataset();
  classifySentence();
});


const getDataset = async () => {
  try {
    const response = await fetch('http://localhost:8080/getDataset');
    const data = await response.json();
    
    dataset.value = data.map(item => ({
      text: item.text,
      label: parseInt(item.target)  // Convert label to integer
    }));

    dataset.value.forEach(item => {
      const inputTokens = item.text.toLowerCase().split(" ");
      inputTokens.forEach(token => {
        if (!vocabulary.has(token)) {
          vocabulary.set(token, index++);
        }
      });
    });

    let model;
    const storedModel = localStorage.getItem("model");
    if (storedModel) {
      // If a model is found in local storage, deserialize it
      model = await tf.loadLayersModel(JSON.parse(storedModel));
    } else {
      model = tf.sequential();
      model.add(tf.layers.embedding({inputDim: vocabulary.size, outputDim: 16, inputLength: 5}));
      model.add(tf.layers.lstm({ units: 32, returnSequences: true }));
      model.add(tf.layers.dropout(0.5));
      model.add(tf.layers.lstm({ units: 32 }));
      model.add(tf.layers.dropout(0.5));
      model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
      model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
      await trainModel(model);
      // Serialize the model before storing it in local storage
      localStorage.setItem("model", JSON.stringify(await model.save()));
    }

    return model; 
  } catch (error) {
    console.error("Error fetching dataset:", error);
  }
};


const trainModel = async (model) => {
  const maxSequenceLength = 5;
  const processedDataset = dataset.value.map(item => {
    const inputTokens = item.text.toLowerCase().split(" ");
    const paddedTokens = inputTokens.slice(0, maxSequenceLength).concat(Array.from({ length: maxSequenceLength - inputTokens.length }, () => 0));
    const numericTokens = paddedTokens.map(token => vocabulary.has(token) ? vocabulary.get(token) : 0); // Convert tokens to numeric indices
    return {
      input: numericTokens,
      output: item.label
    };
  });

  const splitIndex = Math.floor(processedDataset.length * 0.8);
  const trainData = processedDataset.slice(0, splitIndex);
  const testData = processedDataset.slice(splitIndex);

  const trainXs = tf.tensor2d(trainData.map(item => item.input));
  const trainYs = tf.tensor1d(trainData.map(item => item.output));
  const testXs = tf.tensor2d(testData.map(item => item.input));
  const testYs = tf.tensor1d(testData.map(item => item.output));

  await model.fit(trainXs, trainYs, {
    epochs: 50,
    validationData: [testXs, testYs],
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        trainingProgress.value = ((epoch + 1) / 50) * 100;
      }
    }
  });
  console.log('Model training complete!');
};

// Function to classify a new sentence
let newSentence = '';
let prediction = null;

const classifySentence = async () => {
  const processedInput = newSentence.toLowerCase().split(" ");
  const maxSequenceLength = 5; // Maximum length of input sequences
  const paddedTokens = processedInput.slice(0, maxSequenceLength).concat(Array.from({ length: maxSequenceLength - processedInput.length }, () => 0));
  const numericTokens = paddedTokens.map(token => vocabulary.has(token) ? vocabulary.get(token) : 0); // Convert tokens to numeric indices
  const inputTensor = tf.tensor2d([numericTokens]);
  const result = model.predict(inputTensor);
  const rawPrediction = result.dataSync()[0];
  console.log(newSentence,":", rawPrediction); // Print raw prediction for debugging
  prediction = rawPrediction > 0.5 ? "About a disaster" : "Not about a disaster";
};
</script>

<style scoped>
/* Style for progress bar */
.progress-bar {
  width: 100%;
  background-color: #f0f0f0;
}

.progress {
  height: 20px;
  background-color: #7983ff;
}
</style>
