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

    // for the animation of the camera lookat
    this.cameraLookat = {
      vectorSpline: null,
      vectorObject: null
    }

    // for the animation of the vignette
    this.vignettePass = this.composer.passes[1].effects[1]
    this.vignette = {
      offset: {
        value: 0.3
      },
      darkness: {
        value: 0.442
      }
    }

    this.intersect = null

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
        switch (intersect.object.name) {
          case 'starbucks':
            this.animateObject(1, intersect)
            break
          case 'carrefour':
            this.animateObject(2, intersect)
            break
          case 'cocacola':
            this.animateObject(3, intersect)
            break
          case 'gestespropres':
            this.animateObject(4, intersect)
            break
          case 'nestle':
            this.animateObject(5, intersect)
            break
          case 'final':
            this.animateObject(6, intersect)
            break
          default:
            break
        }
      })
    }
  }

  animateObject (id, intersect) {
    store.default.commit('objectFound', id)
    store.default.commit('setCinematicObject', true)
    store.default.commit('setFoundObjectName', intersect.object.name)
    this.intersect = intersect
    this.open()
  }

  open () {
    this.tweenVignette(0.54, 0.54)
    this.moveItem(this.intersect.object.position, 1000, { y: 15 })
  }

  close () {
    this.tweenVignette(0.3, 0.442)
    this.moveItem(this.intersect.object.rotation, 3000, { y: 35 })
    this.moveItem(this.intersect.object.position, 1000, { y: 35 })
    this.moveItem(this.intersect.object.scale, 1000, { x: 2, y: 2, z: 2 })
    this.moveItem(this.intersect.object.position, 2000, { y: 102 })
  }

  moveItem (element, speed, {x = 0, y = 0, z = 0 }) {
    let target = new THREE.Vector3(element.x + x, element.y + y, element.z + z)
    animateVector3(element, target, {
      duration: speed,
      easing: TWEEN.Easing.Quadratic.InOut
    })
  }

  getCameraLookat () {
    if (this.cameraSpline) {
      this.lookat = this.cameraSpline.spline.getPointAt((store.default.state.splinePosition + 0.01) % 1) // lookat
      this.cameraLookat.vectorSpline = this.lookat
    }
  }

  changeCameraLookat (target) {
    animateVector3(this.cameraLookat.vectorSpline, target, {
      duration: 1000,
      easing: TWEEN.Easing.Quadratic.InOut
    })
  }

  tweenVignette (offset, darkness) {
    this.tween1 = new TWEEN.Tween(this.vignette.offset)
      .to({ value: offset }, 1000)
    this.tween1.start()
    this.tween2 = new TWEEN.Tween(this.vignette.darkness)
      .to({ value: darkness }, 1000)
    this.tween2.start()
  }

  updateVignette () {
    this.vignettePass.uniforms.get('offset').value = this.vignette.offset.value // animateFloat(obj1, 0.5)
    this.vignettePass.uniforms.get('darkness').value = this.vignette.darkness.value // animateFloat(0.442, 0.5)
  }

  update (time) {
    let y = this.calculateSurface(10, 10, time)


    if (this.array.length > 0) {
      this.array.forEach(collectable => {
        collectable.then(response => {
          response.meshes.forEach(mesh => {
            if ( store.default.state.currentFoundObjectName !== mesh.name && !store.default.state.displayCinematicObject) {
              //  si l'objet n'est pas trouvé et que la cinématique n'est pas ouverte
              mesh.position.y = y
              mesh.rotation.y = Math.sin(time) / 3
              mesh.rotation.z = mesh.rotation.x = Math.sin(time) / 4
            } else if (store.default.state.currentFoundObjectName === mesh.name && store.default.state.displayCinematicObject) {
              // si l'objet est trouvé et que la cinématique est ouverte
              mesh.rotation.y = Math.sin(time) / 3
              mesh.position.y = mesh.position.y + Math.sin(time) / 35
            } else if (store.default.state.currentFoundObjectName === mesh.name && !store.default.state.displayCinematicObject) {
              // si l'objet a été trouvé mais que la cinématique fermé
              mesh.position.y = mesh.position.y + Math.sin(time) / 10
            }

          })
          /* if (this.changeCamera.active ) {
            // console.log(response.meshes[this.objects.found.length])
              // this.changeCameraLookat(response.meshes[this.objects.found.length].position)
          } */
        })
      })

    }

    this.updateVignette()

    if (store.default.state.displayCinematicObject) {
      // this.camera.lookAt(this.cameraLookat.vectorSpline)
    } else {
      this.getCameraLookat()
    }
  }
}
