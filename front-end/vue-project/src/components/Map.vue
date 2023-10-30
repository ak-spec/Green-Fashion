<template>
    <div class="personal">
        <h1>Your Coordinates: </h1>
        <p> Latitude: {{ coordinates.lat }}</p>
        <p> Longitude: {{ coordinates.lng }}</p>
    </div>
    
    <GoogleMap id="map" v-bind:api-key='apiKey' style="width: 100%; height: 500px" :center="coordinates" :zoom="8">
        <CustomControl position="RIGHT">
            <button class="custom-btn" @click="sayHi">👋</button>
        </CustomControl>
        <CustomMarker :options="{ position: coordinates  }">
            <div style="text-align: center">
                <div style="font-size: 1.125rem; color: red; font-weight: bold;">My Location</div>
                <img src="../assets/images/current_location.png" width="30" height="30" style="margin-top: 8px" />
            </div>
        </CustomMarker>
        <MarkerCluster>
            <Marker v-for="(location, i) in locations" :options="{ position: {lat: location.lat, lng: location.lng} }" :key="i">
                <InfoWindow v-model="this.infoWindow">
                    <div id="details">
                        <h2>Details: </h2>
                        <img :src="location.details.image" alt="Image" style="width:200px; height: 200px">
                        <p><strong>Name:</strong> {{ location.details.title }}</p>
                        <p><strong>Address:</strong> {{ location.details.address }}</p>
                        <p><strong>Phone:</strong> {{ location.details.phone }}</p>
                        <p><strong>Hours:</strong> {{ location.details.operating_hours }}</p>
                    </div>
                </InfoWindow>
            </Marker>
        </MarkerCluster>
        
    </GoogleMap>
</template>

<script>
    import {GoogleMap, Marker, MarkerCluster, CustomMarker, InfoWindow, CustomControl } from "vue3-google-map"
    import {ref} from 'vue'; //Add in this line of code to display infoWindow




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
            const sayHi = () => alert("Hi! Please click on the following to locate your preferred Salvation Army drop-off location!");

        return {locations, sayHi};
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
            GoogleMap, Marker, CustomMarker, MarkerCluster, InfoWindow, CustomControl
        },
        watch: {
            infowindow(v) {
            alert('infowindow has been ' + (v ? 'opened' : 'closed'))
            }  
        }
    }
</script>


<style scoped>
.personal {
    background: linear-gradient(to right, #96705B,#BA9A8E);;
}

#map {
    margin: auto;
    
}

.custom-btn {
  box-sizing: border-box;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 2px;
  border: 0px;
  margin: 10px;
  padding: 0px;
  font-size: 1.25rem;
  text-transform: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
}
</style>