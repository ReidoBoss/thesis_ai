<template>
  <div>
    <!-- User input -->
    <input v-model="newSentence" placeholder="Enter a sentence">
    <button @click="classifySentence">Classify</button>
    
    <!-- Display prediction -->
    <div v-if="prediction !== null">
      <p>{{ prediction }}</p>
    </div>
  </div>
</template>

<script setup>
import * as tf from '@tensorflow/tfjs';
import { ref, onMounted } from "vue";

const dataset = ref([]); // Dataset
const vocabulary = new Map(); // Vocabulary mapping words to numeric indices
let index = 1; // Start index from 1 to reserve 0 for padding
let model; // Define model globally

// Fetch dataset on component mount
onMounted(async () => {
  model = await getDataset();
  classifySentence();
});

// Function to fetch dataset and return the model
const getDataset = async () => {
  try {
    const response = await fetch('http://localhost:8080/getDataset');
    const data = await response.json();
    
    dataset.value = data.map(item => ({
      text: item.text,
      label: item.target
    }));

    // Preprocess text data and vocabulary creation
    dataset.value.forEach(item => {
      const inputTokens = item.text.toLowerCase().split(" ");
      inputTokens.forEach(token => {
        if (!vocabulary.has(token)) {
          vocabulary.set(token, index++);
        }
      });
    });

    // Define the model architecture
    const model = tf.sequential();
    model.add(tf.layers.embedding({inputDim: vocabulary.size, outputDim: 16, inputLength: 5}));
    model.add(tf.layers.lstm({ units: 32, returnSequences: true }));
    model.add(tf.layers.dropout(0.5));
    model.add(tf.layers.lstm({ units: 32 }));
    model.add(tf.layers.dropout(0.5));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    // Compile the model
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

    // Train the model after fetching the dataset
    await trainModel(model);
    
    return model; // Return the model
  } catch (error) {
    console.error("Error fetching dataset:", error);
  }
};

// Train the model
const trainModel = async (model) => {
  // Preprocess dataset
  const maxSequenceLength = 5; // Maximum length of input sequences
  const processedDataset = dataset.value.map(item => {
    const inputTokens = item.text.toLowerCase().split(" ");
    const paddedTokens = inputTokens.slice(0, maxSequenceLength).concat(Array.from({ length: maxSequenceLength - inputTokens.length }, () => 0));
    const numericTokens = paddedTokens.map(token => vocabulary.has(token) ? vocabulary.get(token) : 0); // Convert tokens to numeric indices
    return {
      input: numericTokens,
      output: item.label
    };
  });

  // Split dataset into training and validation sets
  const splitIndex = Math.floor(processedDataset.length * 0.8);
  const trainData = processedDataset.slice(0, splitIndex);
  const testData = processedDataset.slice(splitIndex);

  // Convert dataset to tensors
  const trainXs = tf.tensor2d(trainData.map(item => item.input));
  const trainYs = tf.tensor1d(trainData.map(item => item.output));
  const testXs = tf.tensor2d(testData.map(item => item.input));
  const testYs = tf.tensor1d(testData.map(item => item.output));

  // Train the model
  await model.fit(trainXs, trainYs, { epochs: 50, validationData: [testXs, testYs] });
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
