import axios from "axios";
import Compressor from "compressorjs";
const url = "http://localhost:3000/"

export default {
    loadChatList({commit, dispatch, rootState}) {
        axios.get(url + "chatlist", {params: {chatList: rootState.user.user.chatList}})
        .then(res => {
            commit("setChatList", res.data)     /* simpan data list chat */
            commit("openMessage", res.data[0])     /* buka chat pertama */
            dispatch("loadMessage")     /* ambil semua data chat dari setiap user di chatList */
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
                commit("setMessage", {id: receiverId, value: res.data})     /* simpan data chat dari setiap user */
            })
            .catch(err => console.log(err))
        }
    },
    newChatList(context, payload) {
        axios.post(url + "chatlist", payload)
        .then(res => {
            context.dispatch("loadChatList")        /* ulangi ambil data list chat */
        })
        .catch(err => console.log(err))
    },
    sendMessage({state,rootState, commit}, message) {
        const dataChat = {
            userId: rootState.user.userId,
            message,
            to: state.openMessage.userId
        }
        if(state.openMessage.newChat) {        /* kalo user belum termasuk dalam chatList */
            axios.post(url + "chatlist", {to: state.openMessage.userId})       /* menambahkan chatList baru */
            .then(res => {
                axios.post(url + "chat", dataChat)      /* mengirim pesan */
                .then(res => {
                    const {newChat, ...other} = state.openMessage
                    commit("newChatList", other)        /* menyimpan chatList baru */
                    commit("setMessage", {id: state.openMessage.userId, value: [res.data]})        /* menyimpan chat */
                    commit("findSomeone", false)        /* menutup sidebar find user */
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        } else {
            axios.post(url + "chat", dataChat)      /* mengirim pesan */
            .then(res => {
                console.log(res.data);
                commit("newMessage", {id: state.openMessage.userId, value: res.data})     /* menyimpan chat */
            })
            .catch(err => console.log(err))
        }
    },
    messageReceived({state, commit}, {receiverId, value}) {
        if (state.messages[receiverId]) {       /* jika user sudah ada dalam daftar chatList */
            commit("newMessage", {id: receiverId, value: value[0]}) 
        } else {
            commit("setMessage", {id: receiverId, value})
        }
    },
    sendImage({state, commit, dispatch}, caption) {
        new Compressor(state.sendImage.img, {
            quality: 0.6,
            success(res) {
                const formData = new FormData()
                formData.append("media", res)
                axios.post(url + "chat/image", formData)
                .then(res => {
                    commit("deleteSendImage")
                    const message = {
                        text: caption,
                        image: res.data.filename
                    }
                    dispatch("sendMessage", message)
                })
                .catch(err => console.log(err))
            },
            error(err) {
                console.log(err);
                console.log("gagal compress");
            }
        })
    }
}