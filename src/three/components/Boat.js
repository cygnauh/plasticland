import * as THREE from 'three'
import GltfLoader from './GltfLoader'
import * as TWEEN from 'tween'

export default class Boat {
  constructor (scene, manager, camera) {
    this.scene = scene
    this.manager = manager
    this.camera = camera
    this.object = null
    this.initBoat()
  }

  initBoat () {
    this.object = new GltfLoader('boat', './models/Boat_01.glb', this.scene, this.manager, { posX: 0, posY: 0, posZ: -40, scale: 0.030, rotateY: Math.PI })
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
    }
    let cb = new THREE.Vector3()
    let ab = new THREE.Vector3()
    // var normal = null
    for (let i = 0; i < points.length; i++) {
      if (points[2] && points[1]) cb.subVectors(points[2], points[1])
      if (points[0] && points[1]) ab.subVectors(points[0], points[1])
      cb.cross(ab) // cross product (produit vectoriel)
      cb.normalize()

      if (this.object) {
        this.object.then(response => {
          let obj = response.meshes[0]
          // obj.up.copy(cb)
          // up vector, when it's uncomment boat become distorted TODO
          obj.matrixNeedsUpdate = true
          let lookAtVector = new THREE.Vector3(0, 0, -1) // camera default lookAt position
          lookAtVector.applyQuaternion(this.camera.quaternion)
          //   lookAtVector.y = 0
          //   lookAtVector.add(obj.position)
          //   obj.lookAt(lookAtVector) // boat and camera look at the same direction
        })
      }
    }
  }

  calculateSurface (x, z, uTime) {
    let y = 0.4
    const scale = 10.0
    const strength = 15.0
    y +=
      (Math.sin((x * 1.0) / scale + uTime * 1.0) +
        Math.sin((x * 2.3) / scale + uTime * 1.5) +
        Math.sin((x * 3.3) / scale + uTime * 0.4)) /
      strength
    y +=
      (Math.sin((z * 0.2) / scale + uTime * 1.8) +
        Math.sin((z * 1.8) / scale + uTime * 1.8) +
        Math.sin((z * 2.8) / scale + uTime * 0.8)) /
      strength / 2
    return y
  }

  update (time) {
    if (this.object) {
      this.object.then(response => {
        let pos = response.meshes[0].position
        let y = this.calculateSurface(pos.x, pos.z, time)
        pos.y = y
      })
    }
    this.inclinaisonBoat(time)
  }
}
