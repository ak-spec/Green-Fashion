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
    <div v-if="!loginStatus" class="row heroSection w-100">
      <div class="text-white ps-5 pe-0 gap-0 h-sm-25 col-sm-12 d-flex flex-column justify-content-start mb-4 align-items-center
      h-lg-100 col-lg-6 d-flex flex-lg-column justify-content-lg-center align-items-lg-start w-lg-50 w-sm-100">
        <div class="fs-1 animation-container mt-5 mb-0 mb-sm-1 mt-sm-3 text-center d-flex w-100 justify-content-center justify-content-lg-start">
          <span style="color: green;" class="sliding-text reverse-slide">Wardrobe Refresh</span> 
          <span class="separator">|</span>
          <span class="sliding-text">Share Your Style!</span>
        </div>
        <p id="description" class=" d-none d-lg-block lead fw-bold mt-4">
          Our innovative fashion web application empowers you to upstyle and elevate your wardrobe sustainably. 
          Explore curated pre-loved treasures, locate nearby Salvation Armies, and engage in real-time style consultations with our fashion experts. 
          Redefine your fashion footprint with our one-of-a-kind platform, promoting eco-friendly choices and personal style like never before!
        </p>
      </div>
      <div class="col-sm-12 col-lg-6 h-100 d-lg-flex flex-lg-column justify-content-lg-center">
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

.animation-container {
  display: flex;
  align-items: center;
}

.sliding-text {
  animation: slideText 10s ease-in-out infinite;
}
.reverse-slide {
  animation-direction: reverse;
}
.separator {
  padding: 0 10px;
}

@keyframes slideText {
  0% {
    transform: translateX(100%);
  }
  10%, 90% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>