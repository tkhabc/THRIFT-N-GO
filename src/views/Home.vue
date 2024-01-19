<template>
    <div class="home">
      <img alt="Thrift N Go logo" src="../assets/food.jpg">
      <HelloWorld msg="Welcome to Thrift N Go"/>
    </div>

    <img alt="Thrift N Go Logo" src="../assets/ThriftNGoLogo.png">

  </template>

<script setup>
  import { FwbImg } from 'flowbite-vue'
</script>

  <script>
  
  import HelloWorld from '@/components/HelloWorld.vue'
  export default {
    name: 'Home',
    components: {
      HelloWorld
    }
  }
  </script>