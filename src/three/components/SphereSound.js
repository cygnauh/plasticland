import * as THREE from 'three'

export default class SphereSound {
  constructor (scene, camera) {
    this.scene = scene
    this.camera = camera
    this.initSphere()
  }

  initSphere () {
    // create an object for the sound to play from
    var sphere = new THREE.SphereGeometry(3, 32, 16)
    var material = new THREE.MeshPhongMaterial({ color: 0xff2200 })
    this.mesh = new THREE.Mesh(sphere, material)
    this.mesh.position.x = 0
  }

  // update (time) {
  // }
}
