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
            0, 0, 0,
            Math.PI
        )
    }

    calculateSurface(x, z, uTime) {
        let y = 0.0;
        let SCALE = 10.0
        y += (Math.sin(x * 1.0 / SCALE + uTime * 1.0) + Math.sin(x * 2.3 / SCALE + uTime * 1.5) + Math.sin(x * 3.3 / SCALE + uTime * 0.4)) / 4.0;
        y += (Math.sin(z * 0.2 / SCALE + uTime * 1.8) + Math.sin(z * 1.8 / SCALE + uTime * 1.8) + Math.sin(z * 2.8 / SCALE + uTime * 0.8)) / 2.0;
        return y;
    }

    update(time) {
        if(this.object && this.object.gltf){
            let pos = this.object.gltf.position
            let y = this.calculateSurface(pos.x, pos.z, time);
            pos.y = y;
        }
    }
}
