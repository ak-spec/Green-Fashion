<script>



export default {
    emits: ["userLoggedOut"],
    props: {
        loginStatus: Boolean
    },
    data() {
        return {

        }
    },
    methods: {
        logUserOut() {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("user");
            this.$emit("userLoggedOut");
        },

        
    }
}

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-with-shadow">
        <div class="container-fluid ms-5">
            <a class="navbar-brand" href="/">
                <img src="../assets/images/logo.jpeg" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
                Green Fashion
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/Upstyling" class="nav-link" style="color: green;">Upstyling</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/Salvation" class="nav-link" style="color: green;">Find Salvation Armies</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/About" class="nav-link" style="color: green;">About</router-link>
                    </li>

                </ul>
            </div>
            <button v-if="loginStatus" class="btn btn-primary me-5" @click="logUserOut">Logout</button>
        </div>
    </nav>
</template>



<style lang="css" scoped>


.navbar-with-shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100
}
</style>