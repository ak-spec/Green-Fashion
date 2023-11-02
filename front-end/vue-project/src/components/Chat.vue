

<script>
import axios from 'axios';

export default {
    data() {
        return {
            question: "",
            answers: [],
            isLoading: false,
            
            prompts: ['What is sustainable fashion?', 'Why do we need to be sustainable?', "How can I reduce clothing waste?"]
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
            

        }, 

        setPrompt (prompt) {

            this.question = prompt;
        }

        
    }
}
</script>


<template>
    <div class="mt-5 pt-4 chat-container container" style="overflow:scroll;">
        <h2 class="my-4">Feel free to have your queries about Sustainable Fashion typed below! </h2>
        <div style="background-color: rgb(45, 132, 95); " class="row mb-3 rounded p-5">
            

            <div class="col-12" v-if="answers" v-for="(answer, index) in answers">
                
                <img src="../assets/images/chatbot.png" alt="Response Icon" class="icon" style="height:50px; width:50px; "/>
                <p 
                class="bg-light border rounded p-2 overflow-scroll contain" 
                :class="{ 'loading-text' : isLoading && index === answers.length - 1}"
                style="height: 100px; margin-bottom: 10px; "
                >
                    {{ answer }}
                </p>

            </div>    

                <div v-if="isLoading">
                    <svg class="ip" viewBox="0 0 256 128" width="128px" height="64px" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0%" stop-color="#5ebd3e" />
				<stop offset="33%" stop-color="#ffb900" />
				<stop offset="67%" stop-color="#f78200" />
				<stop offset="100%" stop-color="#e23838" />
			</linearGradient>
			<linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
				<stop offset="0%" stop-color="#e23838" />
				<stop offset="33%" stop-color="#973999" />
				<stop offset="67%" stop-color="#009cdf" />
				<stop offset="100%" stop-color="#5ebd3e" />
			</linearGradient>
		</defs>
		<g fill="none" stroke-linecap="round" stroke-width="16">
			<g class="ip__track" stroke="#ddd">
				<path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
				<path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
			</g>
			<g stroke-dasharray="180 656">
				<path class="ip__worm1" stroke="url(#grad1)" stroke-dashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
				<path class="ip__worm2" stroke="url(#grad2)" stroke-dashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
			</g>
		</g>
	                </svg>
             

                
                <!-- :class="{'loading-text': isLoading && index === answers.length - 1, 'pulsating': isLoading && index === answers.length - 1}" -->

            </div>
            <div class="container" style="display:flex;">

                <div v-for="(prompt, index) in prompts" :key="index" class="me-2" >
                    <button class="btn mt-2" @click="setPrompt(prompt)">{{ prompt }}</button>
                </div>

            </div>
            
            <div class="col-12">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"></label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" 
                    placeholder="Enter any question you may have about Sustainable Fashion." v-model="question" 
                    >
                    
                    <!-- <button class="btn btn-primary mt-2" @click="fetchResponse">Send question</button> -->
                    <button class="btn mt-2" @click="fetchResponse">Send Question</button>

                </div>
            </div>

        </div>

        <div>
            <h4 class="py-4">Commonly Asked Questions:</h4>
            
            <div style="background-color: rgb(45, 132, 95); " class="row mb-3 rounded p-5">
                <div style="background-color: white;" class="mb-3 rounded p-5">
                    <h6>Can sustainable fashion be affordable for consumers?</h6>
                    <button id='faqbtn' class="btn mt-2" ><a href="https://allplants.com/blog/lifestyle/how-to-tell-if-a-brand-is-actually-sustainable" >Click here</a></button>
                </div>

                <div style="background-color: white;" class="mb-3 rounded p-5">
                    <h6>How can I tell if a clothing brand is genuinely sustainable?</h6>
                    <button id='faqbtn' class="btn mt-2"><a href="https://allplants.com/blog/lifestyle/how-to-tell-if-a-brand-is-actually-sustainable">Click here</a></button>
                </div>

                <div style="background-color: white;" class="mb-3 rounded p-5">
                    <h6>How can I support sustainable fashion as a consumer?</h6>
                    <button id='faqbtn' class="btn mt-2"><a href="https://www.harpersbazaar.com/uk/fashion/what-to-wear/a41158/how-to-be-sustainable-fashion/">Click here</a></button>
                </div>
            </div>
        </div>

    </div>

    

</template>

<style lang="css" scoped>
.chat-container {
    font-family: 'Lato', sans-serif;
    height: 100vh;
    overflow-y: hidden;

}


@keyframes gradient {
    0% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
}

.loading-text {
    background: linear-gradient(90deg, #fff, #000);
    background-size: 200% 100%;
    background-clip: text;
    animation: gradient 3s linear infinite;
}

/* .pulsating {
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
} */

a{
    text-decoration: none;
    color: black;
    
}

p {
    height: 100px;
}
/* .row {
    overflow: hidden;
    overscroll-behavior-y: contain;
} */

#faqbtn {
    float:left;
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

:root {
	--hue: 223;
	--bg: hsl(var(--hue),90%,95%);
	--fg: hsl(var(--hue),90%,5%);
	--trans-dur: 0.3s;
	font-size: calc(16px + (24 - 16) * (100vw - 320px) / (1280 - 320));
}

.ip {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}
.ip__track {
	stroke: hsl(var(--hue),90%,90%);
	transition: stroke var(--trans-dur);
}
.ip__worm1,
.ip__worm2 {
	animation: worm1 2s linear infinite;
}
.ip__worm2 {
	animation-name: worm2;
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
	:root {
		--bg: hsl(var(--hue),90%,5%);
		--fg: hsl(var(--hue),90%,95%);
	}
	.ip__track {
		stroke: hsl(var(--hue),90%,15%);
	}
}

/* Animation */
@keyframes worm1 {
	from {
		stroke-dashoffset: 0;
	}
	50% {
		animation-timing-function: steps(1);
		stroke-dashoffset: -358;
	}
	50.01% {
		animation-timing-function: linear;
		stroke-dashoffset: 358;
	}
	to {
		stroke-dashoffset: 0;
	}
}
@keyframes worm2 {
	from {
		stroke-dashoffset: 358;
	}
	50% {
		stroke-dashoffset: 0;
	}
	to {
		stroke-dashoffset: -358;
	}
}

@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');


</style>