import { reactive } from "vue"
import { io } from "socket.io-client"
import { url } from "./config"

export const state = reactive({
    connected: false,
    newChat: {},
    chatList: {}
})

export const socket = io(url)

socket.on("connect", () => {
    state.connected = true
    console.log("socket connected")
})
socket.on("disconnect", () => {
    state.connected = false
    console.log("socket disconnect")
})

socket.on("ping", (from) => {
    console.log("ping from "+from);
})

socket.on("chat", (msg) => {
    state.newChat = msg
})

socket.on("newChat", (chatList) => {
    state.chatList = chatList
})