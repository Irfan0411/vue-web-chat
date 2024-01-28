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
                avatar: ""
            },
            chatList: [],
            messages: {},
            openChat: {
                messagesId: "",
                username: "",
                userId: "",
                newChat: false
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
        addChatList(state, payload) {
            state.chatList.push(payload)
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
        login(context, {email, password, newUser}) {
            axios.post(url + "login", {email, password})
            .then(res => {
                localStorage.setItem("token", res.data.token)
                context.dispatch("userData")
                if (newUser) {
                    router.push("/avatar")
                } else {
                    router.push("/")
                }
            })
            .catch(err => {
                alert("Forbidden")
                console.log(err);
            })
        },
        register(context, payload) {
            axios.post(url + "register", payload)
            .then(res => {
                context.dispatch("login", {email: payload.email, password: payload.password, newUser: true})
            })
            .catch(err => console.log(err))
        },
        userData({commit, dispatch}) {
            axios.get(url + "info")
            .then(res => {
                commit("userData", res.data)
                dispatch("loadChatList")
                socket.emit("userId", res.data.userId)
            })
            .catch(err => {
                console.log(err);
                router.push("/login")
            })
        },
        updateUser({state}, payload) {
            axios.post(url + "user/update", payload)
            .then(res => router.push("/"))
            .catch(err => console.log(err))
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
            const dataChat = {
                userId: state.userData.userId,
                message: {
                    text: message
                },
                to: state.openChat.userId
            }
            const newChat = {
                to: state.openChat.userId,
                username: state.openChat.username
            }

            if(state.openChat.newChat) {
                axios.post(url + "chatlist", newChat)
                .then(res => {
                    const newOpenChat = {
                        userId: state.openChat.userId,
                        username: state.openChat.username,
                        messagesId: res.data.messagesId,
                        newChat: false
                    }
                    commit("openChat", newOpenChat)
                    axios.post(url + "chat", dataChat)
                    .then(res => {
                        commit("addChatList", {
                            messagesId: state.openChat.messagesId,
                            conversation: {
                                userId: state.openChat.userId,
                                username: state.openChat.username
                            }
                        })
                        commit("loadMessage", {messagesId: state.openChat.messagesId, value: [res.data]})
                        commit("findSomeone")
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            } else {
                axios.post(url + "chat", dataChat)
                .then(res => {
                    commit("addChat", {messagesId: state.openChat.messagesId, chat: res.data})
                })
                .catch(err => console.log(err))
            }
        }
    }
})

export default store