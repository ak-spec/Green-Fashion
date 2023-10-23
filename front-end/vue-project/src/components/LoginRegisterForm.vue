<script>
import axios from 'axios';


export default {
    data() {
        return {
            login: true,
            RegisterDetails: {
                url : "http://localhost:3000/api/v1/auth/register",
                username: "",
                email : "",
                password: "",
                confirmPassword: "",
                errors: [],
            },
            loginDetails : {
                url : "http://localhost:3000/api/v1/auth/login",
                email : "",
                password: "",
            },
        }
    },
    emits: ['userLoggedIn'],
    methods: {
        toggleStaus(){
            this.login = !this.login;
        },
        handleRegister(){
            let i_username = this.RegisterDetails.username;
            let i_email = this.RegisterDetails.email;
            let i_password = this.RegisterDetails.password;
            let i_cpassword = this.RegisterDetails.confirmPassword;
            if(i_username.length < 3){
                this.RegisterDetails.errors.push("Please provide a valid username with at least 3 characters!");
            }
            if(!i_email.includes("@")){
                this.RegisterDetails.errors.push("Please provide a valid email containing '@'.");
            }
            if(i_password.length < 6){
                this.RegisterDetails.errors.push("Password must be at least 6 characters long!");
            }
            if(i_cpassword !== i_password){
                this.RegisterDetails.errors.push("Passwords do not match!");
            }
            if(this.RegisterDetails.errors.length === 0){
                this.RegisterDetails.errors = [];
                axios.post(this.RegisterDetails.url, {
                    username: i_username, 
                    email: i_email, 
                    password: i_password
                })
                .then((res) => {
                    console.log(res.data);
                    this.RegisterDetails.username = "";
                    this.RegisterDetails.email = "";
                    this.RegisterDetails.password = "";
                    this.RegisterDetails.confirmPassword = "";
                })
                .catch((err) => console.log(err))
            }

        },
        handleLogin(){
            const {url, email, password} = this.loginDetails;
            axios.post(url, {email, password})
            .then((res) => {
                const username = res.data.LoggedInUser.username;
                window.localStorage.setItem("token", res.data.token);
                window.localStorage.setItem("user", username);
                this.$emit('userLoggedIn', username);
                console.log(username)
            })
            .catch((err) => {
                const msg = err.message;
                console.log(err)
            });
        }
    }
}

</script>

