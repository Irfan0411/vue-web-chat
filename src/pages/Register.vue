<template>
    <div class="w-full h-full flex p-2">
        <div class="w-[50%] lg:w-[60%] hidden md:flex justify-center items-center">
            <Vue3Lottie
                :animation-data="AnimationData"
                :height="500"
                :width="500"
            />
        </div>
        <div class="w-[50%] lg:w-[40%] h-full bg-white rounded-xl py-14 px-20 hidden md:flex flex-col justify-between items-center">
            <img src="/icon/chat-icon.png" alt="icon" class="w-fit h-fit">
            <div class="w-full">
                <p class="text-center text-4xl font-bold mb-2">Hello there!</p>
                <p class="text-center mb-10">please enter your details</p>
                <div class="relative z-0 w-full mb-3 group">
                    <input v-model="email" type="email" name="floating_email" id="floating_email" class="block py-3 px-0 w-full bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                    <label for="floating_email" class="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <div class="relative z-0 w-full mb-3 group">
                    <input v-model="username" type="text" name="floating_username" id="floating_username" class="block py-3 px-0 w-full bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                    <label for="floating_username" class="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
                <div class="relative z-0 w-full mb-3 group">
                    <input v-model="password" type="password" name="floating_password" id="floating_password" class="block py-3 px-0 w-full bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                    <label for="floating_password" class="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input v-model="confirmPassword" type="password" name="floating_confirm" id="floating_confirm" class="block py-3 px-0 w-full bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                    <label for="floating_confirm" class="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                </div>
                <button @click="register" class="w-full h-14 rounded-full bg-black text-white text-xl font-bold">Sign Up</button>
            </div>
            <p>Already an account? <b @click="toLogin" class="cursor-pointer">Log in</b></p>
        </div>
    </div>
</template>

<script>
import { Vue3Lottie } from "vue3-lottie"
import AnimationData from "../lottiefile/login-register.json"

export default {
    name: "register",
    data() {
        return {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            AnimationData
        }
    },
    components: {
        Vue3Lottie
    },
    methods: {
        register() {
            if (this.password === this.confirmPassword) {
                this.$store.dispatch("user/register", {email: this.email, username: this.username, password: this.password})
            } else {
                alert("password and confirm password not match!!")
            }
        },
        toLogin() {
            this.$router.push("/login")
        }
    },
}
</script>

<style scoped>
.form{
    display: flex;
    flex-direction: column;
    max-width: 200px;
}
</style>