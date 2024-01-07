<template>
    <div class="body">
        <p>Chat to: {{ username }}</p>
        <div class="container">
            <p v-if="firstChat" class="center">Memulai chat baru anda...</p>
            <div v-else v-for="chat in chatlist" :class="chat.senderId === receiver.userId ? 'kiri' : 'kanan'">
                <img v-if="chat.message.image" :src="`http://localhost:3000/files/${chat.message.image}`" alt="">
                <p>{{ chat.message.text }}</p>
            </div>
        </div>
        <div class="input">
            <input v-model="input" type="text" placeholder="Type messages.....">
            <button @click="sendMessage">Kirim</button>
            <input type="file" @input="e => inputImage(e.target.files[0])">
            <button @click="sendImage">kirim foto</button>
        </div>
        <img crossorigin="anonymous" src="http://localhost:3000/files/653333452767623504.png" alt="">
    </div>
</template>

<script>
import axios from 'axios'
// import { state } from '../socket'
import _ from 'lodash'
export default {
    name: "chat-user",
    data() {
        return {
            chatlist: [],
            infoUser: {},
            receiver: {},
            input: "",
            files: [],
            firstChat: false
        }
    },
    // watch: {
    //     newChat: function() {
    //         const { createdAt, ...data } = _.cloneDeep(this.newChat)   
    //         this.chatlist.push(data)
    //     }
    // },
    computed: {
        username() {
            return this.receiver.username
        },
        // newChat() {
        //     return state.newChat
        // }
    },
    methods: {
        getInfoUser() {
            axios.get("http://localhost:3000/info")
            .then(res => {
                this.infoUser = res.data
                console.log(res.data);
                this.getReceiver()
            })
            .catch(err => {
                this.$router.push("/login")
            })
        },
        getReceiver() {
            axios.get("http://localhost:3000/user/"+ this.$route.params.id)
            .then(res => {
                this.receiver = res.data
                this.getChatList()
            })
            .catch(err => console.log(err))
        },
        getChatList() {
            const messagesId = this.infoUser.userId > this.receiver.userId
                     ? this.infoUser.userId + this.receiver.userId
                     : this.receiver.userId + this.infoUser.userId

            axios.get("http://localhost:3000/chat/"+messagesId)
            .then(res => {
                this.chatlist = res.data
                console.log(res.data);
            })
            .catch(err => {
                if(err.response.status === 404) this.firstChat = true
            })
        },
        sendMessage() {
            console.log(this.input);
            const data = {
                userId: this.infoUser.userId,
                message: {
                    text: this.input
                },
                to: this.receiver.userId
            }

            if(this.firstChat) {
                axios.post("http://localhost:3000/chatlist", {
                    to: this.receiver.userId,
                    username: this.receiver.username
                })
                .then(()=> {
                    axios.post("http://localhost:3000/chat", data)
                    .then(res => this.chatlist.push(res.data))
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
                .finally(()=> this.input = "")
            } else {
                axios.post("http://localhost:3000/chat", data)
                .then(res => this.chatlist.push(res.data))
                .catch(err => console.log(err))
                .finally(()=> this.input = "")
            }
        },
        inputImage(file) {
            this.files[0] = file
        },
        sendImage() {
            const data = {
                userId: this.infoUser.userId,
                message: {
                    text: "",
                    image: ""
                },
                to: this.receiver.userId
            }

            const formData = new FormData()
            formData.append("file", this.files[0])
            axios.post("http://localhost:3000/chat/image", formData)
            .then(res => {
                data.message.image = res.data.filename
                axios.post("http://localhost:3000/chat", data)
                .then(res => this.chatlist.push(res.data))
                .catch(err => console.log(err))
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.getInfoUser()
    }
}
</script>

<style scoped>
.body{
    max-height: 100vh;
}
.container{
    max-height: 80vh;
    max-width: 500px;
    overflow: scroll;
}
.kanan{
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: right;
}
.kiri{
    display: flex;
    width: 100%;
    justify-content: left
}
.center{
    text-align: center;
}
</style>