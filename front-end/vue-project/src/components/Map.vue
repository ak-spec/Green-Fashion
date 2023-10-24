<!-- <template>
    <div>
        <GoogleMap :center="center" :zoom="10" style="width: 100%; height: 555px;">
            <GoogleMapMarker :key="index" v-for="(gmp, index) in locations" :position="gmp" @click="setPlace(gmp)"> 
            </GoogleMapMarker>
        </GoogleMap>
    </div>
</template>



<script>
    import { ref, watch } from 'vue';
    import { GoogleMap } from 'vue3-google-map';


    export default {
        name: 'GoogleMap',
        data() {
            return {
                center : {
                    lat: 1.290270,
		            lng: 103.851959,
                },
                locations : [],
                currentLocation : null,
            };
        },

        mounted() {
            this.setLocationLatLng();
        },

        methods: {
            setPlace(loc) {
                this.currentLocation = loc;
            },
            setLocationLatLng: function() {
                navigator.geolocation.getCurrentPosition(geolocation => {
                this.center = {
                lat: geolocation.coords.latitude,
                lng: geolocation.coords.longitude
          };
        });
            this.locations = [
            {
                lat: 39.7837304,
                lng: -100.4458825,
                label: 'United States'
            },
            {
                lat: 38.6529545,
                lng: -90.2411166,
                label: 'St. Louis'
            },
            {
                lat: 41.3828939,
                lng: 2.1774322,
                label: 'Barcelona'
            },
            {
                lat: -10.3333333,
                lng: -53.2,
                label: 'Brazil'
            }
        ];
        }
    }
}

</script> -->