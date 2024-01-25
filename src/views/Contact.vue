<template>
  <v-container>
    <!-- Header Section -->
    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="8">
        <v-card class="elevation-12" color="#A7FFEB">
          <v-card-title class="justify-center">
            <h1 class="display-1">Get In Touch</h1>
          </v-card-title>
          <v-card-subtitle class="pb-4 text-center">
            If you've got any questions, feel free to drop us an email. We'll get back to you ASAP!
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contact Information Section -->
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card color="#FFFFFF" class="mb-4">
          <v-card-title>Address</v-card-title>
          <v-card-text>
            42, Jalan Ampang, Kuala Lumpur, 50450, Wilayah Persekutuan Kuala Lumpur, Malaysia
          </v-card-text>
        </v-card>

        <v-card color="#FFFFFF" class="mb-4">
          <v-card-title>Email</v-card-title>
          <v-card-text>
            <a href="mailto:thriftngo@gmail.com">thriftngo@gmail.com</a>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card color="#B9F6CA">
          <v-card-title>Follow Our Socials!</v-card-title>
          <v-card-text>
            <v-chip-group row>
              <v-chip color="blue" text-color="white" href="https://www.facebook.com" target="_blank">Facebook</v-chip>
              <v-chip color="pink" text-color="white" href="https://www.instagram.com" target="_blank">Instagram</v-chip>
              <v-chip color="blue darken-2" text-color="white" href="https://www.linkedin.com" target="_blank">LinkedIn</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.upper-container {
  background-color: #A7FFEB; /* Soft teal for a refreshing look */
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.upper-container h1 {
  color: #005F73; /* Darker teal for contrast */
  font-size: 2.5em;
}

.upper-container h3 {
  color: #003D5B; /* Deep blue for emphasis */
  max-width: 600px; /* Constrains the text width for readability */
}

.lower-container, .lowest-container {
  background-color: #FFFFFF; /* Clean white background */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.lower-container h2, .lowest-container h2 {
  color: #007F5F; /* Rich green for headings */
  font-size: 2em;
  margin-bottom: 0.5em;
}

.lower-container h4, .lowest-container h4 {
  color: #2B7A78; /* Soft green for a calming effect */
  font-size: 1.2em;
}

.v-card {
  border-radius: 10px; /* Rounded corners for cards */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.v-btn {
  background-color: #005F73; /* Teal button for action */
  color: white;
}

.v-chip {
  margin: 0 5px; /* Spacing between chips */
}

.summary-title, .summary-text {
  background-color: #1A6757; /* Deep green for summary */
  color: white;
  padding: 10px;
  border-radius: 5px; /* Rounded corners for summary box */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .upper-container h1, .lower-container h2, .lowest-container h2 {
    font-size: 1.8em;
  }

  .lower-container h4, .lowest-container h4 {
    font-size: 1em;
  }
}
</style>

