<template>
    <div @click="openImage" class="relative">
        <img :src="`${url}/files/media/${src}`" class="max-w-56 object-contain mt-2" alt="media">
        <div class="bg-black opacity-0 hover:opacity-25 transition-opacity w-full h-full absolute z-10 top-0 left-0 flex justify-center items-center">
            <div class="i-view"></div>
        </div>
    </div>
</template>

<script>
import { url } from '../config';
export default {
    name: "image-viewer",
    data() {
        return {
            url
        }
    },
    props: {
        src: String
    },
    methods: {
        openImage() {
            this.$store.commit("chat/setViewImage", this.src)
        }
    }
}
</script>