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
            <div class="submit-distance-container">
              <button class="ui button" type="submit">Go</button>
              <div v-if="distance" class="route-info-display">
                Distance: {{ distance }}<br>
                Estimated Duration: {{ duration }}
              </div>
            </div>
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
        distance: '',
        duration: '',
      };
    },
  
    mounted() {
  //this.initializeAutocomplete();

  // Initialize the Google Places Autocomplete
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

  // Check if there's a location query parameter and set the address
  if (this.$route.query.location) {
    this.address = this.$route.query.location;
    // Optionally, you can also show this location on the map:
    // this.showLocationOnTheMap(...); // Provide the latitude and longitude
  }
},
  
    methods: {
      displayRouteInfo(distance, duration) {
        this.distance = distance;
        this.duration = duration;
      },
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

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      this.calculateRoute(position.coords.latitude, position.coords.longitude);
    }, error => {
      this.error = "Unable to access your current location: " + error.message;
      this.spinner = false;
    });
  } else {
    this.error = "Geolocation is not supported by this browser.";
    this.spinner = false;
  }
},

calculateRoute(lat, lng) {
  const origin = { lat, lng };
  const destination = this.address;

  // Initialize directions service and renderer
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  // Initialize the map
  const map = new google.maps.Map(this.$refs.map, {
    zoom: 7,
    center: origin
  });
  directionsRenderer.setMap(map);

  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING'
  }, (response, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(response);
      // Extract and display the distance and duration
      const distance = response.routes[0].legs[0].distance.text;
      const duration = response.routes[0].legs[0].duration.text;
      this.displayRouteInfo(distance, duration);

      this.error = "";
    } else {
      console.error('Directions request failed', status, response);
      this.error = 'Directions request failed due to ' + status;
    }
    this.spinner = false;
  });
}

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

.submit-distance-container {
  display: flex;
  align-items: center; /* Align vertically */
  justify-content: space-between; /* Space between button and distance display */
}

.route-info-display {
  background-color: #f0f0f0; /* Light background for visibility */
  padding: 10px;
  font-size: 16px;
  margin-left: 10px; /* Space from the button */
  border-radius: 5px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}
</style>
