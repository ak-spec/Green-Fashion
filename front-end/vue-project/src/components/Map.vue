<template class="entirebody h-100">
    <div class="row flex-direction-column flex-direction-lg-row w-100 h-100">
        <div class="col-12 col-lg-4 px-0 directions-info overflow-scroll" :class="{'h-100' : directionsInfoVisible}">
            <div v-if="!directionsInfoVisible">
                <strong>Find your nearest salvation army now!</strong><br>
                <strong>Simply click on any <span><img style="height: 40px;width:40px;" src="../assets/images/location-pin (1).png"/></span></strong>
            </div>
            <div v-if="directionsInfoVisible">

                <strong>Your Address: </strong>{{ userAddress }}<br>
                <strong>Destination Address:</strong> {{ destinationAddress }}<br>
                <strong>Distance:</strong> {{ distance }}<br>
                <strong>Duration:</strong> {{ duration }}<br>
                <p v-if="directions"><h4 class="mt-3 py-2 text-dark text-decoration-underline fw-bold border border-2 border-black bg-white">Directions:</h4></p>
                <div class="directions-scroll">
                    <ol v-if="directions">
                        <li v-for="(step, index) in directions.steps" :key="index" v-html="step.html_instructions"></li>
                    </ol>
                </div>
                <button class="d-lg-none btn btn-primary" @click="showMap">Back To Map</button>

            </div>
        </div>
        
        <div class="col-12 col-lg-8 px-0 pt-lg-4">
            <GoogleMap id="map" v-bind:api-key='apiKey' class="h-100 pt-0" :center="coordinates" :zoom="8">
                <CustomControl position="RIGHT">
                    <button class="custom-btn" @click="sayHi">👋</button>
                </CustomControl>
                <CustomMarker class="mymarker" :options="{ position: coordinates  }">
                    <div style="text-align: center">
                        <div style="font-size: 1.125rem; color: rgb(25, 0, 255); font-weight: bold;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">My Location</div>
                        <img src="../assets/images/current_location.png" width="30" height="30" style="margin-top: 8px" />
                    </div>
                </CustomMarker>
                <MarkerCluster>
                    <Marker v-for="(location, i) in locations" :options="{ position: {lat: location.lat, lng: location.lng} }" :key="i" @click="showDirections(location, coordinates)">
                        <InfoWindow v-model="this.infoWindow">
                            <div id="details">
                                <h3 >Details: </h3>
                                <img :src="location.details.image" alt="Image" style="width:200px; height: 200px" class="mb-2">
                                <p><strong>Name:</strong> {{ location.details.title }}</p>
                                <p><strong>Address:</strong> {{ location.details.address }}</p>
                                <p><strong>Phone:</strong> {{ location.details.phone }}</p>
                                <p><strong>Hours:</strong> {{ location.details.operating_hours }}</p>
                            </div>
                        </InfoWindow>
                    </Marker>
                </MarkerCluster>
            </GoogleMap>
        </div>
    </div>
</template>

