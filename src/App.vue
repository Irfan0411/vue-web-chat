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
    }
  },
  watch: {
    newChat: function() {
      this.$store.commit("addChat", {messagesId: this.newChat.messagesId, chat: this.newChat})
    }
  },
  beforeCreate() {
    this.$store.dispatch("userData")
  }
}
</script>