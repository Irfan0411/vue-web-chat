export default {
    chatList(state) {
        return state.chatList
    },
    lastChat(state) {
        return state.chatList?.map(chat => (state.messages[chat.userId]?.slice(-1)[0].message.text))
    },
    message(state) {
        return state.messages[state.openMessage?.userId]?.map((v, i) => ({...v, id: i}))
    },
    findSomeone(state) {
        return state.findSomeone
    },
    openMessage(state) {
        return state.openMessage
    },
    isOpen(state) {
        return state.isOpen
    },
    sendImage(state) {
        return state.sendImage
    }
}