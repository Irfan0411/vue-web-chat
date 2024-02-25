<template>
    <div class="w-full max-h-full h-full relative overflow-hidden">
        <div class="sm:grid grid-cols-10 lg:grid-cols-3 gap-8 sm:gap-4 w-full max-h-full h-full">
            <div :class="`${isOpen ? 'hidden' : 'block'} sm:block h-full col-span-5 md:col-span-4 lg:col-span-1 py-4 pl-4 pr-4 sm:pr-0`">
                <div class="flex flex-col h-full">
                    <HeaderUser />
                    <div class="w-full h-full rounded-3xl bg-white">
                        <ChatList />
                    </div>
                </div>
            </div>
            <div :class="`max-h-screen h-full ${isOpen ? 'flex' : 'hidden'} sm:flex flex-col col-span-5 md:col-span-6 lg:col-span-2 py-4 pr-4 pl-4 sm:pl-0`">
                <HeaderMessages />
                <MessagesBox v-if="messages" />
                <div v-else class="h-full flex items-center justify-center">
                    <p>Belum ada chat nih, yuk mulai..!</p>
                </div>
                <Input />
            </div>
        </div>
        <div class="w-full sm:w-1/2 h-full bg-white absolute transition-all ease-in-out duration-300 top-0" :class="findSomeone ? 'left-0' : '-left-full'">
            <div class="flex gap-2 items-center w-full h-14 px-4">
                <div @click="find" class="i-left"></div>
                <span class="font-bold">Cari Seseorang</span>
            </div>
            <ChatList all />
        </div>
    </div>
</template>

<script>
import MessagesBox from "../components/MessagesBox.vue"
import ChatList from "../components/ChatList.vue"
import Input from "../components/Input.vue"
import HeaderUser from "../components/HeaderUser.vue"
import HeaderMessages from "../components/HeaderMessages.vue"
import { mapGetters } from "vuex"

export default {
    name: "home",
    components: { MessagesBox, ChatList, Input, HeaderUser, HeaderMessages },
    methods: {
        find() {
            this.$store.commit("chat/findSomeone", !this.findSomeone)
        }
    },
    computed: {
        ...mapGetters({
            userData: 'user/userData',
            findSomeone: 'chat/findSomeone',
            messages: 'chat/message',
            isOpen: 'chat/isOpen'
        })
    },
}
</script>