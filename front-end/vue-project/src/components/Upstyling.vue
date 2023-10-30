<script>

    import axios from 'axios';
    


    // youtube queries from api docs
    const API_KEY = "AIzaSyCoi2STo1PugqeawEQh_k4TBcNM2TOpUNA"
    const API_KEY2 = '0269d4b3effa4914bf2a471329ff57f2'
    const part = 'snippet'
    const q =  'upcycling clothes'
    const maxResults =  20 
    const pageToken = null

    export default {
        data () {
            return {
                
                // populate videos array once queried
                videos: [],
                stories: []
                    
                
            }
        },

        

        methods: {

          

            getYoutubeVids () {
               
                const url = 'https://www.googleapis.com/youtube/v3/search'

                // get the videos from yt
                axios.get(url, {
                    params: {

                        key:API_KEY,
                        part:part,
                        q:q,
                        maxResults:maxResults,
                        pageToken: pageToken
                        
                    }
                })

                .then (response => {

                    // based on yt docs list of results that match the search criteria is returned in items

                    var data = response.data

                    for (var item of data.items) {

                        if (this.videos.length < 20) {
                            
                            item.videoUrl = `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1`;
                            this.videos.push(item)
                            
                        }
                        else {
                            break;
                        }
                        
                    }
                    
                    console.log(this.videos)
                    


                })

                .catch(error => {

                    console.log(error)

                }

                

                
                )

                

            },

            getSearchResults () {

                const url = 'https://newsapi.org/v2/everything'
                

                // get the videos from yt
                axios.get(url, {
                    params: {

                        apiKey:API_KEY2,
                        q:'sustainable clothes',
                        pageSize: 12
                       
                        
                    }
                })

                .then (response => {

                    // based on yt docs list of results that match the search criteria is returned in items

                    var data = response.data

                    this.stories = data.articles
                    
                    console.log(this.stories)
                    


                })

                .catch(error => {

                    console.log(error)

                })
            },


        },

        mounted () {
                this.getYoutubeVids();
                this.getSearchResults();
              
            }
    }



</script>

<template>
    
    
  <div id="welcome">

    

   
    
    <div class="row" >

        <div class="col ms-5" >
            <h3>Curious about how to better style your clothes?</h3>
        </div>
        
        <div class="col me-3">
            <p>We are here to help you! From finding new uses for your clothes, to styling new outfits, we have all the suggestions you need!</p>
        </div>

    </div>

    

    <div class="card text-center mb-5 mx-5">
        <div class="card-header">
            <h2>What is Upstyling?</h2>
        </div>
        <div class="card-body">
            
            <p class="card-text">Upstyling, also known as upcycling, is the creative and sustainable art of transforming old or worn clothing into something new and stylish. 
            Upstyling clothes allows you to breathe new life into your wardrobe by giving old, forgotten pieces a trendy makeover.
            The beauty of upstyling lies in its eco-friendliness, as it reduces textile waste and promotes a more sustainable approach to fashion.
            Get inspired by upstyling and turn an outdated pair of jeans into fashionable distressed shorts or an oversized shirt into a trendy crop top.
            Join the upstyling movement and discover the joy of giving old clothes a new lease on life while reducing the fashion industry's carbon footprint.</p>
            
        </div>
        
    </div>

    <!--
    <div class="row2">
        <div v-for="video in videos">
            <div>
                <button type="button" class="btn btn-success" v-bind:data-youtube-id="`${video.id.videoId}`">{{video.snippet.title}}
                <span class="thumbnail"><img v-bind:src='`${video.snippet.thumbnails.medium.url}`' width="200" height="150"></span>
                </button>
            </div>
        </div>
    </div>
    
-->

    <div class="card mx-5 mb-3 rounded" style="background-color: rgb(45, 132, 95);">
        <div class="card-body">
            <h4 class="card-title text-white">Videos</h4>
            <p class="card-text text-white">Style better with our video suggestions!</p>
            <div id="customCarousel" class="carousel slide">
            
                <div class="carousel-inner">
                    <div v-for="(video, i) in videos" :key="i" :class="{ 'carousel-item': true, active: i === 0 } ">
                        <div class="thumbnail d-flex justify-content-center align-items-center">
                            <iframe :src="`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`" width="640" height="360" frameborder="0" allowfullscreen></iframe>
                        </div>

                    </div>

                    <button class="carousel-control-prev " type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
        </div>
    </div>
    

    <div class="card mx-5 mb-3 rounded" style="background-color: rgb(45, 132, 95);">
        <div class="card-body">
            <h5 class="card-title text-white">Step-By-Step Tutorials</h5>
            <div class="card-group py-3">
                <div class="carousel-item active"></div>
                <div class="card">
                    <img src="https://alldaychic.com/wp-content/uploads/2014/03/Upcycled-Plain-Tee-DIY.jpg" class="card-img-top" alt="..." style="width: 100%; height: 400px;">
                    <div class="card-body">
                    <h5 class="card-title ">Shirt</h5>
                    <p class="card-text">Have you ever gotten an oversized tee as a free gift or have one stored somewhere from the old days (a.k.a. something you would never wear out)? Other than tossing it or sleeping in it, here's one idea to make it nice and wearable!</p>
                    
                    <a href="http://micheleng.com/how-to-upcycle-a-plain-tee/">
                        <!-- <button type="button" class="btn btn-primary">View more..</button> -->
                        <button type="button" class="btn mt-2">View More...</button>
                    </a>
                    </div>
                </div>
                <div class="card">
                    <img src="https://images.squarespace-cdn.com/content/v1/5742615bf699bb27dcd1bcef/1558951458952-J5HZ4EZCQW9L968MDGBA/DSCF7873.jpg?format=1500w" class="card-img-top" alt="..." style="width: 100%; height: 400px;">
                    <div class="card-body">
                    <h5 class="card-title">Pants</h5>
                    <p class="card-text">Next time you find yourself with an oversized pair of pants here's two potential ways you could give it some upcycle love.</p>
                    <a href="https://theessentialsclub.com/blog-posts/upcycle-oversized-pants">
                        <!-- <button type="button" class="btn btn-primary">View more..</button> -->
                        <button type="button" class="btn mt-2">View More...</button>
                    </a>
                    </div>
                </div>
                <div class="card">
                    <img src="https://i0.wp.com/jacquelyncreates.com/wp-content/uploads/2022/12/daisy_hat_crop-scaled.jpg?resize=775%2C1024&ssl=1" class="card-img-top" alt="..." style="width: 100%; height: 400px;">
                    <div class="card-body">
                    <h5 class="card-title">Cap</h5>
                    <p class="card-text">Embellishing an old hat with embroidery is a great way to transform those hats in the back of your closet or add some personality to your latest thrift find! </p>
                    <a href="https://jacquelyncreates.com/diy-tutorials/diy-upcycle-embroidered-hat">
                        <!-- <button type="button" class="btn btn-primary">View more...</button> -->
                        <button type="button" class="btn mt-2">View More...</button>
                    </a>
                    </div>
                </div>
                
        </div>
    </div>
