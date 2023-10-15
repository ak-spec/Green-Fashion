<script>
import axios from 'axios';

    export default {
        data() {
            return {
                userProducts: [],
                fetchAlluserProductsUrl: "http://localhost:3000/api/v1/products",
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
                console.log(res.data.userProducts)
                this.userProducts = res.data.userProducts;
            })
            .catch((err) => console.log(err))
        }
    }

</script>



<template>
    <div class="container">
        <h2 class="text-success mb-4">Your Clothes!!</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4">
            <div class="col" v-for="product in userProducts">
                <div class="card h-100">
                    <img :src="product.image" class="card-img-top fixedImgHeight" alt="img can't be loaded">
                    <div class="card-body">
                        <p class="card-text">
                            {{ product.description }}<br>
                            Size: {{ product.size }}
                        </p>
                       
                    </div>
                    <div class="card-body row ">
                        <div class="col">
                            <button class="btn btn-sm btn-primary">Update details</button>
                        </div>
                        <div class="col">
                            <button class="btn btn-sm btn-danger">Delist Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  

    </div>
</template>



<style lang="css" scoped>
.fixedImgHeight {
    height: 300px;
}
</style>