<template>
    <!-- Still have to do validation for login -->
    <div class="container w-75  h-75 d-flex flex-column justify-content-center align-items-center bg_green myform text-white">
        <h1 class="text-center">{{ login ? "Login" : "Register" }}</h1>
        <form v-if="login" class="w-75 d-flex flex-column align-items-center" @submit.prevent="handleLogin" novalidate>
            <div class="mb-4 w-100 wrapper">
                <div class="input-data">
                    <input type="email" id="userEmail" 
                    required v-model="loginDetails.email">
                    <div class="underline"></div>
                    <label>Email Address</label>
                </div>
                <!-- <label for="userEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="userEmail" placeholder="name@example.com" v-model="loginDetails.email"> -->
            </div>
            <div class="mb-4 w-100 wrapper">
                <div class="input-data">
                    <input type="password" id="userPassword"
                    v-model="loginDetails.password"
                    required>
                    <div class="underline"></div>
                    <label>Password</label>
                </div>
                <!-- <label for="userPassword" class="form-label">Enter Password</label>
                <input type="password" class="form-control" id="userPassword" placeholder="password" v-model="loginDetails.password"> -->
            </div>

            <button class="btn btn-primary my-2">Start Sharing!</button>
            <small class="mt-3">
                Do not have an account?
                <span style="text-decoration: underline; cursor: pointer;" @click="toggleStaus">
                    Click to register!
                </span>
            </small>

        </form>
        <form v-else  class="w-75 d-flex flex-column align-items-center" @submit.prevent="handleRegister" novalidate>
            <div class="mb-4 wrapper w-100 ">
                <div class="input-data">
                    <input type="text" id="userName" required
                    v-model="RegisterDetails.username"
                    minlength="3" maxlength="50">
                    <div class="underline"></div>
                    <label>Name</label>
                </div>
            </div>
                <!-- <label for="userName" class="form-label">User Name:</label>
                <input type="text" class="form-control" id="userName" placeholder="how should we call you?" 
                v-model="RegisterDetails.username"
                required minlength="3" maxlength="50"
                > -->
            <div class="mb-4 wrapper w-100 ">
                <div class="input-data">
                    <input type="email" 
                    v-model="RegisterDetails.email"
                    required>
                    <div class="underline"></div>
                    <label>Email Address</label>
                </div>
            </div>
            <!-- <div class="mb-4 w-100">
                <label for="userEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="userEmail" placeholder="name@example.com" 
                v-model="RegisterDetails.email"
                required 
                >
            </div> -->
            <div class="mb-4 wrapper w-100">
                <div class="input-data">
                    <input type="password" id="userPassword"
                    v-model="RegisterDetails.password"
                    minlength="6" required>
                    <div class="underline"></div>
                    <label>Password</label>
                </div>
                <!-- <label for="userPassword" class="form-label">Enter Password</label>
                <input type="password" class="form-control" id="userPassword" placeholder="password" 
                v-model="RegisterDetails.password"
                required minlength="6"
                > -->
                <p v-if="RegisterDetails.passwordNotMatch" style="color: red;">Passwords do not match!</p>
            </div>
            <div class="mb-4 wrapper w-100">
                <div class="input-data">
                    <input type="password" id="userConfirmPassword"
                    v-model="RegisterDetails.confirmPassword"
                    minlength="6" required>
                    <div class="underline"></div>
                    <label>Confirm Password</label>
                </div>
                <!-- <label for="userConfirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="userConfirmPassword" placeholder="confirm password" 
                v-model="RegisterDetails.confirmPassword"
                required minlength="6"
                > -->
                <p v-if="RegisterDetails.passwordNotMatch" style="color: red;">Passwords do not match!</p>
            </div>

            <button type="submit" class="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#registerModal">Register!</button>
            <small class="mt-3">
                <p style="text-decoration: underline; cursor: pointer; font-size: 18px;" @click="toggleStaus">
                    Click to Login!
                </p>
            </small>
        </form>

        <!-- Modal -->
        <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" 
        data-bs-backdrop="static" data-bs-keyboard="false"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-light">
                    <div class="modal-body position-relative">
                        <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" 
                        aria-label="Close" @click="RegisterDetails.errors = []"
                        ></button>
                        <ul v-if="RegisterDetails.errors.length !== 0">
                            <li class="text-danger" v-for="error in RegisterDetails.errors">{{ error }}</li>
                        </ul>
                        <p v-else class="text-success">Registration Successful!</p> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>

.myform {
    border-radius: 2%;
    font-family: 'Montserrat', sans-serif;
}

input[type="text"], input[type="email"], input[type="password"]{
    border: none;
    outline: none;
}

.wrapper {
    width: 300px;
    background: #fff;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

}

.wrapper .input-data {
    height: 40px;
    width: 100%;
    position: relative;
    /* border: none */
}

.wrapper .input-data input{
    height: 100%;
    width: 100%;
    border: none;
    border-color: none;
    border-bottom: 2px solid silver;
    font-size: 16px;
}
.wrapper .input-data input:focus ~ label,
.wrapper .input-data input:valid ~ label {
    transform: translateY(-20px);
    font-size: 15px;
    color: #4158d0;
}

.wrapper .input-data label {
    position: absolute;
    bottom: 10px;
    left: 0;
    color: grey;
    pointer-events: none;
    transition: all 0.3s ease;
}

.wrapper .input-data .underline {
    position: absolute;
    bottom: 0px;
    height: 2px;
    width: 100%;
}
.input-data .underline:before {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    background: #4158d0;
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.wrapper .input-data input:focus ~ .underline:before
.wrapper .input-data input:valid ~ .underline:before {
    transform: scaleX(1);
}


.bg_green {
    background-color: #f2cf07;
    background-image: linear-gradient(315deg, #f2cf07 0%, #55d284 74%);
}

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

</style>