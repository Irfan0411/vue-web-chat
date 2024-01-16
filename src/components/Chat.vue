<template>
    <div class="w-full py-1 flex" :class="sender">
        <div class="w-max max-w-[80%] py-1 px-3 bg-white rounded-2xl">
            <p>{{ chatDetail.message?.text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "bobble-chat",
    props: {chatDetail: Object},
    computed: {
        userId() {
            return this.$store.getters.userId
        },
        sender() {
            return this.chatDetail.senderId === this.userId ? 'justify-end' : 'justify-start'
        }
    }
}
</script>