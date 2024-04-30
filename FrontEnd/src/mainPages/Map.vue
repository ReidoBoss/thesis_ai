<template>
    <div>
      <input type="text" v-model="searchInput" placeholder="Enter a location">
      <button @click="searchLocation">Search</button>
      <div id="map" style="height: 400px;"></div>
      <div v-if="searchResults.length > 0">
        <h2>Search Results:</h2>
        <ul>
          <li v-for="result in searchResults" :key="result.place_id">
            {{ result.display_name }} ({{ result.lat }}, {{ result.lon }})
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Define a reactive variable for the search input
  const searchInput = ref('');
  
  // Define a reactive variable for the search results
  const searchResults = ref([]);
  
  // Variable to store the map instance
  let mapInstance = null;
  
  // Function to search for a location
  const searchLocation = () => {
    // Add more details to the search query for better precision
    const searchQuery = encodeURIComponent(searchInput.value);
    fetch(`https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json`)
      .then(response => response.json())
      .then(data => {
        // Update the searchResults variable with the API response
        searchResults.value = data;
        // If there are search results, show the map
        if (data.length > 0) {
          const { lat, lon } = data[0];
          showMap(lat, lon);
        }
      })
      .catch(error => {
        console.error("Error searching location:", error);
      });
  };
  
  // Function to show the map with a marker at the specified coordinates
  const showMap = (lat, lon) => {
    // Remove existing map instance if it exists
    if (mapInstance !== null) {
      mapInstance.remove();
    }
  
    // Initialize the map with center coordinates
    mapInstance = L.map('map').setView([lat, lon], 15);
  
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);
  
    // Add a marker at the specified coordinates
    L.marker([lat, lon]).addTo(mapInstance)
      .bindPopup('Your Location')
      .openPopup();
  };
  </script>
  
  <style>
  #map {
    width: 100%;
  }
  </style>
  