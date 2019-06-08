import * as store from '../../store/index'
import GltfLoaderRefactored from './GltfLoaderRefactored'
import { animateVector3 } from '../utils/Animation'
import * as TWEEN from 'tween'
import * as THREE from 'three/src/Three'

export default class ObjectsToCollect {
  constructor (scene, manager, raycaster, camera, spline, composer) {
    this.scene = scene
    this.manager = manager
    this.raycaster = raycaster
    this.camera = camera
    this.cameraSpline = spline
    this.composer = composer

    this.array = []
    this.objects = null
    this.changeCamera = {
      active: false,
      vector3: null,
      vectorObject: null
    }

    this.vignettePass = this.composer.passes[1].effects[1]
    this.vignette = {
      offset: {
        value: 0.3,
      },
      darkness: {
        value: 0.442,
      }
    }

    this.initCollectables()
  }

  initCollectables () {
    this.objects = store.default.state.objects
    this.objects.forEach((object) => {
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
            store.default.commit('setCinematicObject', true)
            this.moveItem(intersect.object.position)
            this.tweenVignette()
            this.changeCamera.active = true
            break
          case 'carrefour':
            store.default.commit('objectFound', 2)
            store.default.commit('setCinematicObject', true)
            this.moveItem(intersect.object.position)
            break
          case 'cocacola':
            store.default.commit('objectFound', 3)
            store.default.commit('setCinematicObject', true)
            this.moveItem(intersect.object.position)
            break
          case 'gestespropres':
            store.default.commit('objectFound', 4)
            store.default.commit('setCinematicObject', true)
            this.moveItem(intersect.object.position)
            break
          case 'nestle':
            store.default.commit('objectFound', 5)
            store.default.commit('setCinematicObject', true)
            this.moveItem(intersect.object.position)
            break
          case 'final':
            store.default.commit('objectFound', 6)
            store.default.commit('setCinematicObject', true)
            this.moveItem(intersect.object.position)
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

  moveItem (element) {
    let target = new THREE.Vector3(element.x, element.y + 15, element.z)
    animateVector3(element, target, {
      duration: 1000,
      easing: TWEEN.Easing.Quadratic.InOut,
      onComplete: function () {
        this.changeCamera.active = true
      }
    })
  }

  getCameraLookat () {
    if (this.cameraSpline) {
      this.lookat = this.cameraSpline.spline.getPointAt((store.default.state.splinePosition + 0.01) % 1) // lookat
      this.changeCamera.vector3 = this.lookat
    }
  }

  tweenVignette () {
    this.tween1 = new TWEEN.Tween(this.vignette.offset)
      .to({ value: 0.54 }, 1000)
    this.tween1.start()
    this.tween2 = new TWEEN.Tween(this.vignette.darkness)
      .to({ value: 0.54 }, 1000)
    this.tween2.start()
  }

  updateVignette () {
    this.vignettePass.uniforms.get("offset").value = this.vignette.offset.value // animateFloat(obj1, 0.5)
    this.vignettePass.uniforms.get("darkness").value = this.vignette.darkness.value // animateFloat(0.442, 0.5)
  }

  changeCameraLookat (target) {
    animateVector3(this.changeCamera.vector3, target, {
      duration: 1000,
      easing: TWEEN.Easing.Quadratic.InOut
    })
  }

  update (time) {
    let y = this.calculateSurface(10, 10, time)

    if (this.objects !== null) {
      this.objects.forEach(object => {
        if (this.array.length > 0) {
          this.array.forEach(collectable => {
            collectable.then(response => {
              response.meshes.forEach(mesh => {
                if (!object.found) {
                  // mesh.position.y = y
                  mesh.rotation.y = Math.sin(time) / 3
                  mesh.rotation.z = mesh.rotation.x = Math.sin(time) / 4
                } else if (object.found) {
                  mesh.rotation.y = Math.sin(time) / 3
                  mesh.position.y = mesh.position.y + Math.sin(time) / 15
                }
              })
              /*if (this.changeCamera.active ) {
                // console.log(response.meshes[this.objects.found.length])
                  // this.changeCameraLookat(response.meshes[this.objects.found.length].position)
              }*/
            })
          })
        }
      })
    }

    //  console.log(this.vignette.offset, this.vignette.darkness)

    if (this.changeCamera.active) {
      this.updateVignette()
      // this.camera.lookAt(this.changeCamera.vector3)
    } else {
      this.getCameraLookat()
    }

    // console.log(this.changeCamera.active)
  }
}
