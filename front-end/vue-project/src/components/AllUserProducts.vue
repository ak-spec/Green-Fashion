<script>
    import axios from "axios";
    
    export default {
        emits: ["productDeleted", "productUpdated"],
        props: {
            allUserProducts: Array,
        },
        data() {
            return {
                newDescription: "",
                newAddress: "",
                errors: [],
                
            }
        },
        methods: {
            delistProduct(id){
                this.$emit("productDeleted", id)
            },
            handleUpdateForm(id){
                if(!this.newDescription){
                    this.errors.push("Pls give a description of your product!");
                }
                if(!this.newAddress){
                    this.errors.push("Pls provide address of collection!");
                    return
                }

                const encoded_address = encodeURI(this.newAddress);
                var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_address}&key=AIzaSyAr_5GqoyEDg5MldRwiEBsVwn_6vy-Wooc`
                axios.get(url)
                .then((res) => {
                    if(res.data.status !== "OK" || res.data.results.length !== 1){
                        this.errors.push("Pls enter a valid/more specific address!");
                        return
                    }
                    this.newAddress = res.data.results[0].formatted_address;
                    if(this.errors.length === 0){
                        this.$emit("productUpdated", {id, newDesc: this.newDescription, newAddress: this.newAddress});
                        this.newDescription = "";
                        this.newAddress = "";
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                
            },
            clearErrors(){
                this.errors = []
            }
        }

    }

</script>



<template>
    <div class="container">
        <h2 class="text-success mb-4">Your Clothes!!</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4"  v-if="allUserProducts.length > 0">

            <div class="col" v-for="product in allUserProducts" :key="product._id">
                <div class="card h-100 ">
                    <img :src="product.image" class="card-img-top fixedImgHeight" alt="img can't be loaded">
                    <div class="card-body">
                        <p class="card-text">
                            {{ product.description > 50 ? product.description : product.description.slice(0, 50) + "..." }}<br>
                            Collection Address: {{ product.address }}
                        </p>
                        <div class="row">
                            <div class="col">
                                <button class="btn btn-sm btn-primary"
                                type="button" data-bs-toggle="collapse" :data-bs-target=" '#u' + product._id" aria-expanded="false" aria-controls="collapseForm"
                                >
                                    Update details
                                </button>
                            </div>
                            <div class="col">
                                <button class="btn btn-sm btn-danger" @click="delistProduct(product._id)">Delist Product</button>
                            </div>
                            <div class="w-100"></div>
                            <div class="collapse col" :id=" 'u' + product._id">
                                <form @submit.prevent="handleUpdateForm(product._id)">
                                    <div>
                                        <label for="description" class="form-label">New Description</label>
                                        <input type="text" class="form-control" id="description" :placeholder="product.description" v-model="newDescription">
                                    </div>
                                    <div>
                                        <label for="address" class="form-label">New Address</label>
                                        <input type="text" class="form-control" id="address" :placeholder="product.address" v-model="newAddress">
                                    </div>
                                    <button class="btn btn-sm btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#updateModal">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>  
        <div v-else>
                <p class="display-6">You have no products.</p>
                
        </div>

    </div>


    <!--Update Form Valiadtion Modal -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" 
        data-bs-backdrop="static" data-bs-keyboard="false"
    >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-light">
                    <div class="modal-body position-relative">
                        <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" 
                        aria-label="Close" @click="clearErrors"
                        ></button>
                        <ul v-if="errors.length !== 0">
                            <li class="text-danger" v-for="error in errors">{{ error }}</li>
                        </ul>
                        <p v-else class="text-success">Update Successful!</p> 
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