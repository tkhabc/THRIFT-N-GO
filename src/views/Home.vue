<template>
    <div class="home">
      <img alt="Thrift N Go logo" src="../assets/food.jpg">
      <HelloWorld msg="Welcome to Thrift N Go"/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  
  export default {
    name: 'Home',
    components: {
      HelloWorld
    }
  }
  </script>