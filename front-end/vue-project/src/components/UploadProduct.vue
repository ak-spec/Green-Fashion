<script>
import axios from "axios";

export default {
    emits: ["productUploaded"],
    data() {
        return {
            category: "",
            gender: "",
            size: "",
            description: "",
            imgFile: "",
            imgURL: "",
            street: "",
            city: "",
            postalCode: "",
            country: "",
            addressFromGeoCodeAPI: "",
            errors: [],
            uploadedProduct: {},
        }
    },
    methods: {
        async validateInput() {
            if(!this.imgFile){
                this.errors.push("Pls choose a file to upload.");
            }
            if(!this.description){
                this.errors.push("Pls give a description of your product!");
            }
            const address = `${this.street} ${this.city} ${this.country} ${this.postalCode}`;
            //check validity of address using geocoding API
            const encoded_address = encodeURI(address);
            var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_address}&key=AIzaSyAr_5GqoyEDg5MldRwiEBsVwn_6vy-Wooc`
            axios.get(url)
            .then((res) => {
                if(res.data.status !== "OK" || res.data.results.length !== 1){
                    this.errors.push("Pls enter a valid/more specific address!");
                }
                this.addressFromGeoCodeAPI = res.data.results[0].formatted_address;
                if(this.errors.length === 0){
                    //use formData object to send file data as body!!
                    const formData = new FormData();
                    formData.append("image", this.imgFile);
                    const token = window.localStorage.getItem("token");
                    axios.post("http://localhost:3000/api/v1/products/upload", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${token}`,
                        }
                    })
                    .then((res) => {
                        this.imgURL = res.data.image.src;
                        //use the retrieved img url to send another post req to create a new product!
                        axios.post("http://localhost:3000/api/v1/products", {
                            category: this.category, 
                            description: this.description, 
                            size: this.size, 
                            gender: this.gender, 
                            image: this.imgURL, 
                            address: this.addressFromGeoCodeAPI
                        }, {
                            headers: {
                                "Authorization": `Bearer ${token}`,
                            }
                        })
                        .then((res) => {
                            if(res.data.createdProduct){
                                this.uploadedProduct = res.data.createdProduct;
                                this.$emit("productUploaded", res.data.createdProduct);
                            }else{
                                this.errors.push("Something went wrong.Pls try to upload again.")
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                    })
                    .catch((err) => {
                        console.log(err)
                    })

                }
            })
            .catch((err) => {
                console.log(err);
            })

            
            
        },
        checkFile(e){
            console.log(e.target.files)
            this.imgFile = e.target.files["0"]
        },
        clearUploadOutcome(){
            this.errors = [];
            if(this.uploadedProduct){
                this.uploadedProduct = {};
                this.category = "";
                this.size = "";
                this.gender = "";
                this.description = "";
                this.imgFile = "";
                this.imgURL = "";
                this.city = "";
                this.street = "";
                this.country = "";
                this.postalCode = "";
            }
            

        }
    }
    
}
</script>



<template>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#uploadForm">
                Share your clothes
        </button>

        <!-- Form Modal -->
        <div class="modal fade" id="uploadForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog  modal-dialog-scrollable modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Upload Clothing</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container bg-light my-5 p-5 border rounded h-75 overflow-scroll h-md-50">
                            <form class="row" @submit.prevent="validateInput" novalidate>
                                <div class="col-12 col-md-8 mb-3">
                                    <label for="category" class="form-label">Category</label>
                                    <select class="form-control" id="category" v-model="category">
                                        <option value="General" selected>General</option>
                                        <option value="Formal Bottoms">Formal bottoms</option>
                                        <option value="Formal Tops">Formal Tops</option>
                                        <option value="Casual Bottoms">Casual Bottoms</option>
                                        <option value="Casual Tops">Casual Tops</option>
                                        <option value="Denims">Denims</option>
                                        <option value="Traditional Wear">Tradional Wear</option>
                                        <option value="Children's Wear">Children</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Dresses">Women's dresses</option>
                                    </select>
                                </div>

                                <div class="col-12 col-md-2 mb-3">
                                    <label for="gender" class="form-label">Gender</label>
                                    <select class="form-control" id="gender" v-model="gender">
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="Unisex">Unisex</option>

                                    </select>
                                </div>

                                <div class="col-12 col-md-2 mb-3">
                                    <label for="size" class="form-label">Size</label>
                                    <select class="form-control" id="size" v-model="size">
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </select>
                                </div>

                                <div class="col-12 col-md-8 mb-3">
                                    <label for="desc" class="form-label">Description</label>
                                    <textarea class="form-control" id="desc" rows="3" 
                                    placeholder="Describe what you are sharing;eg.How old it is,brand etc.The unit number of your building."
                                    v-model="description"
                                    >
                                    </textarea>
                                </div>

                                <div class="col-12 col-md-4 mb-3">
                                    <label for="formFile" class="form-label">Choose Product Img</label>
                                    <input class="form-control" type="file" @change="checkFile" id="formFile" >
                                </div>

                                <div class="col-12 col-md-8 mb-3">
                                    <label for="street" class="form-label">Enter Your Street</label>
                                    <input type="text" class="form-control" id="street" placeholder="street name" v-model="street">
                                </div>

                                <div class="col-12 col-md-4 mb-3">
                                    <label for="city" class="form-label">City</label>
                                    <input type="text" class="form-control" id="city" placeholder="" v-model="city">
                                </div>

                                <div class="col-12 col-md-4 mb-3">
                                    <label for="postal" class="form-label">Postal Code</label>
                                    <input type="text" class="form-control" id="postal" placeholder="postal code" v-model="postalCode">
                                </div>

                                <div class="col-12 col-md-4 mb-3">
                                    <label for="country" class="form-label">Country</label>
                                    <input type="text" class="form-control" id="country" placeholder="" v-model="country">
                                </div>
                                <div class="w-100 mb-5"></div>
                                <div class="col-12 col-md-8 offset-md-2">
                                    <button class="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#errorModal">List Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
               
                </div>
            </div>
        </div>



        <!-- Error Modal -->
        <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" 
            data-bs-backdrop="static" data-bs-keyboard="false"
        >
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content bg-light">
                        <div class="modal-body position-relative">
                            <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" 
                            aria-label="Close" @click="clearUploadOutcome"
                            ></button>
                            <ul v-if="errors.length !== 0">
                                <li class="text-danger" v-for="error in errors">{{ error }}</li>
                            </ul>
                            <div v-else >
                                <p class="text-success">Product uploaded!</p> 
                                {{ uploadedProduct }}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-success" data-bs-target="#uploadForm" data-bs-toggle="modal">Back to form</button>
                        </div>
                    </div>
                </div>
        </div>
</template>


<style lang="css" scoped>

</style>