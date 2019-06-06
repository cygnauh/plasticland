import * as store from '../../store/index'
import GltfLoaderRefactored from './GltfLoaderRefactored'
import { animateVector3 } from '../utils/Animation'
import * as TWEEN from 'tween'
import * as THREE from 'three/src/Three'
import { rendenerSceneInfo } from '../utils/utilsScene'

export default class ObjectsToCollect {
  constructor (scene, manager, raycaster, cameraSpline, renderer) {
    this.scene = scene
    this.manager = manager
    this.raycaster = raycaster
    this.cameraSpline = cameraSpline
    this.renderer = renderer

    this.array = []
    this.found = false

    this.initCollectables()
  }

  initCollectables () {
    let objects = store.default.state.objects
    objects.forEach((object) => {
      let mesh = new GltfLoaderRefactored(object.name, object.model, this.scene, this.manager, { posX: object.x, posY: 0, posZ: object.z, scale: 10, addToScene: true })
      this.array.push(mesh)
    })
  }

  calculateSurface (x, z, uTime) {
    let y = 0.0
    let scale = 10.0
    y +=
      (Math.sin((x * 1.0) / scale + uTime * 1.0) +
        Math.sin((x * 2.3) / scale + uTime * 1.5) +
        Math.sin((x * 3.3) / scale + uTime * 0.4)) /
      4.0
    y +=
      (Math.sin((z * 0.2) / scale + uTime * 1.8) +
        Math.sin((z * 1.8) / scale + uTime * 1.8) +
        Math.sin((z * 2.8) / scale + uTime * 0.8)) /
      2.0
    return y
  }

  onClick () {
    if (this.array.length > 0) {
      let intersects = this.raycaster.intersectObjects(this.scene.children)
      intersects.forEach((intersect) => {
        // if (intersect.object.type === 'mesh') {
        switch (intersect.object.name) {
          case 'starbucks':
            store.default.commit('objectFound', 1)
            // this.moveItem(intersect.object.position)
            store.default.commit('setCinematicObject', true)
            // this.renderSelectedCollectable(intersect.object.name)
            // console.log(store.default.state.displayCinematicObject)
            break
          case 'carrefour':
            store.default.commit('objectFound', 2)
            store.default.commit('setCinematicObject', true)
            break
          case 'cocacola':
            store.default.commit('objectFound', 3)
            store.default.commit('setCinematicObject', true)
            break
          case 'gestespropres':
            store.default.commit('objectFound', 4)
            store.default.commit('setCinematicObject', true)
            break
          case 'nestle':
            store.default.commit('objectFound', 5)
            store.default.commit('setCinematicObject', true)
            break
          case 'final':
            store.default.commit('objectFound', 6)
            store.default.commit('setCinematicObject', true)
            break
          default:
            break
        }
        if (intersect.object.name) {
          store.default.commit('setFoundObjectName', intersect.object.name)
        }
        // }
      })
    }
  }

  // moveItem (element) {
  //   this.found = true
  //   let spline = this.cameraSpline.spline
  //   let percentageCamera = this.cameraSpline.percentageCamera.value + 0.0285
  //   let target = spline.getPointAt(percentageCamera) // x,y,z
  //   let newTarget = new THREE.Vector3(target.x - 5, target.y + 5, target.z)
  //   animateVector3(element, newTarget, {
  //     duration: 4000,
  //     easing: TWEEN.Easing.Quadratic.InOut
  //   })
  // }

  // renderSelectedCollectable (itemSelected) {
    // let scene = store.default.state.objects.filter(element => element.name === itemSelected)
    // scene.mesh.rotation.y += 0.01
    // this.renderScissor()
    // console.log(store.default.state.cinematicObjectContainer)
    // rendenerSceneInfo(scene, store.default.state.cinematicObjectContainer, this.renderer)
  // }

  // renderScissor () {
  //   this.renderer.setScissorTest(false)
  //   this.renderer.clear(true, true)
  //   this.renderer.setScissorTest(true)
  // }

  update (time) {
    if (!this.found) {
      let y = this.calculateSurface(10, 10, time)
      if (this.array.length > 0) {
        this.array.forEach(collectable => {
          collectable.then(response => {
            response.meshes.forEach(mesh => {
              mesh.position.y = y
              mesh.rotation.y = Math.sin(time) / 3
              mesh.rotation.z = mesh.rotation.x = Math.sin(time) / 4
            })
          })
        })
      }
    }
  }
}