<script>

    import {ref} from 'vue';
    import axios from 'axios';
    import {GoogleMap, Marker, MarkerCluster, CustomMarker, InfoWindow, CustomControl } from "vue3-google-map"





    export default {
        setup() {

            const locations = [
            { lat: 1.3608704, lng: 103.8425,
                details : {
                    image : "https://lh3.googleusercontent.com/p/AF1QipNQ-SpvgFN0yUtKb4D_hMxvTXieXYn6RPc-uz35=s680-w680-h510",
                    title: 'The Salvation Army Territorial Headquarters/Central Corps',
                    address : "20 Bishan Street 22, Singapore 579768",
                    phone : 65550188,
                    operating_hours : "Monday - Sunday 7am - 9pm"}, //Bishan Chinese Corps Salvation Army
                },

            { lat: 1.29504, lng: 103.8160599,
                details : {
                    image: "https://lh3.googleusercontent.com/p/AF1QipMr9JFXsv_IfcnvIPijDMHwoLTOAtrF7nX8lDk=s680-w680-h510",
                    title: 'Tanglin Family Hub',
                    address : "356 Tanglin Rd, Singapore 247674",
                    phone : 67182506,
                    operating_hours : "Monday - Sunday 7am - 9pm *Drive Thru*"},
                },// The Salvation Army Tanglin Rd

            { lat: 1.3624072477201,  lng: 103.76777425712,
                details : {
                    image: "https://lh3.googleusercontent.com/p/AF1QipPGRUqtb1QQxEZxUD4r71x-pRWQMg2MXYQbdpCO=s680-w680-h510",
                    title: 'PraiseHaven',
                    address : "500 Upper Bukit Timah Rd, Singapore 678106",
                    phone : 63495312,
                    operating_hours : "Monday - Sunday 7am - 9pm"}, //PraiseHaven
                },

            { lat: 1.3355903, lng: 103.7466569,
                details : { 
                    image : "https://www.greenguide.sg/_next/image?url=https%3A%2F%2Fgdappio.s3.amazonaws.com%2Fgreenguide%2Fimage%2F20210920-eon74-tsa-imm-jpg&w=1024&q=75",
                    title: 'IMM Open Car Park',
                    address : "No. 2 Jurong East Street 21 Singapore 609601 (Beside Security Guardhouse, Unloading Bay)",
                    phone : 63495312,
                    operating_hours : "Monday - Sunday 24 Hours"}, //IMM Open Car Park
                },

            { lat: 1.306910, lng: 103.788340,
                details : {
                    image: "https://starvista-static.s3-ap-southeast-1.amazonaws.com/assets/img/thumbnails/Star-Vista-website-social-648-%C3%97-364-px.png",
                    title: 'The Star Vista',
                    address : "1 Vista Exchange Green Singapore 138617 (Basement 3, near escalator landing area)",
                    phone : 63495312,
                    operating_hours : "Monday - Sunday 10am - 10pm"}, //The Star Vista
                },

            { lat: 1.290360, lng: 103.775963,
                details : {
                    image: "https://lh3.googleusercontent.com/p/AF1QipMw8KVKJR4NTiGOmLVTAfo69h9I4yXLwP12Qdk=s680-w680-h510",
                    title: 'The Haven',
                    address : "350 Pasir Panjang Road Singapore 118692",
                    phone : 67750366,
                    operating_hours : "Monday - Saturday 7am - 8pm"}, //The Haven, Pasir Panjang
                },

            { lat: 1.328750, lng: 103.745860,
                details : {
                    image : "https://cdn-dlobm.nitrocdn.com/kpBObKhPCUejajVnLkrSnoevXpuMKkfh/assets/images/optimized/rev-4104195/corporatevisions.sg/wp-content/uploads/2017/04/Creative-Resource-1-1.png",
                    title: '31 INTERNATIONAL BUSINESS PARK S609921',
                    address : "31 INTERNATIONAL BUSINESS PARK S609921",
                    phone : 65088686,
                    operating_hours : "Monday - Sunday 7am - 9pm"}, //31 INTERNATIONAL BUSINESS PARK S609921    
                },

            { lat: 1.30261, lng: 103.861902,
                details : {
                    image : "https://kll-delivery.sitecorecontenthub.cloud/api/public/content/5d95d1b5efc049a99765ea234fdfcdcf?v=005a2823",
                    title: 'I12 Katong',
                    address : "112 East Coast Road Singapore 428802 (Basement 2, near travellator landing area)",
                    phone : 67750366,
                    operating_hours : "Monday - Sunday 10am - 10pm"}, // I12 Katong
                },

            { lat: 1.411210, lng: 103.757770,
                details : {
                    image : "https://www.greenguide.sg/_next/image?url=https%3A%2F%2Fgdappio.s3.amazonaws.com%2Fgreenguide%2Fimage%2F20210920-hbxqh-tsa-mandai-jpg&w=1024&q=75",
                    title: 'Mandai Station',
                    address : "Smart Energy Pte Ltd No. 1 Mandai Link Road Singapore 728650",
                    phone : 64857777,
                    operating_hours : "Monday - Sunday 24 Hours"}, //Mandai Station
                },

            { lat: 1.37199204172, lng: 103.876835075,
                details : {
                    image : "https://lh3.googleusercontent.com/p/AF1QipOpgWTJK3IcFodcwJW9htUXbEd2HG3P6mzC2mZB=s680-w680-h510",
                    title: 'GraceHaven',
                    address : "3 Lorong Napiri (off Yio Chu Kang Road) Singapore 547528",
                    phone :  65802250,
                    operating_hours : "Monday - Saturday 7am - 7pm"}, //GraceHaven
                },

            { lat: 1.3373, lng: 103.9656,
                details : {
                    image : "https://www.greenguide.sg/_next/image?url=https%3A%2F%2Fgdappio.s3.amazonaws.com%2Fgreenguide%2Fimage%2F20210920-1t7ja-tsa-hopecentre-jpg&w=1024&q=75",
                    title: 'One @ Changi City',
                    address : "1 Changi Business Park Central 1, Singapore 486036",
                    phone :  65088686,
                    operating_hours : "Monday - Sunday 7am - 9pm"}, // One @ Changi City
                },

        ];
            const infoWindow = ref(true)
            const userAddress = ref('');
            const destinationAddress = ref('');
            const distance = ref('');
            const duration = ref('');
            const directionsInfoVisible = ref(false);
            const directions = ref(null);

            
            const sayHi = () => alert("Hi! Please click on the following to locate your preferred Salvation Army drop-off location!");
            const showMap = () => {
                directionsInfoVisible.value = false;
            }
            const showDirections = (destination, origin) => {
      // Make an Axios request to the Directions API
      axios
        .get('https://maps.googleapis.com/maps/api/directions/json', {
          params: {
            origin: `${origin.lat},${origin.lng}`,
            destination: `${destination.lat},${destination.lng}`,
            key: "AIzaSyAMPEA8sJ9zhXSrzcwB3Z6dc5a2y2ysILk",
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
      showDirections,
      userAddress,
      destinationAddress,
      distance,
      duration,
      directionsInfoVisible,
      directions,
      sayHi,
      showMap
    };
  },

        
    
        data() {
            return {
                apiKey : "AIzaSyAMPEA8sJ9zhXSrzcwB3Z6dc5a2y2ysILk", 
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
            GoogleMap, Marker, CustomMarker, MarkerCluster, InfoWindow, CustomControl
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
    margin-top: 0 !important;
    padding-top: 30px;
    
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
    background-color: #6a994e;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: relative;
    color:white;
    box-shadow: 10px 0 10px rgba(0, 0, 0, 0.3);
    font-family: 'Lato', sans-serif;
    padding-top: 50px;


}
.directions-scroll {
    overflow-y: auto; 
    &::-webkit-scrollbar {
        width: 7px; /* Default thin width */
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgb(145, 100, 100);
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
}
.entirebody{
    background-color: black;
}

.custom-btn { 
    height: 40px;
    width: 40px;
    margin-right: 10px;
}

@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
</style>