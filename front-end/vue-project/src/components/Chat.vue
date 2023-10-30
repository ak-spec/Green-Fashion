

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
            if(this.answers.length === 4){
                    this.answers.shift();
            }
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
        <div style="background-color: rgb(45, 132, 95);" class="row mb-3 rounded p-5" >
            <div class="col-12">
                <p v-if="answers" v-for="(answer, index) in answers" 
                class="bg-light border rounded p-2  overflow-scroll" 
                :class="{'loading-text': isLoading && index === answers.length - 1, 'pulsating': isLoading && index === answers.length - 1}"
                >
                    {{ answer }}
                </p>

            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"><h3 class="lead text-white fw-bold">Question:</h3></label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" 
                    placeholder="Enter any question u may have about green fashion?" v-model="question" 
                    >
                    <!-- <button class="btn btn-primary mt-2" @click="fetchResponse">Send question</button> -->
                    <button class="btn mt-2" @click="fetchResponse">Send Question</button>

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

p {
    height: 100px;
}

.btn {
    background-color: rgb(120, 215, 120);
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn:link,
.btn:visited {
    text-transform: uppercase;
    text-decoration: none;
    padding: 15px 40px;
    display: inline-block;
    border-radius: 100px;
    transition: all .2s;
    position: absolute;
}

.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all .4s;
}

.btn:hover::after {
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
}

.btn-animated {
    animation: moveInBottom 5s ease-out;
    animation-fill-mode: backwards;
}

@keyframes moveInBottom {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}

</style>