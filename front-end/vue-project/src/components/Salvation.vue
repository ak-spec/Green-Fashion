<script setup>
import { ref, watch } from 'vue';
import { GoogleMap } from 'vue3-google-map';


const map = {
	key: 'AIzaSyDqWE6EI_LPusVBX3PdGeNNW1PMhT4Zeb0', // Place a Google API Key here
	language: 'English',
	region: 'SG',
	center: {
		lat: 1.290270,
		lng: 103.851959
	},
	zoom: 12,
	minZoom: 2,
	maxZoom: null,
	streetViewControl: false
};

let gmap = null;

const mapRef = ref(null);

console.log('[GMap] Setup');

watch(() => mapRef.value?.ready, ready => {
	if (ready) {
		gmap = mapRef.value.map;
		console.log('[GMap] Version:', mapRef.value.api.version);
	}
});

function zoomChanged() {
	console.log('[GMap] Zoom:', gmap.getZoom());
}

function centerChanged() {
	const center = gmap.getCenter();
	console.log('[GMap] Center: (', center.lat(), ',', center.lng(), ')');
}



</script>

<template>>
    <GoogleMap
		id="map"
		ref="mapRef"
		:api-key="map.key"
		:language="map.language"
		:region="map.region"
		:center="map.center"
		:zoom="map.zoom"
		:min-zoom="map.minZoom"
		:max-zoom="map.maxZoom"
		:street-view-control="map.streetViewControl"
		@zoom_changed="zoomChanged"
		@center_changed="centerChanged">
	<GoogleMapMarker>
		
	</GoogleMapMarker>
	</GoogleMap>
</template>


<style>
html,
body,
#app,
#map{
	height: 100%;
    display: block;
    margin: auto;
}

body {
	margin: 0;
}
</style> 