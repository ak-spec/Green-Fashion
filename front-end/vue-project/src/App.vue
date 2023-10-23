<script>
import NavBar from "./components/Navbar.vue";



export default {
  data() {
    return {

    }
  },
  components: {
    NavBar
  }
}

</script>

<template>
  <NavBar />
  <router-view ></router-view>
  

  <!-- <div class="mt-5">
    <div v-if="!loginStatus" class="row heroSection">
      <div class="text-white ps-5 pe-0 gap-0 h-sm-25 col-sm-12 d-flex flex-column justify-content-start mb-4 align-items-center
      h-md-100 col-md-6 d-flex flex-md-column justify-content-md-center align-items-md-start">
        <h1>
          <span style="color: green;">Wardrobe Refresh:</span> 
          Share Your Style!"
        </h1>
        <p class=" d-none d-md-block lead text-white fw-bold">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error ipsam excepturi enim quo nostrum soluta, 
          repudiandae ut praesentium iusto eius expedita voluptatum asperiores! Voluptates saepe expedita obcaecati 
          repellat delectus sit!
        </p>
      </div>
      <div class="col-sm-12 col-md-6 h-100 d-md-flex flex-md-column justify-content-md-center">
        <LoginRegisterForm @userLoggedIn="changeLoginStatus"/>
      </div>
    </div>
    <div v-else class="h-100 mb-5">
      <DashBoard :curr-user="username"/>
    </div>
  </div>  
  <Footer/> -->


  

</template>

<style scoped>


</style>
