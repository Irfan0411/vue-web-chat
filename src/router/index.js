import { createRouter, createWebHistory } from "vue-router"
import Home from "../pages/Home.vue"
import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"
import Chat from "../pages/Chat.vue"
import Friends from "../pages/Friends.vue"

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
        path: "/chat/:id",
        component: Chat
    },
    {
        path: "/friends",
        component: Friends
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router