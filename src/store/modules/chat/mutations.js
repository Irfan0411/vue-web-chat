import Compressor from "compressorjs";

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
    },
    setViewImage(state, payload) {
        state.viewImage = payload
    },
    deleteViewImage(state) {
        state.viewImage = ""
    },
    uploadImage(state, payload) {
        state.uploadImage = payload
    }
}