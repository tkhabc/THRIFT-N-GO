<template>
  <v-container class="upper-container">
    <v-row>
      <v-col>
        <div class="upper-container">
        <h1>Get In Touch</h1>
        <h3>If you've got any questions, feel free to drop us an email. We will get back to you soon asap!</h3>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="lower-container">
    <v-row>
      <v-col>
        <h2 class="text-decoration-underline">Address</h2>
        <p>xxxxxxx</p>
        <h2 class="text-decoration-underline">Email</h2>
        <p>thriftngo@gmail.com</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.upper-container {
  background-color: #00695C; /* Replace with your desired color */
  padding: 20px;
  height: 30vh;
  width: 100%; /* This makes the div full width */
  margin: 0;
  padding: 0;
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center;
  margin: auto;
}

.lower-container {
  background-color: #FFFFFF; /* Replace with a different color */
  padding: 20px;
  height: 70vh;
}
</style>
