<template>
    <p class="underline">Login</p>
    <div class="form">
        <input v-model="email" type="text" placeholder="email">
        <input v-model="password" type="password" placeholder="password">
        <button @click="login">Login</button>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "login",
    data() {
        return {
            email: "",
            password: ""
        }
    },
    mounted() {
        localStorage.removeItem('token')
    },
    methods: {
        login() {
            axios.post("http://localhost:3000/login", {email: this.email, password: this.password})
            .then(res => {
                console.log(res.data);
                localStorage.setItem("token", res.data.token)
                this.$router.push("/")
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
.form{
    display: flex;
    flex-direction: column;
    max-width: 200px;
}
</style>