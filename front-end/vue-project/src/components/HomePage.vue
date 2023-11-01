<script>
import LoginRegisterForm from "./LoginRegisterForm.vue";
import DashBoard from "./DashBoard.vue";

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
    logUserOut(){
      window.localStorage.clear();
      this.loginStatus = false;

    }
  },
  components: {
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

    <div class="mt-5">
    <div v-if="!loginStatus" class="row heroSection">
      <div class="text-white ps-5 pe-0 gap-0 h-sm-25 col-sm-12 d-flex flex-column justify-content-start mb-4 align-items-center
      h-md-100 col-md-6 d-flex flex-md-column justify-content-md-center align-items-md-start">
        <h1>
          <span style="color: green;">Wardrobe Refresh:</span> 
          Share Your Style!"
        </h1>
        <p id="description" class=" d-none d-md-block lead fw-bold">
          Our innovative fashion web application empowers you to upstyle and elevate your wardrobe sustainably. 
          Explore curated pre-loved treasures, locate nearby Salvation Armies, and engage in real-time style consultations with our fashion experts. 
          Redefine your fashion footprint with our one-of-a-kind platform, promoting eco-friendly choices and personal style like never before!
        </p>
      </div>
      <div class="col-sm-12 col-md-6 h-100 d-md-flex flex-md-column justify-content-md-center">
        <LoginRegisterForm @userLoggedIn="loginStatus = true"/>
      </div>
    </div>
    <div v-else class="h-100 mb-5">
      <DashBoard :curr-user="username" @logged-out="logUserOut"/>
    </div>
  </div>  

</template>

<style lang="css" scoped>

@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
.heroSection {
  height: 100vh;
  object-fit: cover;
  background-image: url("../assets/images/fashion_picture.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  font-family: 'Lato', sans-serif;
}

#description {
  color: green;
  text-align: justify;
  mix-blend-mode: color-burn;
}
</style>