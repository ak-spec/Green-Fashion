<script>
export default {
    props: ["product"],
    data(){
        return {
            isTruncated: true,
            description: this.product.description
        }
    },
    computed: {
        shortDesc(){
            return this.description.slice(0, 50)
        }
    },
    methods: {
        toggleTruncated(){
            this.isTruncated = !this.isTruncated
        }

    }
}
</script>

<template>
    <div class="card card-pop h-100 position-relative">
        <span v-if="product.isUserProduct === true" class="badge rounded-pill text-bg-success position-absolute m-2">Your Product!</span>
        <div class="border-bottom border-success"><img :src="product.image" class="card-img-top fixedImgHeight" alt=""></div>
        <div class="card-body">
            <h5 class="card-title lead">Details:</h5>
            <p class="card-text">
                Size: {{ product.size }} Gender: {{ product.gender }}<br/>
                Description: {{ isTruncated ? shortDesc : description}} <a class="link" v-if="description.length > 50" @click="toggleTruncated">Read {{isTruncated ? "More" : "Less"}}...</a><br/>
                Address: {{ product.address }} <br>
                <span v-if="product.distanceFromUser"> Distance: {{ product.distanceFromUser }}</span>
            </p>
        </div>
    </div>
</template>

<style lang="css" scoped>
.fixedImgHeight {
    height: 300px;
}
.card-pop {
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-pop:hover {
  transform: scale(1.05); /* Scale up the card on hover */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3); /* Add a subtle shadow on hover */
}
</style>