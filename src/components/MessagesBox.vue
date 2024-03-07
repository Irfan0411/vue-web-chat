<template>
    <div class="h-full my-2 overflow-y-scroll">
        <DynamicScroller
            ref="scroller"
            :items="messages"
            :min-item-size="54"
            >
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem
                    :item="item"
                    :active="active"
                    :size-dependencies="[item.message.text]"
                    :data-index="index"
                >
                    <div class="w-full py-1 flex" :class="item.senderId === userId ? 'justify-end' : 'justify-start'">
                        <div class="w-max max-w-[80%] py-1 px-3 bg-white rounded-2xl">
                            <Image
                                v-if="item.message.image"
                                :src="item.message.image"
                            />
                            <p>{{ item.message?.text }}</p>
                        </div>
                    </div>
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
        <div ref="last"></div>
    </div>
</template>
<script>
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller"
import { mapGetters } from "vuex"
import Image from "./Image.vue"

export default {
    name: "messages-box",
    components: { DynamicScroller, DynamicScrollerItem, Image },
    computed: {
        ...mapGetters({
            messages: 'chat/message',
            userId: 'user/userId'
        })
    },
    methods: {
        scrollToBottom() {
            setTimeout(()=> this.$refs.last.scrollIntoView(), 100)
        }
    },
    watch: {
        messages: function() {
            this.scrollToBottom()
        }
    },
    mounted() {
        this.scrollToBottom()
    }
}
</script>