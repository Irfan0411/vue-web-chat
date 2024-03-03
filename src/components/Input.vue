<template>
    <div class="bg-white w-full h-[63px] rounded-full flex gap-2 items-center px-4">
        <label for="attachment" class="i-paperclip cursor-pointer"></label>
        <input ref="image" @input="e => attachment(e.target.files[0])" type="file" id="attachment" class="hidden">
        <input @focusin="toggle" @focusout="toggle" v-model="text" type="text" class="h-full w-full border-none focus:ring-0 text-black-text" placeholder="Type a message">
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
            text: "",
            focus: false
        }
    },
    methods: {
        send() {
            if(this.text) this.$store.dispatch("chat/sendMessage", {text: this.text})
            this.text = ""
        },
        toggle() {
            this.focus ? this.focus = false : this.focus = true
        },
        attachment(img) {
            this.$store.commit("chat/setSendImage", img)
            setTimeout(()=> this.$refs.image.value = null, 1000)
        }
    },
    mounted() {
        window.addEventListener("keydown", (e)=> {
            if(e.key === "Enter" && this.focus) {
                this.send()
            }
        })
    }
}
</script>
