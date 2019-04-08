<template>
    <div class="hello">
        hello
    </div>
</template>

<script>
import * as THREE from 'three'
export default {
    name: 'Scene',
    data() {
        return{
            scene: null
        }
    },
    methods: {
        test () {
            this.scene = new THREE.Scene()
            return 2
        }
    }
}
</script>