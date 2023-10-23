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
            viewListedClothes: true
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
                    const idx = this.allUserProducts.indexOf(product);
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
        <div class="container-fluid  py-0 px-5 h-100 heroSection">
            <h1>Welcome {{ currUser }}!</h1>
            <button class="btn btn-primary me-5" @click="$emit('loggedOut')">Logout</button>
            <div class="row">
                <div class="col-12 my-2 my-sm-5 bg-dark text-white p-3 border border-dark rounded">
                    <!-- Probably a slideshow -->
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vel exercitationem enim ea 
                    repudiandae dignissimos quam. Eveniet modi beatae exercitationem corporis vitae odit voluptates
                    accusantium quia atque fugit. Tenetur, iure.
                    <br><br>
                    Let's do somtheing like a daily fact.<br>Can be in the form of a slideshow!
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
  background-image: url("../assets/images/wad-background2.jpeg");
  background-size: cover;
}

</style>