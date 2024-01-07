<template>
    <div class="flex w-full h-full">
        <div class="h-full w-1/3 min-w-96 p-4 flex flex-col">
            <div class="flex justify-between items-start">
                <div class="flex gap-4 items-center">
                    <div class="bg-blue-700 rounded-full w-14 h-14"></div>
                    <div>
                        <p class="font-bold text-black-text text-lg">Irfan Faqih</p>
                        <p class="font-bold text-brown-text">@burunglain</p>
                    </div>
                </div>
                <div class="i-add relative top-2 right-2"></div>
            </div>
            <div class="bg-white rounded-3xl w-full h-full mt-6 p-6">
                <input type="text" placeholder="Search" class="rounded-full w-full h-14 bg-light-bg px-4 my-2">
                <div class="my-2 flex justify-between">
                    <div class="w-10/12 flex gap-2 items-center">
                        <div class="bg-blue-500 w-14 h-14 rounded-full"></div>
                        <div>
                            <p class="font-bold text-black-text text-lg">Fahrizal Lutfi</p>
                            <p class="text-brown-text">Testing...</p>
                        </div>
                    </div>
                    <p class="mt-2 text-sm text-brown-text">10.20</p>
                </div>
            </div>
        </div>
        <div class="w-2/3 py-4 pr-4 flex flex-col">
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
            <div class="bg-white w-full h-16 rounded-full flex gap-2 items-center px-4">
                <div class="i-paperclip cursor-pointer"></div>
                <input type="text" class="h-full w-full outline-none text-black-text" placeholder="Type a message">
                <div class="w-9 h-9 cursor-pointer rounded-full flex justify-center items-center">
                    <div class="i-emote"></div>
                </div>
                <div class="min-w-9 h-9 cursor-pointer rounded-full bg-icon-blue flex justify-center items-center">
                    <div class="i-send"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MessagesBox from "../components/MessagesBox.vue"
import axios from "axios"
// import { state } from "../socket"
export default {
    name: "home",
    data() {
        return{
            infoUser : {},
            list: [],
            items: [{uid: 'unique_1', text: 'abc'}, {uid: 'unique_2', text: 'xyz'}]
        }
    },
    components: { MessagesBox },
    // mounted() {
    //     if(!localStorage.getItem("token")) this.$router.push("/login")
    //     axios.get("http://localhost:3000/info")
    //     .then(res => {
    //         this.infoUser = res.data
    //     })
    //     .catch(err => {
    //         this.$router.push("/login")
    //     })
    //     axios.get("http://localhost:3000/chatlist")
    //     .then(res => {
    //         console.log(res.data);
    //         this.list = res.data
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // },
    methods: {
        ping(to) {
            this.$router.push("/chat/"+to)
        }
    },
    computed: {
        // connected() {
        //     return state.connected
        // }
    }
}
</script>