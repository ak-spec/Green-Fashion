<template class="entirebody">
    <div v-if="!directionsInfoVisible" class="directions-info">
        <strong>Find the most closest salvation army now!</strong><br>
        <strong>simply click on any marker</strong>
    </div>
    <div v-if="directionsInfoVisible" class="directions-info">
        <strong>Your Address:</strong>{{ userAddress }}<br>
        <strong>Destination Address:</strong> {{ destinationAddress }}<br>
        <strong>Distance:</strong> {{ distance }}<br>
        <strong>Duration:</strong> {{ duration }}<br>
        <p v-if="directions">Directions:</p>
        <pre v-if="directions" v-for="(step, index) in directions.steps" :key="index">{{ step.html_instructions }}</pre>
    </div>
    
    <GoogleMap id="map" v-bind:api-key='apiKey' style="width: 1000px; height: 550px;margin:0" :center="coordinates" :zoom="8">
        <CustomMarker class="mymarker" :options="{ position: coordinates  }">
            <div style="text-align: center">
                <div style="font-size: 1.125rem; color: red; font-weight: bold;">My Location</div>
                <img src="../assets/images/current_location.png" width="30" height="30" style="margin-top: 8px" />
            </div>
        </CustomMarker>
        <MarkerCluster>
            <Marker class="anomarker" v-for="(location, i) in locations" :options="{ position: location }" :key="i" @click="showDirections(location, coordinates)">
                <InfoWindow v-model="infoWindow">
                    <div id="content">
                        This is the infowindow content
                    </div>
                </InfoWindow>
            </Marker>
        </MarkerCluster>
    </GoogleMap>
</template>

<script>
    import {GoogleMap, Marker, MarkerCluster, CustomMarker, InfoWindow } from "vue3-google-map";
    import {ref} from 'vue';
    import axios from 'axios';

    export default {
        setup() {
            const locations = [
            { lat: 1.36097, lng: 103.84256 }, //Bishan Chinese Corps Salvation Army
            { lat: 1.29504, lng: 103.8160599 }, // The Salvation Army Tanglin Rd
            { lat: 1.29039, lng: 103.77584},  // The Salvation Army, The Haven
            { lat: 1.3624072477201,  lng: 103.76777425712}, //Salvation Army Upper Bukit Timah
            { lat: 1.350071, lng: 103.970425 }, //Salvation Army Upper Changi
            { lat: 1.31953, lng: 103.8539}, //The Salvation Army, Balestier Corps
            { lat: 1.2806075420456, lng: 103.82620833256}, //The Salvation Army, Bukit Merah
            // { lat: , lng: },
        ];
            const infoWindow = ref(true)
            const userAddress = ref('');
            const destinationAddress = ref('');
            const distance = ref('');
            const duration = ref('');
            const directionsInfoVisible = ref(false);
            const directions = ref(null);

            const showDirections = (destination, origin) => {
      // Make an Axios request to the Directions API
      axios
        .get('https://maps.googleapis.com/maps/api/directions/json', {
          params: {
            origin: `${origin.lat},${origin.lng}`,
            destination: `${destination.lat},${destination.lng}`,
            key: "api",
          },
        })
        .then((response) => {
          // Handle the response to display directions
          console.log(response.data);
          const route = response.data.routes[0].legs[0];
          userAddress.value = route.start_address;
          destinationAddress.value = route.end_address;
          distance.value = route.distance.text;
          duration.value = route.duration.text;
          directions.value = route;
          directionsInfoVisible.value = true;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      locations,
      infoWindow,
      showDirections,
      userAddress,
      destinationAddress,
      distance,
      duration,
      directionsInfoVisible,
      directions,
    };
  },
    
        data() {
            return {
                apiKey : "api", 
                coordinates : {
                    lat: 1.290270,
		            lng: 103.851959,
                },


            }
        },
        created() {
            this.$getLocation() 
            .then ((coordinates) => {
                this.coordinates.lat = coordinates.lat
                this.coordinates.lng = coordinates.lng
            })
            .catch((error) => {
                console.log(error);
            })
        },

        components : {
            GoogleMap, Marker, CustomMarker, MarkerCluster, InfoWindow
        },
        watch: {
            infowindow(v) {
            alert('infowindow has been ' + (v ? 'opened' : 'closed'))
            }  
        }
    }
</script>


<style>
/* .personal {
    background: linear-gradient(to right, #96705B,#BA9A8E);;
} */

#map {
    margin: auto;
}

.mymarker{
    position:relative;
    animation: jump 1s infinite;
    animation-delay: 3s;
}

@keyframes jump{
    0%
    {
        transform:translateY(0)
    }
    20%{
        transform:translateY(-20px)
    }
}

.directions-info {
  background-color: yellow;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 1;
}
</style>