<template>
    <div class="flex w-full h-full max-h-svh">
        <div class="h-full w-[30%] min-w-96 relative">
            <div class="pl-4 py-4 flex flex-col h-full">
                <HeaderUser />
                <div class="w-full h-full rounded-3xl bg-white">
                    <ChatList />
                </div>
            </div>
            <div class="w-full h-full bg-white absolute transition-all ease-in-out duration-300 top-0" :class="findSomeone ? 'left-0' : '-left-full'">
                <div class="flex gap-2 items-center w-full h-14 px-4">
                    <div @click="find" class="i-left"></div>
                    <span class="font-bold">Cari Seseorang</span>
                </div>
                <ChatList />
            </div>
        </div>
        <div class="w-[70%] max-h-full p-4 flex flex-col">
            <HeaderMessages />
            <MessagesBox v-if="messages" />
            <Input />
        </div>
    </div>
</template>

<script>
import MessagesBox from "../components/MessagesBox.vue"
import ChatList from "../components/ChatList.vue"
import Input from "../components/Input.vue"
import HeaderUser from "../components/HeaderUser.vue"
import HeaderMessages from "../components/HeaderMessages.vue"

export default {
    name: "home",
    components: { MessagesBox, ChatList, Input, HeaderUser, HeaderMessages },
    methods: {
        find() {
            this.$store.commit("findSomeone")
        }
    },
    computed: {
        userData() {
            return this.$store.getters.userData
        },
        findSomeone() {
            return this.$store.getters.findSomeone
        },
        messages() {
            return this.$store.getters.message
        }
    }
}
</script>