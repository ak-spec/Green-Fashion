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
        PublicListings
    },
    methods: {
        toggleTabs(tab) {
            this.currTab = tab;
        }
    }
}
</script>

<template>
    <div class="container-fluid pt-3 px-0 h-100">
        <h1>Welcome {{ currUser }}!</h1>
        <ul class="nav nav-tabs bg-light bg-opacity-75">
            <li class="nav-item">
                <a class="nav-link" :class="{active: currTab=='uploadProduct'}" aria-current="page" @click="toggleTabs('uploadProduct')">Upload Product</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{active: currTab=='allUserProducts'}" @click="toggleTabs('allUserProducts')">Your Clothes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{active: currTab=='publicListings'}" @click="toggleTabs('publicListings')">View All Listed Clothings</a>
            </li>
        </ul>
        <UploadProduct v-if="currTab === 'uploadProduct'"/>
        <AllUserProducts v-if="currTab === 'allUserProducts'"/>
        <PublicListings v-if="currTab === 'publicListings'"/>

    </div>
</template>

<style lang="css" scoped>

</style>