<template>
    <div class="Stage">
        <canvas id="canvas"></canvas>
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
                Vue.prototype.$scene = new Engine()
            },
        }
    }
</script>
