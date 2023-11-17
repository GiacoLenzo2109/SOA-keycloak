<script lang="ts">
    export default {
        props: {
            buttonText: {
            type: String, // You can specify the prop type
            default: 'Button', // Default text if not provided
            },
        },
    };
</script>

<template>
    <button class="button">{{buttonText}}</button>
</template>
  
  <style scoped>
  .button {
    background-color: #3498db; /* Blue pastel background color */
    color: #fff; /* White text color */
    border: none;
    border-radius: 5px; /* Rounded corners */
    padding: 10px 20px; /* Adjust padding as needed */
    font-weight: bold; /* Bold text */
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .button:hover {
    background-color: #2980b9; /* Darker shade on hover */
  }
  </style>
  