

<script>
import axios from 'axios';

export default {
    data() {
        return {
            question: "",
            answers: [],
            isLoading: false
        }
    },
    methods: {
        fetchResponse(){
            this.answers.push("Loading...Thank you for your patience");
            this.isLoading = true;

            axios.get("http://localhost:3000/api/v1/chat", { params: {
                prompt: this.question,
            }})
            .then((res) => {
                const idx = this.answers.indexOf("Loading...");
                this.answers.splice(idx, 1)
                this.isLoading = false;
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
                <p v-if="answers" v-for="(answer, index) in answers" 
                class="bg-light border rounded p-2" 
                :class="{'loading-text': isLoading && index === answers.length - 1, 'pulsating': isLoading && index === answers.length - 1}"
                >
                    {{ answer }}
                </p>

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

@keyframes gradient {
    0% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
}

.loading-text {
    background: linear-gradient(90deg, #fff, #000);
    background-size: 200% 100%;
    background-clip: text;
    text-fill-color: transparent;
    animation: gradient 2s linear infinite;
}

.pulsating {
  animation: pulsate 2s infinite;
}

@keyframes pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}


</style>