import * as THREE from 'three'
import GltfLoaderTest from './GltfLoaderTest'

export default class Boat {
  constructor (scene, manager, camera) {
    this.scene = scene
    this.manager = manager
    this.camera = camera
    this.object = null
    this.initBoat()
  }

  initBoat () {
    this.object = new GltfLoaderTest(
      'boat',
      '/models/boat.gltf',
      this.scene,
      this.manager,
      0,
      0,
      0,
      Math.PI
    )
  }
  inclinaisonBoat (time) {
    let points = new Array(3).fill(null) // points around the boat
    let stepAngle = (Math.PI * 2) / points.length // angle of each point from origin
    let radius = 1 // cercle radius

    for (let i = 0; i < points.length; i++) {
      let angle = stepAngle * i
      points[i] = { // each point positions
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius
      }
      points[i].y = points[i].x && points[i].z ? this.calculateSurface(points[i].x, points[i].z, time) * 10 : null
      points[i] = points[i].x && points[i].z ? new THREE.Vector3(points[i].x, points[i].y, points[i].z) : null
      console.log(points)
    }

    let cb = new THREE.Vector3()
    let ab = new THREE.Vector3()

    // var normal = null
    for (let i = 0; i < points.length; i++) {
      if (points[2] && points[1]) cb.subVectors(points[2], points[1])
      if (points[0] && points[1]) ab.subVectors(points[0], points[1])
      cb.cross(ab) // cross product (produit vectoriel)
      cb.normalize()

      if (this.object.up) this.object.up.copy(cb) // up vector
      this.object.matrixNeedsUpdate = true

      let lookAtVector = new THREE.Vector3(0, 0, -1) // camera default lookAt position
      lookAtVector.applyQuaternion(this.camera.quaternion)
      lookAtVector.y = 0
      lookAtVector.add(this.object.position)

      this.object.lookAt(lookAtVector)
    }
  }

  calculateSurface (x, z, uTime) {
    let y = 0.0
    let SCALE = 10.0
    y +=
      (Math.sin((x * 1.0) / SCALE + uTime * 1.0) +
        Math.sin((x * 2.3) / SCALE + uTime * 1.5) +
        Math.sin((x * 3.3) / SCALE + uTime * 0.4)) /
      4.0
    y +=
      (Math.sin((z * 0.2) / SCALE + uTime * 1.8) +
        Math.sin((z * 1.8) / SCALE + uTime * 1.8) +
        Math.sin((z * 2.8) / SCALE + uTime * 0.8)) /
      2.0
    return y
  }

  update (time) {
    if (this.object && this.object.gltf) {
      let pos = this.object.gltf.position
      let y = this.calculateSurface(pos.x, pos.z, time)
      pos.y = y + 1.1
    }
    this.inclinaisonBoat(time)
  }
}
