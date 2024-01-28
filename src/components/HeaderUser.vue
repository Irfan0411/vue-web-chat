<template>
  <div class="h-[10%] flex justify-between items-center mb-4">
    <div class="flex gap-4 items-center">
      <div class="rounded-full overflow-hidden w-14 h-14">
        <img :src="'http://localhost:3000/files/'+userData.avatar" alt="avatar">
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
export default {
    name: "header-user",
    computed: {
        userData() {
            return this.$store.getters.userData
        }
    },
    methods: {
        find() {
            this.$store.commit("findSomeone")
        }
    }
}
</script>