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
    };
  },
  created() {
    // Fetch all products
    axios.get("http://localhost:3000/api/v1/listings")
      .then((res) => {
        console.log(this.currUserProducts)
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
    }
  },
};
</script>




<template>
    <div class="container mt-3">
      <h2 class="text-success text-center">All Listings</h2>

    <div class="position-relative my-4">
        <input type="text" name="search" id="search" class="form-control border border-2 border-info rounded-pill p-2 w-100 d-block" placeholder="Search for products">
        <span class="input-group-text bg-transparent border-0 position-absolute end-0 top-0 me-3">
            <i class="bi bi-search"></i>
        </span>
    </div>


      <div class="row mt-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-3">
        <div class="col" v-for="product in paginatedProducts" :key="product._id">
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
  
      <!-- Bootstrap Pagination -->
      <nav class="mt-5">
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