<template>
    <div class="h-full max-h-full my-2 overflow-auto">
        <ul>
            <li v-for="chat in messages">
                <Chat :chatDetail="chat" />
            </li>
        </ul>
        <div ref="last"></div>
    </div>
</template>

<script>
import Chat from "./Chat.vue"
export default {
    name: "messages-box",
    components: {Chat},
    computed: {
        messages() {
            return this.$store.getters.message
        }
    },
    mounted() {
        this.$refs.last.scrollIntoView()
    }
}
</script>