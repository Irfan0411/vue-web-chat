import axios from "axios";
import { createStore } from "vuex";
import router from "../router"

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
            openChat: ""
        }
    },
    getters: {
        userData(state) {
            return state.userData
        },
        chatList(state) {
            return state.chatList
        },
        message(state) {
            return state.messages[state.openChat]
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
        userData(context) {
            axios.get(url + "info")
            .then(res => {
                context.commit("userData", res.data)
                console.log(res.data);
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
                dispatch("loadMessage")
            })
        },
        loadMessage({state, commit}) {
            for (let i = 0; i < state.chatList.length; i++) {
                const messagesId = state.chatList[i].messagesId
                axios.get(url + "chat/" + messagesId)
                .then(res => {
                    commit("loadMessage", {messagesId, value: res.data})
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
        }
    }
})

export default store