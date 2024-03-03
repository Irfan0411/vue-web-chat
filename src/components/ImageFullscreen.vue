<template>
    <div class="absolute w-screen h-screen top-0 left-0 backdrop-blur-sm">
        <div class="w-full h-full bg-black opacity-65"></div>
        <div class="absolute w-full h-full top-0 left-0 flex justify-center items-center overflow-auto">
            <img class="w-[90%] h-[90%] object-contain transition-all" :style="`scale: ${zoom}; rotate: ${rotate}deg`" :src="`http://localhost:3000/files/media/${src}`" alt="media">
        </div>
        <div class="flex gap-5 items-center absolute top-5 right-5 z-30">
            <div @click="rotateleft" class="i-rotate-left"></div>
            <div @click="rotateright" class="i-rotate-right"></div>
            <div @click="zoomin" class="i-zoomin"></div>
            <div @click="zoomout" class="i-zoomout"></div>
            <div @click="close" class="i-x"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "image-fullscreen",
    data() {
        return{
            zoom: 1,
            rotate: 0
        }
    },
    props: {
        src: String
    },
    methods: {
        close() {
            this.$store.commit("chat/deleteViewImage")
        },
        zoomin() {
            this.zoom += 0.1
        },
        zoomout() {
            this.zoom -= 0.1
        },
        rotateleft() {
            this.rotate -= 90
        },
        rotateright() {
            this.rotate += 90
        }
    }
}
</script>