</div>

    <div class="card mx-5 mb-3 rounded" style="background-color: rgb(45, 132, 95);">
        <div class="card-body">
            <h5 class="card-title text-white mb-3">Sustainability Stories</h5>
            
                <div id="carouselExampleCaptions" class="carousel slide">
                    <div class="carousel-inner">
                        <div v-for="(story, i) in stories" :key="i">

                            <div v-if="i % 3 === 0" class="carousel-item" :class="{ active: i === 0 }">
                                <div class="d-flex justify-content-around" id="card-div">
                                    <div v-for="(story, j) in stories.slice(i, i + 3)" :key="j">

                                        <div id='user-card' class="card" style="width: 20rem; ; height: 100%;">
                                            <img v-bind:src="`${story.urlToImage}`" class="d-block w-100" alt="There is no image from this article." style="width: 100%; height: 200px;">
                                        
                                        <div class="card-body">
                                            <h5 class="card-title">{{ story.title }}</h5>
                                            <p class="card-text">{{ story.description }}</p>
                                            <div class="mt-auto">
                                                <a v-bind:href="`${story.url}`"><button type="button" class="btn mt-2">View More...</button></a>
                                            </div>
                                            
                                        </div>
                                    </div>
               
                                </div>
                                    
                            </div>
                            
                        </div>

                    </div>
                        

                        
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>


        </div>
    </div>

    
       

    <div class="card text-center" id="socials">
        <div class="card-body">
            <h5 class="card-title">Found something you like?</h5>
            <p class="card-text">Share with your friends and family!</p>
            
        </div>
        <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
                <a class="nav-link"  href="https://www.instagram.com/"><img src="https://p7.hiclipart.com/preview/477/609/118/logo-computer-icons-clip-art-instagram-logo-thumbnail.jpg" width="20" height="20"></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://www.facebook.com/"><img src="https://www.facebook.com/images/fb_icon_325x325.png" width="20" height="20"></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://web.telegram.org/"><img src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/icy14hwiqs3uxvip8fsn" width="20" height="20"></a>
            </li>
            </ul>
        </div>
        
    </div>
    

    
   
</div>

</template>
  

  
<style>

    #welcome{
        padding-top:75px;
        font-family: 'Montserrat', sans-serif;
    }

    .carousel-control-prev, .carousel-control-next {
        filter: invert(100%); 
    }
   

    .btn-success {
        width:300px;
        height:200px;
    }

        
    @media (min-width: 1068px) {
        #card-div {
            display: block; 
        }

        #user-card {
            width: 100%; 
        }
    }

    
    @media (max-width: 1067px) {
        #card-div {
            display: flex;
            flex-wrap: wrap; 
            justify-content: space-between; 
        }

        #user-card {
            width: calc(33.33% - 20px); 
        }
    }

    a {
        text-decoration: none;
    }

    .btn {
        color: black;
        background-color: rgb(120, 215, 120);
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
}
    .btn:link,
    .btn:visited {
        text-transform: uppercase;
        text-decoration: none;
        padding: 15px 40px;
        display: inline-block;
        border-radius: 100px;
        transition: all .2s;
        position: absolute;
    }

    .btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        color: black;
        background-color: #a7c957;
        font-weight: bold;
    }

    .btn:active {
        transform: translateY(-1px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .btn::after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 100%;
        border-radius: 100px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: all .4s;
        
    }

    .btn:hover::after {
        transform: scaleX(1.4) scaleY(1.6);
        opacity: 0;
    }

    .btn-animated {
        animation: moveInBottom 5s ease-out;
        animation-fill-mode: backwards;
    }

    @keyframes moveInBottom {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }

        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }

    .card-text { 
        text-align: justify;
    }
    

  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

</style>