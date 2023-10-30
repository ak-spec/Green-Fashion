<script>
export default {
    
}
</script>



<template>
    <div class="footer container-fluid background ">
<!--        
            <div class="wave" id="wave1"></div>
            <div class="wave" id="wave2"></div>
            <div class="wave" id="wave3"></div>
            <div class="wave" id="wave4"></div> -->
        
        <div class=" row flex-column flex-md-row pt-3">
            <ul class="social_icon">
                    <li><a href="https://www.facebook.com/profile.php?id=61552721978267"><ion-icon name="logo-facebook"></ion-icon></a></li>
                    <li><a href="https://www.instagram.com/greenfashion638/"><ion-icon name="logo-instagram"></ion-icon></a></li>
                    <li><a href="https://www.linkedin.com/in/green-fashion-7217a9298/"><ion-icon name="logo-linkedin"></ion-icon></a></li>
            </ul>
        </div>
        <!-- <div class="row p-0">
            <div class="col text-white">
                <ul class="menu">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Team</a></li>
                    <li><a href="#">Contact</a></li>
                   
                </ul> -->
                <!-- <h3>About Us</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa nam, saepe voluptates delectus praesentium ut eaque, est vitae, sunt ex sed. Officiis exercitationem nostrum laborum, magni natus a est veniam.</p> -->
                <!-- <ul class="sci d-flex">
                    <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa-brands fa-x-twitter"></i></a></li>
                    <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                    <li><a href="#"><i class="fa-brands fa-youtube"></i></a></li>
                </ul> -->
            <!-- </div> -->
            <!-- <div class="col text-white">
                Creators
            </div>
            <div class="col text-white">
                Find Out More
            </div>
            <div class="w-100"></div> -->
        <!-- </div> -->
        <div class="d-flex justify-content-center pb-3">
            <p class="text-white my-0">&copy; 2023 Green Fashion | All Rights Reserved.</p>
        </div>

    </div>
</template>



<style lang="css" scoped>
    .footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .footer .social_icon, .footer .menu{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
        flex-wrap: wrap;
    }

    .footer .social_icon li , .footer .menu li{
        list-style: none;
    }

    .footer .social_icon li a{ 
        font-size: 2em;
        color: #fff;
        margin: 0 10px;
        display: inline-block;;
        transition: 0.5s

    }
    .footer .social_icon li a:hover { 
        transform: translateY(-10px);
    }
    /* .footer .menu li a{ 
        font-size: 1.3em;
        color: #fff;
        margin: 0 10px;
        display: inline-block;
        text-decoration: none;
        opacity: 0.75;
    }

    .footer .menu li a:hover {
        opacity: 1;
    }    */

    /* .footer .waves {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100px;;
        background-color: #f00
    } */


    .background {
        width: 100%;
        height: 100%;
        margin: auto;

        background-image: linear-gradient(170deg, #D6BCB1, #AB8574);
        background-size: 4000% 1000%;
        animation: gradient-animation 12s infinite;
        animation-timing-function: linear;
    }

    @keyframes gradient-animation {
    0% {
        /* Continue adjusting this 
           position based on your bg size so the start and end 
           of your animation will line up and be a seamless loop */
        background-position: 70% 70%;
    }
    100% {
        background-position: 0 0;
    }
}

    
</style>