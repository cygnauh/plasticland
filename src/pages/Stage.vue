<template>
    <div class="Stage">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Scene from '../three/Scene'
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
                Vue.prototype.$scene = new Scene()
            },
        }
    }
</script>
