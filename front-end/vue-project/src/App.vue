<script>
import NavBar from "./components/NavBar.vue";
import LoginRegisterForm from "./components/LoginRegisterForm.vue";
import DashBoard from "./components/DashBoard.vue"

export default {
  data() {
    return {
      loginStatus : false,
      username: "",
    }
  },
  methods: {
    changeLoginStatus(name){
      this.loginStatus = !this.loginStatus;
      this.username = name;
    },
  },
  components: {
    NavBar,
    LoginRegisterForm,
    DashBoard,
  },
  created() {
    //check for jwt token.If it exists, set the login status to true and retrieve the username from local storage.
    if(window.localStorage.getItem("token") && window.localStorage.getItem("user")){
      this.username = window.localStorage.getItem("user");
      this.loginStatus = true;
    }
  }
}
</script>

<template>
  <NavBar @userLoggedOut="changeLoginStatus" :login-status="loginStatus"/>
  

  <div class="container-fluid heroSection mt-5">
    <div v-if="!loginStatus" class="row h-100">
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
    <div v-else class="h-100">
      <DashBoard :curr-user="username"/>
    </div>
  </div>  


  




</template>

<style scoped>
.heroSection {
  height: 100vh;
  background-image: url("./assets/images/wad-background2.jpeg");
  background-size: cover;
}

h1 {
  margin-bottom: 0;
}

</style>
