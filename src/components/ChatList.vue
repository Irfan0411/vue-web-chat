<template>
    <div class="p-4">
        <input type="text" placeholder="Search" class="rounded-2xl w-full h-10 bg-light-bg px-4 my-2">
        <ul>
            <li v-for="chat in chatList" class="my-2 flex justify-between">
                <div class="w-10/12 flex gap-2 items-center">
                    <div class="bg-blue-500 w-14 h-14 rounded-full"></div>
                    <div>
                        <p class="font-bold text-black-text text-lg">{{ chat.conversation.username }}</p>
                        <p class="text-brown-text">Testing...</p>
                    </div>
                </div>
                <p class="mt-2 text-sm text-brown-text">10.20</p>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "chat-list",
    props: {all: Boolean},
    data() {
        return {
            list: []
        }
    },
    computed: {
        chatList() {
            return this.all ? this.list : this.$store.getters.chatList
        }
    },
    props: { all: Boolean },
    mounted() {
        if (this.all) {
            axios.get("http://localhost:3000/user")
            .then(res => this.list = res.data)
            .catch(err => console.log(err))
        }
    }
}
</script>