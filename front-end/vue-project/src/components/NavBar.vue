<script>



export default {
   
}

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-with-shadow">
        <div class="container-fluid ms-5">
            <a class="navbar-brand" href="/">
                <img src="../assets/images/environmentally-friendly.png" alt="Logo" width="55" height="55"><h2 class="title" style="margin-top: 15px;font-weight: 600;">Green Fashion</h2>
                
            </a>
            <button class=" navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse menu menu-1" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/Upstyling" class="nav-link animation" style="color: green;">Upstyling</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/Salvation" class="nav-link animation" style="color: green;">Find Salvation Armies</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/Chat" class="nav-link animation" style="color: green;">Chat</router-link>
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
  padding-left: 20px;
  text-align: center;
}
.menu li{
  display: inline-block;
  margin: 7px;
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
  background: #36a702;
  transform-origin: 100% 50%;
}
.menu-1 a:hover::before{
  transform-origin: 0 50%;
}

.title
{
   text-transform: uppercase;
  background-image: linear-gradient(
    -225deg,
    #30f808 0%,
    #06c455 29%,
    #f0749d 67%,
    #fff800 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 2s linear infinite;
  display: inline-block;
      font-size: 25px;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}


</style>