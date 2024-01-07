<template>
    <div>
        <p>Hubungkan teman anda</p>
        <div>
            <input v-model="input" type="text" placeholder="typed here...">
        </div>
        <div>
            <ol>
                <li v-for="user in userList" @click="chat(user.userId)" :class="filter(user.username)">{{ user.username }}</li>
            </ol>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "friends",
    data() {
        return {
            input: "",
            userList: []
        }
    },
    methods: {
        filter(username) {
            if(username.toLowerCase().search(this.input.toLowerCase()) === -1) {
                return "hidden"
            } else {
                return ""
            }
        },
        chat(id) {
            this.$router.push("/chat/"+id)
        }
    },
    mounted() {
        axios.get("http://localhost:3000/user")
        .then(res => this.userList = res.data)
        .catch(err => console.log(err))
    }
}
</script>

<style scoped>
.hidden{
    display: none;
}
</style>