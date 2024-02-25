<template>
    <img v-if="selected && preview" :src="preview" class="min-w-24 h-24 sm:min-w-36 sm:h-36 rounded-full overflow-hidden object-cover" alt="avatar">
    <label v-else for="inputAvatar" class="min-w-24 h-24 sm:min-w-36 sm:h-36 rounded-full overflow-hidden bg-component-bg flex justify-center items-center">
        <div>
            <svg clip-rule="evenodd" fill="white" width="80px" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fill-rule="nonzero"/></svg>
        </div>
    </label>
    <input type="file" id="inputAvatar" class="hidden" @input="e => selectImg(e.target.files[0])">
</template>

<script>
export default {
    name: "input-avatar",
    data() {
        return {
            preview: ""
        }
    },
    props: {
        selected: Boolean
    },
    emits: ["selectImg"],
    methods: {
        selectImg(img) {
            this.preview = URL.createObjectURL(img)
            this.$emit("selectImg", img)
        }
    },
    watch: {
        selected: function() {
            if(!this.selected) this.preview = ""
        }
    }
}
</script>