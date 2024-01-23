import { reactive } from "vue"
import { io } from "socket.io-client"

export const state = reactive({
    connected: false,
    newChat: {},
    chatList: {}
})

export const socket = io("http://localhost:3000")

socket.on("connect", () => {
    state.connected = true
    console.log("socket connected")
    console.log(socket.id);
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
    console.log(msg);
})

socket.on("newChat", (chatList) => {
    state.chatList = chatList
    console.log(chatList)
})