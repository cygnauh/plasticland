<template>
    <div class="Stage">
        <canvas
            ref='canvas'
            id="canvas">
        </canvas>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Engine from '../three/Engine'
    export default {
        name: 'Stage',
        data() {
            return{
                data: ''
            }
        },
        mounted(){
            this.initScene()
        },
        methods: {
            initScene(){
                console.log('before mont')
                Vue.prototype.$engine = new Engine(this.$refs.canvas)
                console.log('after mont')
            },
        }
    }
</script>
