<template>
	<div id="map">
		<GoogleMaps></GoogleMaps>
	</div>

</template>

<script>
	import GoogleMaps from './Map.vue'

	export default {
		name : 'Salvation',
		components : {
			GoogleMaps
		}
	}

</script>


<style>
	#map {
		margin-top: 100px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>


