<template>
  <div class="bg-light-bg w-full h-screen max-h-screen">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    this.$store.dispatch("userData")
  }
}
</script>