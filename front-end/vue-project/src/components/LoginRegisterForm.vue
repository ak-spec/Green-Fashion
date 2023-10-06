<script>
export default {
    data() {
        return {
            login: true,
        }
    },
    methods: {
        toggleStaus(){
            this.login = !this.login;
        }
    }
}

</script>

<template>
    <div class="container w-75  h-75 d-flex flex-column justify-content-center align-items-center myform bg-dark text-white">
        <h4 class="text-center">{{ login ? "Login" : "Register" }}</h4>
        <form v-if="login" class="w-75 d-flex flex-column align-items-center">
            <div class="mb-4 w-100">
                <label for="userEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="userEmail" placeholder="name@example.com">
            </div>
            <div class="mb-4 w-100">
                <label for="userPassword" class="form-label">Enter Password</label>
                <input type="password" class="form-control" id="userPassword" placeholder="password">
            </div>

            <button class="btn btn-primary my-2">Start Sharing!</button>
            <small class="mt-3">
                Do not have a account?
                <span style="text-decoration: underline;" @click="toggleStaus">
                    Click to register!
                </span>
            </small>

        </form>
        <form v-else  class="w-75 d-flex flex-column align-items-center">
            <div class="mb-4 w-100">
                <label for="userName" class="form-label">Email address</label>
                <input type="text" class="form-control" id="userName" placeholder="how should we call you?">
            </div>
            <div class="mb-4 w-100">
                <label for="userEmail" class="form-label">Email address</label>
                <input type="email" class="form-control" id="userEmail" placeholder="name@example.com">
            </div>
            <div class="mb-4 w-100">
                <label for="userPassword" class="form-label">Enter Password</label>
                <input type="password" class="form-control" id="userPassword" placeholder="password">
            </div>
            <div class="mb-4 w-100">
                <label for="userPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="userPassword" placeholder="password">
            </div>

            <button class="btn btn-primary my-2">Register!</button>
            <small class="mt-3">
                <p style="text-decoration: underline;" @click="toggleStaus">
                    Click to Login!
                </p>
            </small>
        </form>
    </div>
</template>

<style lang="css" scoped>

.myform {
    border-radius: 2%;
}


</style>