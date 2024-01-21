import axios from "axios";
import { createStore } from "vuex";
import router from "../router"
import { socket } from "../socket";

const url = "http://localhost:3000/"

const store = createStore({
    state() {
        return {
            userData: {
                userId: "",
                username: "",
                email: "",
            },
            chatList: [],
            messages: {},
            openChat: {
                messagesId: "",
                username: "",
                userId: ""
            },
            findSomeone: false
        }
    },
    getters: {
        userId(state) {
            return state.userData.userId
        },
        userData(state) {
            return state.userData
        },
        chatList(state) {
            return state.chatList
        },
        lastChat(state) {
            return state.chatList?.map(chat => (state.messages[chat.messagesId]?.slice(-1)[0].message.text))
        },
        message(state) {
            return state.messages[state.openChat.messagesId]?.map((v, i) => ({...v, id: i}))
        },
        findSomeone(state) {
            return state.findSomeone
        },
        openChat(state) {
            return state.openChat
        }
    },
    mutations: {
        userData(state, payload) {
            state.userData = payload
        },
        loadChatList(state, payload) {
            state.chatList = payload
        },
        loadMessage(state, {messagesId, value}) {
            state.messages[messagesId] = value
        },
        addChat(state, {messagesId, chat}) {
            state.messages[messagesId]?.push(chat)
        },
        findSomeone(state) {
            state.findSomeone ? state.findSomeone = false : state.findSomeone = true
        },
        openChat(state, payload) {
            state.openChat = payload
        }
    },
    actions: {
        login(context, payload) {
            axios.post(url + "login", payload)
            .then(res => {
                localStorage.setItem("token", res.data.token)
                context.dispatch("userData")
                router.push("/")
            })
            .catch(err => {
                alert("Forbidden")
                console.log(err);
            })
        },
        register(context, payload) {
            axios.post(url + "register", payload)
            .then(res => {
                context.dispatch("login", {email: payload.email, password: payload.password})
            })
            .catch(err => console.log(err))
        },
        userData({commit, dispatch}) {
            axios.get(url + "info")
            .then(res => {
                commit("userData", res.data)
                dispatch("loadChatList")
                console.log(res.data);
                socket.emit("userId", res.data.userId)
            })
            .catch(err => {
                console.log(err);
                router.push("/login")
            })
        },
        loadChatList({commit, dispatch}) {
            axios.get(url + "chatlist")
            .then(res => {
                commit("loadChatList", res.data)
                const payload = {
                    messagesId: res.data[0].messagesId,
                    userId: res.data[0].conversation.userId,
                    username: res.data[0].conversation.username
                }
                commit("openChat", payload)
                dispatch("loadMessage")
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        },
        loadMessage({state, commit}) {
            for (let i = 0; i < state.chatList.length; i++) {
                const messagesId = state.chatList[i].messagesId
                axios.get(url + "chat/" + messagesId)
                .then(res => {
                    commit("loadMessage", {messagesId, value: res.data})
                    console.log(res.data);
                })
                .catch(err => console.log(err))
            }
        },
        addChatList(context, payload) {
            axios.post(url + "chatlist", payload)
            .then(res => {
                context.dispatch("loadChatList")
            })
            .catch(err => console.log(err))
        },
        sendMessage({state, commit}, message) {
            const data = {
                userId: state.userData.userId,
                message: {
                    text: message
                },
                to: state.openChat.userId
            }
            axios.post(url + "chat", data)
            .then(res => {
                console.log(res.data);
                commit("addChat", {messagesId: state.openChat.messagesId, chat: res.data})
            })
            .catch(err => console.log(err))
        }
    }
})

export default store