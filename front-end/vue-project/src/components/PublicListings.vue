<script>
import axios from 'axios';
import Card from './Card.vue';

export default {
  props: {
    currUserProducts: Array,
  },
  data() {
    return {
      allProducts: [],
      allProductsExcludingUserProducts: [],
      currentPage: 1,
      itemsPerPage: 10, 
      searchData: "",
      matchedProducts: [],
      isLiveSearch: false,
      noProducts: false,
      userLocation: "",
      productsSortedByLocation: [],
      filterByDistance: false,
      
    };
  },
  created() {
    // Fetch all products
    this.getUserLocation();
    axios.get("http://localhost:3000/api/v1/listings/")
      .then((res) => {
        for(let product of res.data.listedProducts){
            if(this.isProductInCurrentUserProducts(product)){
                product["isUserProduct"] = true;
            }else{
                product["isUserProduct"] = false;
                this.allProductsExcludingUserProducts.push(product);
            }
            this.allProducts.push(product);
        }
        if(this.allProducts.length == 0){
            this.noProducts = true;
        }
      });
  },
  computed: {
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.allProducts.slice(startIndex, endIndex);
    },
    totalPageCount() {
      return Math.ceil(this.allProducts.length / this.itemsPerPage);
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPageCount) {
        this.currentPage++;
      }
    },
    isProductInCurrentUserProducts(product){
        for(let userProduct of this.currUserProducts){
            if(product._id === userProduct._id){
                return true;
            }
        }
        return false;
    },
  
    performLiveSearch(){
        if(!this.searchData){
            this.isLiveSearch = false;
            this.matchedProducts = [];
            this.noProducts = false;
            this.sortOnLocation();
        }else{
            this.isLiveSearch = true;
            this.noProducts = false;
            this.matchedProducts = [];
            for(let product of this.allProducts){
                const details = (product.description + product.category).toLowerCase();
                if(this.isPartialMatch(details, this.searchData) && !this.isProductInCurrentUserProducts(product)){
                    this.matchedProducts.push(product);
                }
            }
            if(this.matchedProducts.length === 0){
                this.noProducts = true;
            }
            this.sortOnLocation();
        }
       
    },
    isPartialMatch(details, searchQuery) {
        // Split the search query into individual words
        const searchWords = searchQuery.split(' ');
        // Check if all search words are present in the details
        return searchWords.every(word => details.includes(word));
    },
    sortOnLocation(){
        if(this.filterByDistance){
            const destinations = [];
            const productArr = [];

            var arrayofProdutsToSort;
            if(this.isLiveSearch){
                arrayofProdutsToSort = this.matchedProducts;
            }else{
                arrayofProdutsToSort = this.allProducts
            }
            for(let product of arrayofProdutsToSort){
                if(!this.isProductInCurrentUserProducts(product)){
                    destinations.push(product.address)
                    productArr.push(product);
                }   
            }
            const destinationString = destinations.join("|");
            const url =`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.userLocation.latitude},${this.userLocation.longitude}&destinations=${destinationString}&key=AIzaSyAr_5GqoyEDg5MldRwiEBsVwn_6vy-Wooc`
            axios.get(url)
            .then((res) => {
                console.log(res.data)

                const results = res.data.rows[0].elements;
                for(let i=0; i < results.length; i++){
                    productArr[i]["distanceFromUser"] = results[i].distance.text;
                }
                productArr.sort((product, product1) => {
                    return parseFloat(product.distanceFromUser) - parseFloat(product1.distanceFromUser)
                })
                this.productsSortedByLocation = productArr;
            })
            .catch((err) => console.log(err))
        }
    },

    getUserLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
            });
        }else{
            console.log("No navigator found in browser");
        }
    },

  },
  components: {
    Card,
  }
};
</script>




<template>
    <div class="container mt-3">
      <h2 class="text-success text-center">All Listings</h2>

        <div class="position-relative my-4">
            <input v-model="searchData" type="text" name="search" id="search" 
            class="form-control border border-2 border-info rounded-pill p-2 w-100 d-block" 
            placeholder="Search for products"
            @change="performLiveSearch"
            >
            <span class="input-group-text bg-transparent border-0 position-absolute end-0 top-0 me-3">
                <i class="bi bi-search display-7"></i>
            </span>
            
        </div>

        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="filterByDistance" @change="sortOnLocation">
            <label class="form-check-label" for="flexCheckDefault">
                Sort based on nearest location
            </label>
        </div>

        <!-- This will be shown when the user is just viewing all listed products and is not searchinh for anything specific -->
        <div class="row mt-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-3" v-if="!isLiveSearch && !noProducts && !filterByDistance">
            <div class="col"  v-for="product in paginatedProducts" :key="product._id">
                
                <Card :product="product" />

            </div>
        </div>

        <!-- This will be shown when the user is performing live search -->
        <div class="row mt-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-3" v-if="isLiveSearch && !noProducts && !filterByDistance">
            <div class="col"  v-for="product in matchedProducts" :key="product._id">
               
                <Card :product="product" />

            </div>
        </div>

        <!-- This will be displayed when filtering by distance is done -->
        <div class="row mt-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-3" v-if="filterByDistance && !noProducts">
            <div class="col"  v-for="product in productsSortedByLocation" :key="product._id">
        
                <Card :product="product" />

            </div>
        </div>


        <div class="container" v-if="noProducts">
            <p>No Products found!</p>
        </div>
    
      <!-- Bootstrap Pagination -->
      <nav class="mt-5" v-if="!isLiveSearch && !filterByDistance">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <a class="page-link" href="#" @click="prevPage">Previous</a>
          </li>
          <li class="page-item" v-for="page in totalPageCount" :key="page" :class="{ 'active': page === currentPage }">
            <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPageCount }">
            <a class="page-link" href="#" @click="nextPage">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  

<style lang="css" scoped>
@import 'bootstrap-icons/font/bootstrap-icons.css';



</style>