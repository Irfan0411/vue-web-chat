<template>
    <p>register</p>
    <div class="form">
        <input v-model="email" type="text" placeholder="email">
        <input v-model="username" type="text" placeholder="username">
        <input v-model="password" type="password" placeholder="password">
        <button @click="register">Register</button>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "register",
    data() {
        return {
            email: "",
            username: "",
            password: ""
        }
    },
    methods: {
        register() {
            axios.post("http://localhost:3000/register", {email: this.email, username: this.username, password: this.password})
            .then(res => {
                this.$router.push("/login")
            })
            .catch(err => {
                console.log(err)
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