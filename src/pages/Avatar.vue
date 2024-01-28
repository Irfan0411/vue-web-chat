<template>
    <div class="py-10 h-full">
        <div class="mx-auto bg-white w-[80%] h-full pt-16 rounded-3xl">
            <p class="text-center font-bold text-4xl mb-10">Select Your Avatar</p>
            <div class="w-[70%] mx-auto grid grid-cols-3 gap-4 justify-items-center">
                <div @click="select('avatar1.png')" :class="avatar === 'avatar1.png' ? 'border-4 border-black-text rounded-full' : ''">
                    <img class="min-w-36 h-36 rounded-full overflow-hidden" src="http://localhost:3000/files/avatar1.png" alt="avatar">
                </div>
                <div @click="select('avatar2.png')" :class="avatar === 'avatar2.png' ? 'border-4 border-black-text rounded-full' : ''">
                    <img class="min-w-36 h-36 rounded-full overflow-hidden" src="http://localhost:3000/files/avatar2.png" alt="avatar">
                </div>
                <div @click="select('avatar3.png')" :class="avatar === 'avatar3.png' ? 'border-4 border-black-text rounded-full' : ''">
                    <img class="min-w-36 h-36 rounded-full overflow-hidden" src="http://localhost:3000/files/avatar3.png" alt="avatar">
                </div>
                <div @click="select('avatar4.png')" :class="avatar === 'avatar4.png' ? 'border-4 border-black-text rounded-full' : ''">
                    <img class="min-w-36 h-36 rounded-full overflow-hidden" src="http://localhost:3000/files/avatar4.png" alt="avatar">
                </div>
                <div @click="select('avatar5.png')" :class="avatar === 'avatar5.png' ? 'border-4 border-black-text rounded-full' : ''">
                    <img class="min-w-36 h-36 rounded-full overflow-hidden" src="http://localhost:3000/files/avatar5.png" alt="avatar">
                </div>
                <div @click="select('avatar6.png')" :class="avatar === 'avatar6.png' ? 'border-4 border-black-text rounded-full' : ''">
                    <img class="min-w-36 h-36 rounded-full overflow-hidden" src="http://localhost:3000/files/avatar6.png" alt="avatar">
                </div>
            </div>
            <div class="flex justify-center mt-8">   
                <button @click="next" class="bg-black-text text-white px-8 py-2 rounded-lg flex items-center gap-1">
                    <span class="font-bold">Next</span>
                    <Next />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Next from '../components/icon/Next.vue';
export default {
    name: "select-avatar",
    data() {
        return {
            avatar: ""
        }
    },
    components: { Next },
    methods: {
        select(x) {
            this.avatar = x
        },
        next() {
            this.$store.dispatch("updateUser", {username: this.userData.username, avatar: this.avatar})
        }
    },
    computed: {
        userData() {
            return this.$store.getters.userData
        }
    }
}
</script>