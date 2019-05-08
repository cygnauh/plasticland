import * as THREE from 'three'
import * as Stats from 'stats-js'
import OrbitControls from '../utils/OrbitControls'

export default class Helpers {
  constructor (scene, camera, canvas) {
    this.scene = scene
    this.camera = camera
    this.canvas = canvas

    this.initStats()
    this.initAxes()
    this.initControls()
    this.initCameraHelper()
    this.initGrid(50, 50)
  }

  initStats () {
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
  }

  initAxes () {
    this.axesHelper = new THREE.AxesHelper(2)
    this.scene.add(this.axesHelper)
  }

  initControls () {
    this.controls = new THREE.OrbitControls(this.camera, this.canvas)
  }

  initCameraHelper () {
    this.cameraHelper = new THREE.CameraHelper(this.camera)
    this.scene.add(this.cameraHelper)
  }

  initGrid (size, divisions) {
    this.gridHelper = new THREE.GridHelper(size, divisions)
    this.scene.add(this.gridHelper)
  }

  pointLightHelper (pointLight, size) {
    this.helper = new THREE.PointLightHelper(pointLight, size)
    this.scene.add(this.helper)
  }
}
