<template>
    <div class="Stage">
        Stage
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
    import Scene from '../three/Scene'
    export default {
        name: 'Stage',
        mounted(){
            this.initScene()
        },
        methods: {
            initScene(){
                let scene = new Scene()
                return scene
            }
        }
    }
</script>
