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
    }
}