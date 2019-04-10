// import * as THREE from 'three'
import GltfLoaderTest from './GltfLoaderTest'

export default class Boat {
    constructor(scene, manager) {
        this.scene = scene
        this.manager = manager
        this.initBoat()
    }

    initBoat() {
        this.object = new GltfLoaderTest('boat', './boat.gltf', this.scene)
        // this.object.position.y = 1
        // this.scene.add(this.object)
    }

    update(time) {
        this.object.material.uniforms.uTime.value = time
    }
}
