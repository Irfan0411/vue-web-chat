<template>
    <div class="w-full h-full flex p-2">
        <div class="w-[60%] flex justify-center items-center">
            <Vue3Lottie
                :animationData="AnimationData"
                :height="500"
                :width="500"
            />
        </div>
        <div class="w-[40%] h-full bg-white rounded-xl py-14 px-20 flex flex-col justify-between items-center">
            <img src="/icon/chat-icon.png" alt="icon" class="w-fit h-fit">
            <div class="w-full">
                <p class="text-center text-4xl font-bold mb-2">Welcome back!</p>
                <p class="text-center mb-10">please enter your details</p>
                <div class="relative z-0 w-full mb-5 group">
                    <input v-model="email" type="email" name="floating_email" id="floating_email" class="block py-3 px-0 w-full bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                    <label for="floating_email" class="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <div class="relative z-0 w-full mb-3 group">
                    <input v-model="password" type="password" name="floating_password" id="floating_password" class="block py-3 px-0 w-full bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                    <label for="floating_password" class="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <p class="text-sm text-end text-gray-500 mb-5">Forgot password?</p>
                <button @click="login" class="w-full h-14 rounded-full bg-black text-white text-xl font-bold">Log In</button>
            </div>
            <p>Don't have an account? <b @click="toRegister" class="cursor-pointer">Sign Up</b></p>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import { Vue3Lottie } from "vue3-lottie"
import AnimationData from '../lottiefile/login-register.json'
export default {
    name: "login",
    data() {
        return {
            email: "",
            password: "",
            AnimationData
        }
    },
    components: {
        Vue3Lottie
    },
    mounted() {
        localStorage.removeItem('token')
    },
    methods: {
        login() {
            this.$store.dispatch("login", {email: this.email, password: this.password})
        },
        toRegister() {
            this.$router.push("/register")
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