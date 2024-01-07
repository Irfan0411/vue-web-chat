<template>
    <div class="h-full max-h-full my-2 overflow-auto">
        <ul>
            <li v-for="chat in messages">
                <Chat />
            </li>
        </ul>
        <div ref="last"></div>
    </div>
</template>

<script>
import Chat from "./Chat.vue"
export default {
    name: "messages-box",
    data() {
        return {
            messages: [{id: 1, text: "a"}, {id: 2, text: "b"}, {id: 3, text: "c"}, {id: 1, text: "a"}, {id: 2, text: "b"}, {id: 3, text: "c"}, {id: 1, text: "a"}, {id: 2, text: "b"}, {id: 3, text: "c"}, {id: 1, text: "a"}, {id: 2, text: "b"}, {id: 3, text: "c"}, {id: 1, text: "a"}, {id: 2, text: "b"}, {id: 3, text: "c"}, {id: 1, text: "a"}, {id: 2, text: "b"}, {id: 3, text: "c"}]
        }
    },
    components: {Chat},
    mounted() {
        this.$refs.last.scrollIntoView()
    }
}
</script>