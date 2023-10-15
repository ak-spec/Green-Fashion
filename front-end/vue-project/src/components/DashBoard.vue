<script>
import UploadProduct from './UploadProduct.vue';
import AllUserProducts from './AllUserProducts.vue';
import PublicListings from './PublicListings.vue';

export default {
    props: {
        currUser: String,
    },
    data(){
        return {
            currTab: "uploadProduct",
        }
    },
    components:{
    UploadProduct,
    AllUserProducts,
    PublicListings,
},
    methods: {
        
    }
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
                    <UploadProduct/>
                    <a class="btn btn-primary mx-3" href="#userProducts">Listed clothes</a>
                </div>
               
            </div>
            

        </div>
        <div id="userProducts">
            <AllUserProducts />    
        </div>
        <PublicListings />
    </div>
</template>

<style lang="css" scoped>

</style>