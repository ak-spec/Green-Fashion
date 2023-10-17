<script>
import axios from 'axios';

    export default {
        emits: ["productDeleted", "productUpdated"],
        props: {
            allUserProducts: Array,
        },
        data() {
            return {
                
            }
        },
        methods: {
            updateProduct(id){
                this.$emit("productUpdated", id)
            },
            delistProduct(id){
                this.$emit("productDeleted", id)
            }
        }

    }

</script>



<template>
    <div class="container">
        <h2 class="text-success mb-4">Your Clothes!!</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4">
            <div class="col" v-for="product in allUserProducts">
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
                            <button class="btn btn-sm btn-primary" @click="updateProduct(product._id)">Update details</button>
                        </div>
                        <div class="col">
                            <button class="btn btn-sm btn-danger" @click="delistProduct(product._id)">Delist Product</button>
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