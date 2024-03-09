<template>
    <div class="absolute top-0 left-0 z-10 w-screen h-screen backdrop-blur-sm flex justify-center items-center">
        <div class="w-[90%] max-w-screen-sm h-fit max-h-[90%] p-4 rounded-lg bg-slate-100 shadow-md shadow-slate-400 flex flex-col gap-4 relative">
            <img v-if="preview" class="w-full h-full object-contain overflow-hidden" :src="preview" alt="preview">
            <div v-else class="w-full h-60 flex justify-center items-center flex-col">
                <div class="loader"></div>
                <p>Sedang mengompres foto...</p>
            </div>
            <div v-if="uploadImage" class=" w-full h-full absolute top-0 left-0 flex justify-center items-center flex-col">
                <div class="w-52 h-40 bg-white rounded-xl absolute">
                </div>
                <div class="loader"></div>
                <p class="relative">Sedang mengirim foto...</p>
            </div>
            <div class="w-full min-h-14 bg-white rounded-full border-2 overflow-hidden flex items-center gap-2 px-4">
                <input v-model="caption" type="text" placeholder="Type a caption" class="w-full h-full focus:ring-0 border-none text-black-text">
                <div @click="send"  class="min-w-9 h-9 cursor-pointer rounded-full bg-icon-blue flex justify-center items-center">
                    <div class="i-send"></div>
                </div>
            </div>
            <div @click="close" class="i-left absolute top-4 left-4"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "input-image",
    data() {
        return{
            caption: ""
        }
    },
    computed: {
        ...mapGetters({
            uploadImage: "chat/uploadImage"
        })
    },
    props: {
        preview: String
    },
    methods: {
        close() {
            this.$store.commit("chat/deleteSendImage")
        },
        send() {
            this.$store.dispatch("chat/sendImage", this.caption)
        }
    }
}
</script>

<style scoped>
.loader {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}
</style>