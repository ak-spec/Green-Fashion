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
        <div class="container-fluid  py-0 px-5 h-100 heroSection position-relative">
            <h1>Welcome {{ currUser }}!</h1>
            <button class="btn btn-primary me-5 mt-2 position-absolute top-0 end-0" @click="$emit('loggedOut')">Logout</button>
            <div class="row">
                <div class="col-12 my-2 my-sm-5 bg-dark text-white p-3 border border-dark rounded">
                    <!-- Probably a slideshow -->
                    <p>Fact of the day: </p>
                    {{ quote.text }}<br><br>
                    ~ {{ quote.author }}
                    <br><br>
                    
                </div>
                <div class="col-6  py-3">
                    <UploadProduct @product-uploaded="addToAllUserProducts"/>
                    <a class="d-none d-md-inline-block btn btn-primary  mx-3"  @click="toggleProductsView">{{ viewListedClothes ? "All Listings" : "Your Clothes" }}</a>
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
}

</style>