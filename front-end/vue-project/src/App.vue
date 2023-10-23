<script>
import NavBar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";


export default {
 
  components: {
    NavBar,
    Footer
  }
}

</script>

<template>
  <NavBar />
  <router-view ></router-view>
  <Footer />
</template>

<style scoped>


</style>
