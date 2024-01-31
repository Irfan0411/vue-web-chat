<template>
    <div class="p-4">
        <input type="text" placeholder="Search" class="rounded-2xl w-full h-10 bg-light-bg px-4 my-2">
        <ul>
            <li v-for="(chat, i) in displayList" @click="select(i)" class="my-2 flex justify-between" :class="all ? userCheck(chat.userId) : ''">
                <div class="w-10/12 flex gap-2 items-center">
                    <div class="rounded-full overflow-hidden w-14 h-14">
                        <img :src="'http://localhost:3000/files/'+chat?.avatar" alt="avatar">
                    </div>
                    <div>
                        <p class="font-bold text-black-text text-lg">{{ chat?.username }}</p>
                        <p class="text-brown-text">{{ lastChat[i] }}</p>
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
            return this.$store.getters.chatList
        },
        lastChat() {
            return this.$store.getters.lastChat
        },
        displayList() {
            return this.all ? this.list : this.chatList
        }
    },
    props: { all: Boolean },
    methods: {
        select(i) {
            if(this.all) {
                const payload = {
                    receiverId: "",
                    username: this.list[i].username,
                    userId: this.list[i].userId,
                    avatar: this.list[i].avatar,
                    newChat: true
                }
                this.$store.commit("openChat", payload)
            } else {
                const payload = {
                    messagesId: this.chatList[i].messagesId,
                    username: this.chatList[i].username,
                    userId: this.chatList[i].userId,
                    newChat: false
                }
                this.$store.commit("openChat", payload)
            }
        },
        userCheck(userId) {
            return this.chatList?.findIndex(user => {return user?.userId === userId}) !== -1 ? 'hidden' : ''
        }
    },
    mounted() {
        if (this.all) {
            axios.get("http://localhost:3000/user")
            .then(res => this.list = res.data)
            .catch(err => console.log(err))
        }
        setTimeout(() => {
            console.log(this.chatList);
        }, 1000);
    }
}
</script>