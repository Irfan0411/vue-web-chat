<template>
    <div class="py-10 h-full">
        <div class="mx-auto py-8 bg-white w-[80%] h-fit rounded-3xl">
            <p class="text-center font-bold text-3xl sm:text-4xl mb-6 md:mb-10">Select Your Avatar</p>
            <div class="w-[70%] mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                <div @click="select('avatar1.png')" :class="avatar === 'avatar1.png' ? 'border-4 border-black-text rounded-full' : ''">
                    <img class="min-w-24 h-24 sm:min-w-36 sm:h-36 rounded-full overflow-hidden" src="http://localhost:3000/files/avatar/avatar1.png" alt="avatar">
                </div>
                <div @click="select('avatar2.png')" :class="avatar === 'avatar2.png' ? 'border-4 border-black-text rounded-full' : ''">
                    <img class="min-w-24 h-24 sm:min-w-36 sm:h-36 rounded-full overflow-hidden" src="http://localhost:3000/files/avatar/avatar2.png" alt="avatar">
                </div>
                <div @click="select('avatar3.png')" :class="avatar === 'avatar3.png' ? 'border-4 border-black-text rounded-full' : ''">
                    <img class="min-w-24 h-24 sm:min-w-36 sm:h-36 rounded-full overflow-hidden" src="http://localhost:3000/files/avatar/avatar3.png" alt="avatar">
                </div>
                <div @click="select('avatar4.png')" :class="avatar === 'avatar4.png' ? 'border-4 border-black-text rounded-full' : ''">
                    <img class="min-w-24 h-24 sm:min-w-36 sm:h-36 rounded-full overflow-hidden" src="http://localhost:3000/files/avatar/avatar4.png" alt="avatar">
                </div>
                <div @click="select('avatar5.png')" :class="avatar === 'avatar5.png' ? 'border-4 border-black-text rounded-full' : ''">
                    <img class="min-w-24 h-24 sm:min-w-36 sm:h-36 rounded-full overflow-hidden" src="http://localhost:3000/files/avatar/avatar5.png" alt="avatar">
                </div>
                <div @click="select('custom')" :class="avatar === 'custom' ? 'border-4 border-black-text rounded-full p-1' : ''">
                    <InputAvatar :selected="avatar === 'custom'" @selectImg="img => selectCustomImg(img)" />
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
import InputAvatar from '../components/InputAvatar.vue';
export default {
    name: "select-avatar",
    data() {
        return {
            avatar: "",
            customImg: null
        }
    },
    components: { Next, InputAvatar },
    methods: {
        select(x) {
            this.avatar = x
        },
        selectCustomImg(img) {
            this.customImg = img
        },
        next() {
            if(this.avatar === 'custom') {
                this.$store.dispatch("user/updateCustomAvatar", this.customImg)
            } else {
                this.$store.dispatch("user/updateUser", {username: this.userData.username, avatar: this.avatar})
            }
        }
    },
    computed: {
        userData() {
            return this.$store.getters['user/userData']
        }
    }
}
</script>