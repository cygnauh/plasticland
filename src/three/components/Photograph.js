import * as THREE from 'three'

export default class Photograph {
  constructor (scene, camera) {
    this.scene = scene
    this.camera = camera
    this.initPhotographPoint()
  }

  initPhotographPoint () {
    // create an object for the sound to play from
    var geometry = new THREE.PlaneGeometry(5, 5, 20, 32)
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
    this.photographPoint = new THREE.Mesh(geometry, material)
    this.photographPoint.position.z = -170
    this.photographPoint.position.y = 10
    this.photographPoint.position.x = -5
    this.photographPoint.rotateY(10)
    this.photographPoint.name = 'photograph'
    // this.mesh.position.z = 200
    // this.scene.add(this.mesh)
  }

  // update (time) {
  // }
}
