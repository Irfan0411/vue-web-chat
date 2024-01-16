<template>
    <div class="flex w-full h-full">
        <div class="h-full w-[30%] min-w-96 relative">
            <div class="pl-4 py-4 flex flex-col h-full">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex gap-4 items-center">
                        <div class="bg-blue-700 rounded-full w-14 h-14"></div>
                        <div>
                            <p class="font-bold text-black-text text-lg">{{ userData.username }}</p>
                            <p class="font-bold text-brown-text">{{ userData.email }}</p>
                        </div>
                    </div>
                    <div @click="find" class="i-add relative top-2 right-2"></div>
                </div>
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
        <div class="w-[70%] p-4 flex flex-col">
            <div class="flex p-4 justify-between items-center bg-blue-200 rounded-md">
                <div class="flex gap-2 items-center">
                    <div class="bg-blue-600 w-14 h-14 rounded-full"></div>
                    <p class="font-extrabold text-xl text-black-text">Agus</p>
                </div>
                <div class="flex gap-2">
                    <div class="bg-blue-300 w-9 h-9 rounded-full flex justify-center items-center">
                        <div class="i-telephone"></div>
                    </div>
                    <div class="bg-blue-300 w-9 h-9 rounded-full flex justify-center items-center">
                        <div class="i-videocall"></div>
                    </div>
                    <div class="bg-blue-300 w-9 h-9 rounded-full flex justify-center items-center">
                        <div class="i-bullets"></div>
                    </div>
                </div>
            </div>
            <MessagesBox />
            <Input />
        </div>
    </div>
</template>

<script>
import MessagesBox from "../components/MessagesBox.vue"
import ChatList from "../components/ChatList.vue"
import Input from "../components/Input.vue"

export default {
    name: "home",
    data() {
        return{
            infoUser : {},
            list: [],
            items: [{uid: 'unique_1', text: 'abc'}, {uid: 'unique_2', text: 'xyz'}]
        }
    },
    components: { MessagesBox, ChatList, Input },
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
        }
    }
}
</script>