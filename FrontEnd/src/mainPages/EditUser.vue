<template>
    <div>
      <!-- Your form inputs here for updating user data -->
      <input v-model="userId" placeholder="ID">

      <input v-model="username" placeholder="Username">
      <input v-model="password" placeholder="Password">
      <input v-model="role" placeholder="Role">
      <button @click="updateUser">Update User</button>
      <button @click="deleteUserByID">Delete User</button>

    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const userId = ref(); 
  
  const username = ref('');
  const password = ref('');
  const role = ref('');
  
  const updateUser = async () => {
    try {
      const updatedUserData = {
        username: username.value,
        password: password.value,
        role: role.value
      };
      await axios.put(`http://localhost:8080/updateUser/${userId.value}`, updatedUserData);

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  
  const deleteUserByID = async () => {
  try {
    await axios.delete(`http://localhost:8080/deleteUserByID/${userId.value}`);
  } 
  catch (error) {
    console.error('Error deleting user:', error);
  }
};
  </script>
  