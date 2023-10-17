<script>
import UploadProduct from './UploadProduct.vue';
import AllUserProducts from './AllUserProducts.vue';
import PublicListings from './PublicListings.vue';
import axios from 'axios';


export default {
    props: {
        currUser: String,
    },
    data(){
        return {
            allUserProducts: [],
            fetchAlluserProductsUrl: "http://localhost:3000/api/v1/products",
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
        updateProduct(id) {
            const token = window.localStorage.getItem("token");
            axios.patch(`http://localhost:3000/api/v1/products/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => {
                
            })
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
    <div class="container-fluid pt-3 px-0 h-100">
        <h1>Welcome {{ currUser }}!</h1>
        <div class="container mt-3 p-0 h-100">
            <div class="row">
                <div class="col-12 my-2 my-sm-5 bg-dark text-white p-3 border border-dark rounded">
                    <!-- Probably a slideshow -->
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate vel exercitationem enim ea 
                    repudiandae dignissimos quam. Eveniet modi beatae exercitationem corporis vitae odit voluptates
                    accusantium quia atque fugit. Tenetur, iure.
                    <br><br>
                    Let's do somtheing like a daily fact.<br>Can be in the form of a slideshow!
                </div>
                <div class="col-12">
                    <UploadProduct @product-uploaded="addToAllUserProducts"/>
                    <a class="btn btn-primary mx-3" href="#currUserProducts">Listed clothes</a>
                </div>
               
            </div>
            

        </div>
        <div id="currUserProducts">
            <AllUserProducts :all-user-products="allUserProducts" @product-deleted="delistProduct" @product-updated="updateProduct"/>    
        </div>
        <PublicListings />
    </div>
</template>

<style lang="css" scoped>

</style>