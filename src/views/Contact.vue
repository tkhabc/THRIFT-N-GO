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
        <div class="lower-container">
        <h2 class="text-decoration-underline">Address</h2>
        <h4>42, Jalan Ampang, Kuala Lumpur, 50450, Wilayah Persekutuan Kuala Lumpur. Malaysia</h4>
        <h2 class="text-decoration-underline">Email</h2>
        <h4>thriftngo@gmail.com</h4>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container class="lowest-container">
    <v-row>
      <v-col>
        <div class="lowest-container">
        <h2 class="text-decoration-underline">Follow Our Socials!</h2>
        <h4>Facebook, Instagram, LinkedIn</h4>
        </div>
      </v-col>
    </v-row>
  </v-container>

</template>

<style scoped>
.upper-container {
  background-color: #A7FFEB; /* Replace with your desired color */
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
  height: 40vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center;
  margin: auto;
}

.lowest-container {
  background-color: #B9F6CA; /* Replace with a different color */
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

</style>
