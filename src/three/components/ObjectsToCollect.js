import * as store from '../../store/index'
import GltfLoaderRefactored from './GltfLoaderRefactored'
import { animateVector3 } from '../utils/Animation'
import * as TWEEN from 'tween'
import * as THREE from 'three/src/Three'

export default class ObjectsToCollect {
  constructor (scene, manager, raycaster, camera, spline, composer, mouse) {
    this.scene = scene
    this.manager = manager
    this.raycaster = raycaster
    this.camera = camera
    this.cameraSpline = spline
    this.composer = composer
    this.mouse = mouse

    this.array = []

    // for the animation of the camera lookat
    this.cameraLookat = {
      mouseFinal: new THREE.Vector3(0, 0, 0),
      objects: new THREE.Vector3(0, 0, 0),
      spline: new THREE.Vector3(0, 0, 0),
      changed: false
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
        if (intersect.object.name) {
          store.default.commit('setFoundObjectName', intersect.object.name)
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
    this.changeCameraLookat(this.cameraLookat.objects, this.intersect.object.position, 15, true)
    // this.changeOffsetCamera()
  }

  close () {
    this.tweenVignette(0.3, 0.442)
    this.moveItem(this.intersect.object.rotation, 3000, { y: 35 })
    this.moveItem(this.intersect.object.position, 1000, { y: 35 })
    this.moveItem(this.intersect.object.scale, 1000, { x: 0.5, y: 0.5, z: 0.5 })
    this.moveItem(this.intersect.object.position, 2000, { y: 82 })
    this.changeCameraLookat(this.cameraLookat.objects, this.cameraLookat.spline, 0, false)
  }

  moveItem (element, speed, { x = 0, y = 0, z = 0 }) {
    // TODO check if impact on didacticiel
    let target = new THREE.Vector3(element.x + x, element.y + y, element.z + z)
    animateVector3(element, target, {
      duration: speed,
      easing: TWEEN.Easing.Quadratic.InOut
    })
  }

  getCameraLookat () {
    let p2 = this.cameraSpline.spline.getPointAt((store.default.state.splinePosition + 0.01) % 1) // lookat
    p2.y = p2.y + 3.5
    this.cameraLookat.spline = p2
  }

  changeCameraLookat (from, to, y, changed) {
    // console.log(this.intersect.object.position, 'position of object')
    this.tween3 = new TWEEN.Tween(from)
      .to({ x: to.x, y: to.y + y, z: to.z }, 1500)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .onComplete(() => {
        this.cameraLookat.changed = changed
      })
    this.tween3.start()
  }

  mouseCameraLookat () {
    const mouse = new THREE.Vector3(this.mouse.x, this.mouse.y, 0)
    const object = new THREE.Object3D()
    object.position.copy(this.cameraLookat.objects)
    const newPosition = object.localToWorld(mouse)
    // console.log(newPosition)

    this.cameraLookat.mouseFinal.x = this.cameraLookat.objects.x + newPosition.x
    this.cameraLookat.mouseFinal.y = this.cameraLookat.objects.y + newPosition.y
    this.cameraLookat.mouseFinal.z = this.cameraLookat.objects.z + newPosition.z
  }

  changeOffsetCamera () {
    const width = 1920 // width of subcamera
    const height = 1080 // height of subcamera
    const fullWidth = width * 3
    const fullHeight = height * 3
    const x = width * 1 // horizontal offset of subcamera
    const y = height * 0 // vertical offset of subcamera
    this.camera.setViewOffset(fullWidth, fullHeight, x, y, width, height)
  }

  updateCameraLookat () {
    // console.log(this.cameraLookat.objects, 'position of animated lookat ')
    // console.log(this.cameraLookat.spline, 'position of spline lookat')

    this.getCameraLookat()
    this.mouseCameraLookat()

    // if cinematic is closed and lookat hasnt changed
    if (!store.default.state.displayCinematicObject && !this.cameraLookat.changed) {
      this.cameraLookat.objects = this.cameraLookat.spline
      this.camera.lookAt(this.cameraLookat.mouseFinal)
    }

    //  if cinematic is closed and camera lookat has changed = do the tween
    if (!store.default.state.displayCinematicObject && this.cameraLookat.changed) {
      this.camera.lookAt(this.cameraLookat.mouseFinal)
    }

    // if cinematic is open and lookat has not changed = do the tween
    if (store.default.state.displayCinematicObject && !this.cameraLookat.changed) {
      this.camera.lookAt(this.cameraLookat.mouseFinal)
    }

    // if cinematic is open and lookat has changed you can look at the intersect position
    if (store.default.state.displayCinematicObject && this.cameraLookat.changed) {
      // this.camera.lookAt(this.cameraLookat.objects)
      this.camera.lookAt(this.intersect.object.position)
    }
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
            if (store.default.state.currentFoundObjectName !== mesh.name && !store.default.state.displayCinematicObject) {
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
        })
      })
    }

    this.updateVignette()
    this.updateCameraLookat()
  }
}
