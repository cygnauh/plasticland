// import * as THREE from 'three'
import GltfLoaderTest from './GltfLoaderTest'

export default class Boat {
    constructor(scene, manager) {
        this.scene = scene
        this.manager = manager
        this.initBoat()
    }

    initBoat() {
        this.object = new GltfLoaderTest(
            'boat',
            '/models/boat.gltf',
            this.scene,
            this.manager,
            0, 0, 20,
            Math.PI
        )
        // this.object.scene.position.x=100
        console.log(this.object)
    }

    update(time) {
        this.object.material.uniforms.uTime.value = time
    }
}
