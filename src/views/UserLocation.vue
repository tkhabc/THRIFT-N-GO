

<template>
    <div>
      <section class="ui two column centered grid" style="position:relative;z-index:1">
        <div class="column">
          <form @submit.prevent="submitForm" class="ui segment large form">
            <div class="ui message red" v-show="error">{{error}}</div>
            <div class="ui segment">
              <div class="field">
                <div class="ui right icon input large" :class="{loading:spinner}">
                  <input
                    type="text"
                    placeholder="Enter your address"
                    v-model="address"
                    ref="autocomplete"
                  />
                  <i class="dot circle link icon" @click="locatorButtonPressed"></i>
                </div>
              </div>
              <button class="ui button"  type="submit">Go</button>
            </div>
          </form>
        </div>
      </section>
  
      <section id="map" ref="map"></section>
    </div>
  </template>

<script>
/* global google */
  import axios from "axios";
  
  export default {
    data() {
      return {
        address: "",
        error: "",
        spinner: false,
      };
    },
  
    mounted() {
      var autocomplete = new google.maps.places.Autocomplete(
        this.$refs["autocomplete"],
        {
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(5.3558,100.2900)
          ),
        }
      );
  
      autocomplete.addListener("place_changed", () => {
        var place = autocomplete.getPlace();
  
        this.showLocationOnTheMap(
          place.geometry.location.lat(),
          place.geometry.location.lng()
        );
      });
    },
  
    methods: {
      locatorButtonPressed() {
        this.spinner = true;
  
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.getAddressFrom(
                position.coords.latitude,
                position.coords.longitude
              );
  
              this.showLocationOnTheMap(
                position.coords.latitude,
                position.coords.longitude
              );
            },
            (error) => {
              this.error =
                "Locator is unable to find your address. Please type your address manually.";
              this.spinner = false;
              // console.log(error.message);
            }
          );
        } else {
        // eslint-disable-next-line
          this.error = error.message;
          this.spinner = false;
          console.log("Your browser does not support geolocation API ");
        }
      },
      getAddressFrom(lat, long) {
        axios
          .get(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
              lat +
              "," +
              long +
              "&key=AIzaSyDVPHuw__2qbYPsMkfW1v54nu_zPLv_UDY"
          )
          .then((response) => {
            if (response.data.error_message) {
              this.error = response.data.error_message;
              console.log(response.data.error_message);
            } else {
              this.address = response.data.results[0].formatted_address;
              // console.log(response.data.results[0].formatted_address);
            }
            this.spinner = false;
          })
          .catch((error) => {
            this.error = error.message;
            this.spinner = false;
            console.log(error.message);
          });
      },
  
      showLocationOnTheMap(latitude, longitude) {
        // Show & center the Map based oon
        var map = new google.maps.Map(this.$refs["map"], {
          zoom: 15,
          center: new google.maps.LatLng(latitude, longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        });
  
        new google.maps.Marker({
          position: new google.maps.LatLng(latitude, longitude),
          map: map,
        });
      },
      submitForm() {
      this.spinner = true;

      // Initialize directions service and renderer
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      // Initialize your map (you might already have this in showLocationOnTheMap)
      const map = new google.maps.Map(this.$refs.map, {
        zoom: 7, // Adjust zoom level as needed
        center: { lat:5.3558,lng:100.2900} // Adjust the center as needed
      });
      directionsRenderer.setMap(map);

      // Replace 'Your Origin' with the actual origin, e.g., user's current location
      const origin = { lat:5.3558,lng:100.2900};
      const destination = this.address;

      directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          this.error = ""; // Reset error message on success
        } else {
          console.error('Directions request failed', status, response);
          this.error = 'Directions request failed due to ' + status;
        }
        this.spinner = false;
      });
    },
    },
  };
  </script>
  
  
  <style>
  .ui.button,
  .dot.circle.icon {
    background-color: #ff5a5f;
    color: white;
  }
  
  .pac-icon {
    display: none;
  }
  
  .pac-item {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .pac-item:hover {
    background-color: #ececec;
  }
  
  .pac-item-query {
    font-size: 16px;
  }
  
  #map {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  </style>
  