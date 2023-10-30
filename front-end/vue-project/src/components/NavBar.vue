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
            <button class="navbar-toggler bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
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


.navbar-with-shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100
}

.custom-navbar-toggler-icon {
    font-size: 24px;
}
.animation {
    text-align: center;
}

ul { 
    margin: 0;
    padding : 0;
    display: flex;
}

ul li {
    list-style: none;
    margin: 0 20px;
    transition: 0.5s;
}

ul li .animation {
    display: block;
    position:relative;
    text-decoration:none;
    padding:5px;
    font-size:16px;
    font-family: sans-serif;
    color:#fff;
    text-transform:uppercase;
    transition:0.5s;
}

ul:hover li .animation {
    transform:scale(1.3);
    opacity:0.2;
    filter:blur(5px);
}

ul li .animation:hover {
    transform:scale(2);
    opacity:1;
    filter:blur(0);
    text-decoration:none;
    color:#fff;
}

ul li .animation:before {
    content:'';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: rgb(99, 62, 62);
    transition:0.5s;
    transform-origin:right;
    transform:scaleX(0);
    z-index:-1;
}
ul li .animation:hover:before {
    transition:transform 0.5s;
    transform-origin:left;
    transform:scaleX(1);
}

</style>