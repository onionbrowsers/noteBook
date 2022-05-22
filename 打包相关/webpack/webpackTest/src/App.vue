<template>
    <div class="app">
        {{msg}}
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    setup () {
        const msg = ref('vue')
        return {
            msg
        }
    }
}
</script>

<style lang="stylus" scoped>
.app
    color: green
</style>