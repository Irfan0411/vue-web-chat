import axios from "axios";
import router from "../../../router"
import { socket } from "../../../socket";
import Compressor from "compressorjs";
import { url } from "../../../config";

export default {
    login({commit, dispatch}, {email, password, newUser}) {
        axios.post(url + "/login", {email, password})
        .then(res => {
            localStorage.setItem("token", res.data.token)
            const { token, ...data } = res.data
            commit("userData", data)        /* simpan data user */
            dispatch("chat/loadChatList", null, {root: true})        /* ambil data list chat */
            socket.emit("userId", res.data.userId)      /* join room socket.io */

            if (newUser) {
                router.push("/avatar")      /* pilih avatar untuk user baru */
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
        axios.post(url + "/register", payload)
        .then(res => {
            context.dispatch("login", {email: payload.email, password: payload.password, newUser: true})
        })
        .catch(err => console.log(err))
    },
    userData({commit, dispatch}) {
        axios.get(url + "/info")
        .then(res => {
            commit("userData", res.data)        /* simpan data user */
            dispatch("chat/loadChatList", null, {root: true})        /* ambil data list chat */
            socket.emit("userId", res.data.userId)      /* join room socket.io */
        })
        .catch(err => {
            console.log(err);
            router.push("/login")
        })
    },
    updateUser(context, payload) {
        axios.post(url + "/user/update", payload)
        .then(res => router.push("/"))
        .catch(err => console.log(err))
    },
    updateCustomAvatar({state, dispatch}, img) {
        // compress foto dati input untuk diupload
        new Compressor(img, {
            quality: 0.6,
            mimeType: "image/png",
            success(res) {
                const formData = new FormData()
                formData.append("avatar", res,  state.user.userId+".png")
                axios.post(url + "/user/avatar", formData)
                .then(res => {
                    dispatch("updateUser", {username:  state.user.username, avatar:  state.user.userId+".png"})
                })
                .catch(err => console.log(err))
            },
            error(err) {
                console.log(err)
            }
        })
    }
}