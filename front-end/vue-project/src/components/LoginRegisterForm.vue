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
                this.RegisterDetails.errors.push("Pls provide a valid username!");
            }
            if(!i_email.includes("@")){
                this.RegisterDetails.errors.push("Pls provide a valid email.");
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
                console.log(msg)
            });
        }
    }
}

</script>

<template>
    <!-- Still have to do validation for login -->
    <div class="container w-75  h-75 d-flex flex-column justify-content-center align-items-center myform bg-dark text-white">
        <h4 class="text-center">{{ login ? "Login" : "Register" }}</h4>
        <form v-if="login" class="w-75 d-flex flex-column align-items-center" @submit.prevent="handleLogin" novalidate>
            <div class="mb-4 w-100">
                <label for="userEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="userEmail" placeholder="name@example.com" v-model="loginDetails.email">
            </div>
            <div class="mb-4 w-100">
                <label for="userPassword" class="form-label">Enter Password</label>
                <input type="password" class="form-control" id="userPassword" placeholder="password" v-model="loginDetails.password">
            </div>

            <button class="btn btn-primary my-2">Start Sharing!</button>
            <small class="mt-3">
                Do not have a account?
                <span style="text-decoration: underline;" @click="toggleStaus">
                    Click to register!
                </span>
            </small>

        </form>
        <form v-else  class="w-75 d-flex flex-column align-items-center" @submit.prevent="handleRegister" novalidate>
            <div class="mb-4 w-100">
                <label for="userName" class="form-label">User Name:</label>
                <input type="text" class="form-control" id="userName" placeholder="how should we call you?" 
                v-model="RegisterDetails.username"
                required minlength="3" maxlength="50"
                >
            </div>
            <div class="mb-4 w-100">
                <label for="userEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="userEmail" placeholder="name@example.com" 
                v-model="RegisterDetails.email"
                required 
                >
            </div>
            <div class="mb-4 w-100">
                <label for="userPassword" class="form-label">Enter Password</label>
                <input type="password" class="form-control" id="userPassword" placeholder="password" 
                v-model="RegisterDetails.password"
                required minlength="6"
                >
                <p v-if="RegisterDetails.passwordNotMatch" style="color: red;">Passwords do not match!</p>
            </div>
            <div class="mb-4 w-100">
                <label for="userConfirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="userConfirmPassword" placeholder="confirm password" 
                v-model="RegisterDetails.confirmPassword"
                required minlength="6"
                >
                <p v-if="RegisterDetails.passwordNotMatch" style="color: red;">Passwords do not match!</p>
            </div>

            <button type="submit" class="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#registerModal">Register!</button>
            <small class="mt-3">
                <p style="text-decoration: underline;" @click="toggleStaus">
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
}


</style>