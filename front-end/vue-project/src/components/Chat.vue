

<script>
import axios from 'axios';

export default {
    data() {
        return {
            question: "",
            answers: [],
        }
    },
    methods: {
        fetchResponse(){
            this.answers.push("Loading...")
            axios.get("http://localhost:3000/api/v1/chat", { params: {
                prompt: this.question,
            }})
            .then((res) => {
                const idx = this.answers.indexOf("Loading...");
                this.answers.splice(idx, 1)
                this.answers.push(res.data.response);
            })
            .catch((err) => {
                console.log(err)
            })
            this.question = "";

        }
    }
}
</script>


<template>
    <div class="mt-5 pt-4 chat-container container">
        <h2>Ask us anything about how to recycle/reuse your clothes!</h2>
        <div style="background-color: rgb(45, 132, 95);" class="row mb-3 rounded p-5">
            <div class="col-12">
                <p v-if="answers" v-for="answer in answers" class="bg-light border rounded p-2">{{ answer }}</p>

            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"><h3 class="lead">Question:</h3></label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" 
                    placeholder="Enter any question u may have about green fashion?" v-model="question" 
                    >
                    <button class="btn btn-primary mt-2" @click="fetchResponse">Send question</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.chat-container {
    height: 100vh;
}

</style>