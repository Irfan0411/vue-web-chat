import axios from "axios";
import { createStore } from "vuex";
import router from "../router"
import { socket } from "../socket";
import Compressor from "compressorjs";

const url = "http://localhost:3000/"

const store = createStore({
    state() {
        return {
            userData: {
                userId: "",
                username: "",
                email: "",
                avatar: "",
                chatList: []
            },
            chatList: [],
            messages: {},
            openChat: {
                avatar: "",
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
            return state.chatList?.map(chat => (state.messages[chat.userId]?.slice(-1)[0].message.text))
        },
        message(state) {
            return state.messages[state.openChat?.userId]?.map((v, i) => ({...v, id: i}))
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
        loadMessage(state, {receiverId, value}) {
            state.messages[receiverId] = value
        },
        addChat(state, {receiverId, value}) {
            state.messages[receiverId]?.push(value)
        },
        findSomeone(state) {
            state.findSomeone ? state.findSomeone = false : state.findSomeone = true
        },
        openChat(state, payload) {
            state.openChat = payload
        }
    },
    actions: {
        login({commit, dispatch}, {email, password, newUser}) {
            axios.post(url + "login", {email, password})
            .then(res => {
                localStorage.setItem("token", res.data.token)
                const { token, ...data } = res.data
                commit("userData", data)
                dispatch("loadChatList")
                socket.emit("userId", res.data.userId)

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
        updateUser(context, payload) {
            axios.post(url + "user/update", payload)
            .then(res => router.push("/"))
            .catch(err => console.log(err))
        },
        updateCustomAvatar({state, dispatch}, img) {
            new Compressor(img, {
                quality: 0.6,
                mimeType: "image/png",
                success(res) {
                    const formData = new FormData()
                    formData.append("avatar", res, state.userData.userId+".png")
                    axios.post(url + "user/avatar", formData)
                    .then(res => {
                        dispatch("updateUser", {username: state.userData.username, avatar: state.userData.userId+".png"})
                    })
                    .catch(err => console.log(err))
                },
                error(err) {
                    console.log(err)
                }
            })
        },
        loadChatList({commit, dispatch, state}) {
            axios.get(url + "chatlist", {params: {chatList: state.userData.chatList}})
            .then(res => {
                commit("loadChatList", res.data)
                commit("openChat", res.data[0])
                dispatch("loadMessage")
            })
            .catch(err => {
                console.log(err);
            })
        },
        loadMessage({state, commit}) {
            for (let i = 0; i < state.chatList.length; i++) {
                const receiverId = state.chatList[i].userId
                axios.get(url + "chat/" + receiverId)
                .then(res => {
                    commit("loadMessage", {receiverId, value: res.data})
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
            if(state.openChat.newChat) {
                axios.post(url + "chatlist", {to: state.openChat.userId})
                .then(res => {
                    axios.post(url + "chat", dataChat)
                    .then(res => {
                        const {newChat, ...other} = state.openChat
                        commit("addChatList", other)
                        commit("loadMessage", {receiverId: state.openChat.userId, value: [res.data]})
                        commit("findSomeone")
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            } else {
                axios.post(url + "chat", dataChat)
                .then(res => {
                    commit("addChat", {receiverId: state.openChat.userId, value: res.data})
                })
                .catch(err => console.log(err))
            }
        },
        messageReceived({state, commit}, {receiverId, value}) {
            console.log({receiverId, value});
            console.log(state.messages[receiverId]);
            if (state.messages[receiverId]) {
                commit("addChat", {receiverId, value: value[0]})
            } else {
                commit("loadMessage", {receiverId, value})
            }
        }
    }
})

export default store