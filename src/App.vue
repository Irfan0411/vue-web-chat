<template>
  <div class="bg-light-bg w-full h-screen max-h-screen">
    <router-view></router-view>
  </div>
</template>

<script>
import { state } from './socket';

export default {
  name: "app",
  computed: {
    newChat() {
      return state.newChat
    },
    newChatList() {
      return state.chatList
    }
  },
  watch: {
    newChat: function() {
      this.$store.dispatch("chat/messageReceived", {receiverId: this.newChat.senderId, value: [this.newChat]})
    },
    newChatList: function() {
      this.$store.commit("chat/newChatList", this.newChatList)
    }
  },
  beforeCreate() {
    this.$store.dispatch("user/userData")
  }
}
</script>