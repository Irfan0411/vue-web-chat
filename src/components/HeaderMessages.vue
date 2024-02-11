<template>
  <div class="h-[10%] px-4 box-border flex justify-between items-center bg-blue-200 rounded-md">
    <div v-if="openMessage" class="flex gap-2 items-center">
      <div>
        <img
          :src="'http://localhost:3000/files/avatar/'+openMessage.avatar"
          class="rounded-full overflow-hidden min-w-12 h-12 object-cover"
          alt="avatar"
        >
      </div>
      <p class="font-extrabold text-xl text-black-text">{{ openMessage.username }}</p>
    </div>
    <div v-if="openMessage" class="flex gap-2">
      <div class="bg-blue-300 w-9 h-9 rounded-full flex justify-center items-center">
        <div class="i-telephone"></div>
      </div>
      <div class="bg-blue-300 w-9 h-9 rounded-full flex justify-center items-center">
        <div class="i-videocall"></div>
      </div>
      <div class="bg-blue-300 w-9 h-9 rounded-full flex justify-center items-center">
        <div class="i-bullets"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "header-messages",
  computed: {
    ...mapGetters({
      openMessage: 'chat/openMessage'
    })
  },
  mounted() {
    setTimeout(()=> console.log(this.openMessage), 1000)
  }
}
</script>
