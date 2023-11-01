<script>
import UploadProduct from './UploadProduct.vue';
import AllUserProducts from './AllUserProducts.vue';
import PublicListings from './PublicListings.vue';
import axios from 'axios';


export default {
    emits: ["loggedOut"],
    props: {
        currUser: String,
    },
    data(){
        return {
            allUserProducts: [],
            fetchAlluserProductsUrl: "http://localhost:3000/api/v1/products",
            viewListedClothes: true,
            quote: {author: "", text: ''},
        }
    },
    components:{
        UploadProduct,
        AllUserProducts,
        PublicListings,
    },
    methods: {
        addToAllUserProducts(newProduct){
            this.allUserProducts.push(newProduct);
        },
        delistProduct(id) {
            const token = window.localStorage.getItem("token");
            axios.delete(`http://localhost:3000/api/v1/products/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => {
                const product = res.data.deletedProduct;
                if(product){
                    //objects are compared by reference in js;so using "indexOf" and "includes" when 
                    //tryig to find the index of an object in an array of objects will not work.
                    const idx = this.allUserProducts.findIndex((item) => item._id === product._id);
                    this.allUserProducts.splice(idx, 1)
                }
            })
        },
        updateProduct(upDatedDetails) {
            const token = window.localStorage.getItem("token");
            axios.patch(`http://localhost:3000/api/v1/products/${upDatedDetails.id}`,
                {
                    description: upDatedDetails.newDesc,
                    address: upDatedDetails.newAddress
                }, 
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            .then((res) => {
                const replacedProduct = this.allUserProducts.find((value) => {
                    return value._id === res.data.updatedProduct._id;
                });
                const idxOfReplacedProduct = this.allUserProducts.indexOf(replacedProduct);
                this.allUserProducts.splice(idxOfReplacedProduct, 1, res.data.updatedProduct)
            })
        },
        toggleProductsView(){
            this.viewListedClothes = !this.viewListedClothes 
        }
    },
    created(){
        axios.get("https://api.api-ninjas.com/v1/quotes?category=environmental", { headers: {
            'X-Api-Key': '5qoHpSYqEdEgzsvyUqyjAA==w4E4yBMu2nmHIlEO'
        }})
        .then((res) => {
            this.quote.author = res.data[0].author
            this.quote.text = res.data[0].quote

        })
        .catch((e) => console.log(e))
    },
    mounted(){
            const token = window.localStorage.getItem("token");
            axios.get(this.fetchAlluserProductsUrl, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => {
                this.allUserProducts = res.data.userProducts;
            })
            .catch((err) => console.log(err))

        },
}
</script>

<template>
    <div class="container-fluid pt-2 px-0 h-100">
        <div class="container-fluid  py-2 px-5 h-100 heroSection position-relative">
            <div class="row">
                <div class="col-12 col-sm-10">
                    <h1 class="text-center text-sm-start lead display-5">Welcome Back, {{ currUser }}</h1>
                    <button class="d-block d-sm-none btn btn-sm btn-primary mt-2 mx-auto" @click="$emit('loggedOut')">Logout</button>
                </div>
                <div class="col d-none d-sm-block">
                     <!-- <button class="btn btn-primary me-5 mt-3 position-absolute top-0 end-0" @click="$emit('loggedOut')">Logout</button> -->
                     <button type="button" class="btn mt-3 me-5 position-absolute top-0 end-0" @click="$emit('loggedOut')">Logout</button>
                </div>

            </div>
            <div class="row">
                <div class="col-12 my-2 my-sm-5 bg_green  py-3 px-3 border border-dark rounded">
                    <!-- Probably a slideshow -->
                    <p class="h4 fantasyFont">Fact of the day: </p>
                    <p v-if="quote.text" class="mb-0 fantasyFont"> 
                            <h3 class="">{{ quote.text }}</h3><br>
                        <i>~ {{ quote.author }}</i>
                    </p>
                    <p v-else class="loading-text">Fetching quote...!</p>
                    <br><br>
                    
                </div>
                <div class="col-6  py-3">
                    <UploadProduct @product-uploaded="addToAllUserProducts" v-if="viewListedClothes"/>
                    <a class="d-none d-md-inline-block btn mx-3"  @click="toggleProductsView">{{ viewListedClothes ? "All Listings" : "Your Clothes" }}</a>
                </div>
                <div class="col-6 py-3 d-md-none">
                    <a class="btn btn-primary mx-3" @click="toggleProductsView">{{ viewListedClothes ? "All Listings" : "Your Clothes"}}</a>
                </div>
            </div>
        </div>

        <div v-if="viewListedClothes" class="mt-3">
            <AllUserProducts :all-user-products="allUserProducts" @product-deleted="delistProduct" @product-updated="updateProduct"/>    
        </div>
        <div v-else>
            <PublicListings :curr-user-products="allUserProducts" :all-user-products="allUserProducts"/>
        </div>
        
    </div>
</template>

<style lang="css" scoped>
.heroSection {
  height: 100vh;
  background-image: url("../assets/images/fashion_picture.png");
  background-size: cover;
  text-align: justify;
}
.bg_green {
    background: linear-gradient(to right, #c1c161 0%, #c1c161 0%, #d4d4b1 100%);
}

.fantasyFont {
    font-family:fantasy;
}

@keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }

.loading-text {
    font-size: 24px;
    animation: pulse 1s infinite;
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
</style>