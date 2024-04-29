<template>
    <div v-for="(user,index) in allUsers"
    :key="index"
    >
        {{ user.username }}
        <img class="w-32 h-32" :src="user.image" alt="User Image">
    
    </div>
    </template>
    <script setup>
    import {ref,onMounted} from "vue"
    
    
    onMounted(()=>{
        getUsers();
    });
    
    const allUsers=ref([]);
    const getUsers = async ()=>{
        try{
            const response = await fetch('http://localhost:8080/getUsers');
            const data = await response.json();
            
            for(var i =0; i < data.length ; i++){
    
                const image = await getImage(data[i].user_id);
                console.log(await convertBlob(image))
                allUsers.value.push({
                    username:data[i].username,
                    password:data[i].password,
                    image: await convertBlob(image),
                    role:data[i].role
                });
            }
    
        }
        catch(error){
    
        }
    }
    
    const getImage = async(id)=>{
        try{
            const response = await fetch(`http://localhost:8080/getUserImage/${id}`);
            const data = await response.json();
            return data[0].image.data;
            
        }
        catch(error){
            console.log("Error",error);
        }
    
    }
    
    const convertBlob = (image) => {
      return new Promise((resolve, reject) => {
        if (image) {
          const blob = new Blob([new Uint8Array(image)], { type: "image/jpeg" });
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const dataURL = reader.result;
            resolve(dataURL);
          };
        }
      });
    };
    
    
    </script>