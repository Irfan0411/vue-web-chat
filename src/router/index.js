import { createRouter, createWebHistory } from "vue-router"
import Home from "../pages/Home.vue"
import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import Avatar from "../pages/Avatar.vue"

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/avatar",
        component: Avatar
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router