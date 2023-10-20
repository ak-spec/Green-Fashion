<script>
import axios, { all } from 'axios';

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
      categories: ["formals", "casuals", "children", "denims", "traditional", "accessories", "dresses"],
      selectedCatgories: [],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      selectedSizes: [],
      gender: "",
      filterByDistance: false,
    };
  },
  created() {
    // Fetch all products
    axios.get("http://localhost:3000/api/v1/listings")
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
    handleFilter(){
        console.log(this.selectedCatgories)
        console.log(this.selectedSizes)
        console.log(this.gender)
        console.log(this.filterByDistance)
        this.selectedCatgories = [];
        this.selectedSizes = [];
        this.gender = "";
        this.filterByDistance = false;
    },
    performLiveSearch(){
        if(!this.searchData){
            this.isLiveSearch = false;
            this.matchedProducts = [];
        }else{
            this.isLiveSearch = true;
            this.matchedProducts = [];
            for(let product of this.allProducts){
                const details = (product.description + product.category).toLowerCase();
                if(this.isPartialMatch(details, this.searchData) && !this.isProductInCurrentUserProducts(product)){
                    this.matchedProducts.push(product);
                }
            }
        }
       
    },
    isPartialMatch(details, searchQuery) {
        // Split the search query into individual words
        const searchWords = searchQuery.split(' ');
        // Check if all search words are present in the details
        return searchWords.every(word => details.includes(word));
    },

  },
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
        <div class="accordion mt-2 w-25" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <i class="bi bi-filter"></i>&nbsp;&nbsp;Filter
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <form @submit.prevent="handleFilter" class="d-flex flex-column">
                        <div class="form-check d-inline-block mx-2">
                                <input class="form-check-input" type="checkbox" id="distance" v-model="filterByDistance">
                                <label class="form-check-label" for="distance">
                                    Find products near me
                                </label>
                        </div>
                        <div>
                            <h4>Choose Categories</h4>
                            <div v-for="category in categories" class="form-check d-inline-block mx-2" :key="category">
                                <label class="form-check-label" :for="category">
                                    {{ category }}
                                </label>
                                <input class="form-check-input" type="checkbox" :value="category" :id="category" v-model="selectedCatgories">
                            </div>
                        </div>
                        <div>
                            <h4>Choose Size</h4>
                            <div v-for="size in sizes" class="form-check d-inline-block mx-2" :key="size">
                                <label class="form-check-label" :for="size">
                                    {{ size }}
                                </label>
                                <input class="form-check-input" type="checkbox" :value="size" :id="size" v-model="selectedSizes">
                            </div>
                        </div>
                        <div>
                            <h4>Gender</h4>
                            <div class="form-check d-inline-block mx-2">
                                <input class="form-check-input" type="radio" id="Male" v-model="gender" value="Male">
                                <label class="form-check-label" for="Male">
                                    Male
                                </label>
                            </div>
                            <div class="form-check d-inline-block mx-2">
                                <input class="form-check-input" type="radio" id="F" v-model="gender" value="Female">
                                <label class="form-check-label" for="F">
                                    Female
                                </label>
                            </div>
                            <div class="form-check d-inline-block mx-2">
                                <input class="form-check-input" type="radio" id="U" v-model="gender" value="Unisex">
                                <label class="form-check-label" for="U">
                                    Unisex
                                </label>
                            </div>
                        </div>
                        
                        <button class="btn btn-secondary align-self-end">Apply Filters</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
        
    </div>

    <div class="row mt-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-3" v-if="!isLiveSearch">
        <div class="col"  v-for="product in paginatedProducts" :key="product._id">
            <div class="card h-100 position-relative">
                <span v-if="product.isUserProduct === true" class="badge rounded-pill text-bg-success position-absolute m-2">Your Product!</span>
                <img :src="product.image" class="card-img-top fixedImgHeight" alt="">
                <div class="card-body">
                    <h5 class="card-title">Details:</h5>
                    <p class="card-text">
                        Size: {{ product.size }} Gender: {{ product.gender }}<br/>
                        Desecription: <br/>{{ product.description }}<br/>
                        Address: {{ product.address }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-3" v-else>
        <div class="col"  v-for="product in matchedProducts" :key="product._id">
            <div class="card h-100 position-relative">
                <img :src="product.image" class="card-img-top fixedImgHeight" alt="">
                <div class="card-body">
                    <h5 class="card-title">Details:</h5>
                    <p class="card-text">
                        Size: {{ product.size }} Gender: {{ product.gender }}<br/>
                        Desecription: <br/>{{ product.description }}<br/>
                        Address: {{ product.address }}
                    </p>
                </div>
            </div>
        </div>
    </div>
  
      <!-- Bootstrap Pagination -->
      <nav class="mt-5" v-if="!isLiveSearch">
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
.fixedImgHeight {
    height: 300px;
}

</style>