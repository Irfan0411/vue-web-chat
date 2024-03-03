import Compressor from "compressorjs";
import {toRefs} from "vue"

export default {
    setChatList(state, payload) {
        state.chatList = payload
    },
    newChatList(state, payload) {
        state.chatList.push(payload)
    },
    setMessage(state, {id, value}) {
        state.messages[id] = value
    },
    newMessage(state, {id, value}) {
        state.messages[id].push(value)
    },
    openMessage(state, payload) {
        state.openMessage = payload
    },
    findSomeone(state, payload) {
        state.findSomeone = payload
    },
    isOpen(state, payload) {
        state.isOpen = payload
    },
    setSendImage(state, payload) {
        state.sendImage.isOpen = true
        console.log("is open");
        new Compressor(payload, {
            quality: 0.6,
            mimeType: "image/jpg",
            success(res) {
                state.sendImage = {
                    img: res,
                    preview: URL.createObjectURL(res),
                    isOpen: true
                }
                console.log("is compress");
            },
            error(err) {
                console.log(err)
            }
        })
    },
    deleteSendImage(state) {
        state.sendImage = { img: null, preview: "", isOpen: false}
    }
}