<template>
  <div class="h-[10%] flex justify-between items-center mb-4">
    <div class="flex gap-4 items-center">
      <div>
        <img
          :src="'http://localhost:3000/files/avatar/'+userData.avatar"
          class="min-w-14 h-14 rounded-full overflow-hidden object-cover"
          alt="avatar"
        >
      </div>
      <div>
        <p class="font-bold text-black-text text-lg">{{ userData.username }}</p>
        <p class="font-bold text-brown-text">{{ userData.email }}</p>
      </div>
    </div>
    <div @click="find" class="i-add relative top-2 right-2"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "header-user",
    computed: {
      ...mapGetters({
        userData: 'user/userData',
        findSomeone: 'chat/findSomeone'
      }),
    },
    methods: {
        find() {
            this.$store.commit("chat/findSomeone", !this.findSomeone)
        }
    }
}
</script>