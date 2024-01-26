<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <h1>User Profile</h1>
        <v-card>
          <v-card-text v-if="profile">
            <v-form v-if="editing">
              <v-select
                v-model="editableProfile.identity"
                :items="['User', 'Food Seller']"
                label="Please Choose Your Identity"
                required
              ></v-select>

              <v-text-field v-model="editableProfile.name" label="Name" 
              :error-messages="errors.name"></v-text-field>
              <v-text-field v-model="editableProfile.email" label="Email" @input="validateEmail" 
              :error-messages="errors.email"></v-text-field>
              <v-text-field v-model="editableProfile.age" label="Age" @input="validateAge" 
              :error-messages="errors.age"></v-text-field>
              <v-select v-model="editableProfile.gender" :items="genderItems" label="Gender" 
              :error-messages="errors.gender"></v-select>
              <v-text-field v-model="editableProfile.address" label="Address"></v-text-field>
              <v-text-field v-model="editableProfile.dob" label="Date of Birth" @input="validateDOB" 
              :error-messages="errors.dob"></v-text-field>
              <v-text-field v-model="editableProfile.phone" label="Phone" @input="validatePhone" 
              :error-messages="errors.phone"></v-text-field>
              <v-text-field v-model="editableProfile.facebook" label="Facebook Link" @input="validateFacebook" 
              :error-messages="errors.facebook"></v-text-field>
              <v-text-field v-model="editableProfile.instagram" label="Instagram Link" @input="validateInstagram" 
              :error-messages="errors.instagram"></v-text-field>
              <v-textarea v-model="editableProfile.biodata" label="Biodata"></v-textarea>
              
              <v-btn color="primary" @click="saveProfile" :disabled="!isValid">Save</v-btn>
              <v-btn color="grey" @click="cancelEdit">Cancel</v-btn>
            </v-form>
            <div v-else>
              <v-list dense>
                <v-list-item>
                  <v-list-item-icon class="mr-40">
                    <v-icon color="green">mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="align-start">
                    <v-list-item-title>Name: {{ profile.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="green">mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="align-start">
                    <v-list-item-title>Identity: {{ profile.identity }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="green">mdi-calendar-month</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="align-start">
                    <v-list-item-title>Age: {{ profile.age }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="green">mdi-gender-male</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="align-start">
                    <v-list-item-title>Gender: {{ profile.gender }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="green">mdi-cake-variant</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="align-start">
                    <v-list-item-title>Date of Birth: {{ profile.dob }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="green">mdi-phone</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="align-start">
                    <v-list-item-title>Contact Number: {{ profile.phone }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="green">mdi-email</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="align-start">
                    <v-list-item-title>Email: {{ profile.email }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="green">mdi-map-marker</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="align-start" >
                    <v-list-item-title>Address: {{ profile.address }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="green">mdi-facebook</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="align-start">
                    <v-list-item-title>Facebook Link: {{ profile.facebook }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="green">mdi-instagram</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="align-start">
                    <v-list-item-title>Instagram Link: {{ profile.instagram }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="green">mdi-file-document</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="align-start">
                    <v-list-item-title>About Me: {{ profile.biodata }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <!-- Repeat for Age, Address, Date of Birth, etc. -->
                <!-- Use appropriate icons and colors for each -->
                <br><br>
              </v-list>
              <v-btn color="secondary" @click="editProfile">Edit Profile</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

  <script>
  import UserServices from '@/firebase/userService'
  import { auth } from '@/firebase/firebaseInit'
  
  export default {
    name: 'UserProfile',
    
    data() {
      return {
        profile: null,
        editableProfile: null,
        editing: false,
        errors: {},
        userId: null,
        genderItems: ['Male', 'Female', 'Other'],
        identity:'',
      };
    },
    computed: {
      isValid() {
        return Object.keys(this.errors).length === 0;
      }
    },
    methods: {
      async fetchProfileData() {
        if (this.userId) {
          try {
            this.profile = await UserServices.getUserData(this.userId);
            this.editableProfile = {...this.profile};
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        } else {
          console.error('No user ID available');
        }
      },
      editProfile() {
        this.editing = true;
        this.editableProfile = {...this.profile}; // Clone profile for editing
        this.errors = {};
      },
      async saveProfile() {
        if (this.isValid) {
          try {
            await UserServices.updateUserData(this.userId, this.editableProfile);
            this.profile = {...this.editableProfile};
            this.editing = false;
          } catch (error) {
            console.error('Error updating profile:', error);
          }
        }
      },
      cancelEdit() {
        this.editing = false;
      },
      validateEmail() {
        if (!this.editableProfile.email || !/\S+@\S+\.\S+/.test(this.editableProfile.email)) {
          this.errors.email = 'Please enter a valid email.';
        } else {
          delete this.errors.email;
        }
      },
      validateAge() {
      if (!this.editableProfile.age || isNaN(this.editableProfile.age)) {
        this.errors.age = 'Please enter a valid age.';
      } else {
        delete this.errors.age;
      }
    },
    validateDOB() {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(this.editableProfile.dob)) {
        this.errors.dob = 'Please enter a valid date in YYYY-MM-DD format.';
      } else {
        delete this.errors.dob;
      }
    },
    validatePhone() {
      if (!/\d{10}/.test(this.editableProfile.phone)) {
        this.errors.phone = 'Please enter a valid 10-digit phone number.';
      } else {
        delete this.errors.phone;
      }
    },
    validateFacebook() {
      // Example: simple validation for Facebook URL format
      if (this.editableProfile.facebook && !this.editableProfile.facebook.includes('facebook.com')) {
        this.errors.facebook = 'Please enter a valid Facebook link.';
      } else {
        delete this.errors.facebook;
      }
    },
    validateInstagram() {
      // Example: simple validation for Instagram URL format
      if (this.editableProfile.instagram && !this.editableProfile.instagram.includes('instagram.com')) {
        this.errors.instagram = 'Please enter a valid Instagram link.';
      } else {
        delete this.errors.instagram;
      }
    },
    },
    mounted() {
  // Check if a userId parameter is provided in the route
  if (this.$route.params.userId) {
    this.userId = this.$route.params.userId;
  } else {
    // If no userId parameter, use the current authenticated user's ID
    // Make sure the authentication state is initialized
    if (auth.currentUser) {
      this.userId = auth.currentUser.uid;
    } else {
      console.error('No user logged in or user ID not available in route');
      // Handle the scenario where no user is logged in
      // Redirect to login page or show an error message
    }
  }
  // Call fetchProfileData only if userId is available
  if (this.userId) {
    this.fetchProfileData();
  }
}
  };
  </script>
  
<!-- <style scoped>
/* .align-start {
  text-align: left;
}

 </style> -->