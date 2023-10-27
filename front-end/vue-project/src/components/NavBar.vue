<script>



export default {
   
}

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-with-shadow">
        <div class="container-fluid ms-5">
            <a class="navbar-brand" href="/">
                <img src="../assets/images/logo.jpeg" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
                Green Fashion
            </a>
            <button class=" navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse menu menu-1" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/Upstyling" class="nav-link" style="color: green;">Upstyling</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/Salvation" class="nav-link" style="color: green;">Find Salvation Armies</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/Chat" class="nav-link" style="color: green;">Chat</router-link>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>



<style lang="css" scoped>

@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:700');
.navbar-with-shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100
}
*{
  margin: 0;
  padding: 0;
}
.menu ul{
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
}
.menu li{
  display: inline-block;
  margin: 15px;
}
.menu a{
  font-size: 22px;
  text-transform: uppercase;
  text-decoration: none;
  color: #fff;
  display: block;
  position: relative;
  padding: 4px 0;
}
.menu a::before{
  content: "";
  width: 100%;
  height: 5px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: #fff;
  transition: 0.5s transform ease;
  transform: scale3d(0,1,1);
  transform-origin: 0 50%;
}
.menu a:hover::before{
  transform: scale3d(1,1,1);
}
.menu-1 a::before{
  background: #E91E63;
  transform-origin: 100% 50%;
}
.menu-1 a:hover::before{
  transform-origin: 0 50%;
}
</style>