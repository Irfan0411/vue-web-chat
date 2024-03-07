<template>
  <div class="h-[70px] flex justify-between items-center mb-4">
    <div class="flex gap-4 items-center">
      <div>
        <img
          :src="url+'/files/avatar/'+userData.avatar"
          class="min-w-14 h-14 rounded-full overflow-hidden object-cover"
          alt="avatar"
        >
      </div>
      <div>
        <p class="font-bold text-black-text text-lg">{{ userData.username }}</p>
        <p class="font-bold text-brown-text">{{ userData.email }}</p>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div @click="find" class="i-add"></div>
      <div @click="logout" class="i-logout"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { url } from '../config';
export default {
    name: "header-user",
    data() {
      return {
        url
      }
    },
    computed: {
      ...mapGetters({
        userData: 'user/userData',
        findSomeone: 'chat/findSomeone'
      }),
    },
    methods: {
        find() {
          this.$store.commit("chat/findSomeone", !this.findSomeone)
        },
        logout() {
          this.$router.push("/login")
        }
    }
}
</script>