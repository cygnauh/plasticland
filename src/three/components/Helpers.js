import * as THREE from "three"
import * as Stats from 'stats-js'
import OrbitControls from 'three-orbitcontrols'

export default class Helpers {
    constructor(scene, camera) {
        this.scene = scene
        this.camera = camera

        this.initStats()
        this.initAxes()
        // this.initControls()
        // this.initCameraHelper()
        this.initGrid(50, 50)
    }

    initStats() {
        this.stats = new Stats()
        document.body.appendChild(this.stats.dom)
    }

    initAxes() {
        this.axesHelper = new THREE.AxesHelper(2)
        this.scene.add(this.axesHelper)
    }

    initControls() {
        this.controls = new OrbitControls(this.camera)
    }

    initCameraHelper() {
        this.cameraHelper = new THREE.CameraHelper(this.camera)
        this.scene.add(this.cameraHelper)
    }

    initGrid(size, divisions) {
        this.gridHelper = new THREE.GridHelper(size, divisions)
        this.scene.add(this.gridHelper)
    }
}