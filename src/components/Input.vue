<template>
    <div class="bg-white w-full h-16 rounded-full flex gap-2 items-center px-4">
        <div class="i-paperclip cursor-pointer"></div>
        <input v-model="text" type="text" class="h-full w-full border-none focus:ring-0 text-black-text" placeholder="Type a message">
        <div class="w-9 h-9 cursor-pointer rounded-full flex justify-center items-center">
            <div class="i-emote"></div>
        </div>
        <div @click="send" class="min-w-9 h-9 cursor-pointer rounded-full bg-icon-blue flex justify-center items-center">
            <div class="i-send"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "input-chat",
    data() {
        return {
            text: ""
        }
    },
    methods: {
        send() {
            this.$store.dispatch("sendMessage", {message: this.text, to: "8b2d79cgj951c"})
        }
    }
}
</script>
