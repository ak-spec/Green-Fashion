<template>
    <div class="personal">
        <h1>Your Coordinates: </h1>
        <p> Latitude: {{ coordinates.lat }}</p>
        <p> Longitude: {{ coordinates.lng }}</p>
    </div>
    
    <GoogleMap id="map" v-bind:api-key='apiKey' style="width: 100%; height: 500px" :center="coordinates" :zoom="8">
        <CustomMarker :options="{ position: coordinates  }">
            <div style="text-align: center">
                <div style="font-size: 1.125rem; color: red; font-weight: bold;">My Location</div>
                <img src="../assets/images/current_location.png" width="30" height="30" style="margin-top: 8px" />
            </div>
        </CustomMarker>
        <MarkerCluster>
            <Marker v-for="(location, i) in locations" :options="{ position: location }" :key="i">
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
    import {GoogleMap, Marker, MarkerCluster, CustomMarker, InfoWindow } from "vue3-google-map"




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

        return {locations, infoWindow};
        },
    
        data() {
            return {
                apiKey : "AIzaSyDqWE6EI_LPusVBX3PdGeNNW1PMhT4Zeb0", 
                coordinates : {
                    lat: 1.290270,
		            lng: 103.851959,
                }
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
.personal {
    background: linear-gradient(to right, #96705B,#BA9A8E);;
}

#map {
    margin: auto;
    
}
</style>