<script>
import NavBar from "./components/NavBar.vue";
import LoginRegisterForm from "./components/LoginRegisterForm.vue";

export default {
  data() {
    return {
      greetings : "Welcome genie!!"
    }
  },
  components: {
    NavBar,
    LoginRegisterForm
}
}
</script>

<template>
  <NavBar/>
  

  <div class="container-fluid heroSection">
    <div class="row h-100">
      <div class="text-white ps-5 pe-0 h-100 gap-0 col-sm-12 d-flex flex-column justify-content-start mt-5 mb-0 align-items-center
      col-md-6 d-flex flex-md-column justify-content-md-center align-items-md-start mt-md-0">
        <h1>
          <span style="color: green;">Wardrobe Refresh:</span> 
          Share Your Style!"
        </h1>
        <p class=" d-none d-md-block lead text-white fw-bold">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error ipsam excepturi enim quo nostrum soluta, 
          repudiandae ut praesentium iusto eius expedita voluptatum asperiores! Voluptates saepe expedita obcaecati 
          repellat delectus sit!
        </p>
        <div class="d-block d-flex h-100 w-100 flex-column justify-content-center d-md-none ">
          <LoginRegisterForm/>
        </div>
      </div>
      <div class="d-none d-md-block col-md-6 h-md-100 d-md-flex flex-md-column justify-content-md-center">
        <LoginRegisterForm/>
      </div>
    </div>
  </div>  




</template>

<style scoped>
.heroSection {
  height: 100vh;
  background-image: url("./assets/images/wad-background2.jpeg");
  background-size: cover;
  /* background-repeat: repeat; */
  
}

h1 {
  margin-bottom: 0;
}

</style>
