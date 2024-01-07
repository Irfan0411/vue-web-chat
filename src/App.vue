<template>
  <div class="bg-light-bg w-full h-screen max-h-screen">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
// import { socket } from './socket';

export default {
  name: "app",
  // mounted() {
  //   axios.get("http://localhost:3000/info")
  //   .then(res => socket.emit("userId", res.data.userId))
  // }
}
</script>