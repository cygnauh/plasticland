import * as THREE from 'three';

export default class Water {
    constructor(scene) {
        this.scene = scene

        this.vertexShader = `
        `;

        this.fragmentShader = `
        `

        this.initPlane(20, 20, 10, 10)
    }

    initPlane(width, height, widthSegments, heightSegments) {
        this.geometry = new THREE.PlaneBufferGeometry(width, height, widthSegments, heightSegments)
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            side: THREE.DoubleSide
        })
        this.plane = new THREE.Mesh(this.geometry,this.material)
        this.scene.add(this.plane)
    }

    update(time) {
        this.plane.material.uniforms.time.value = time
    }
}
