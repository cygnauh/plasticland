// import * as THREE from 'three'
import GltfLoader from './GltfLoader'
import { store } from '../../store/index'
import * as THREE from 'three/src/Three'
import * as TWEEN from 'tween'

export default class Collectable {
  constructor (scene, manager, camera, width, height) {
    this.scene = scene
    this.manager = manager
    this.camera = camera
    this.width = width
    this.height = height
    this.objects = []
    this.initCollectables()
    this.canAnimated = false
    this.item = null
    this.otherItems = []
  }

  initCollectables () {
    let obj = null
    store.state.objects.forEach((value, i) => {
      let x = i % 3 === 0 ? -13 : i % 3 === 1 ? 0 : 13
      let y = i < 3 ? 10 : 0
      if (value) {
        obj = new GltfLoader(
          value.name,
          value.model,
          this.scene,
          this.manager,
          { posX: x, posY: y, posZ: 0, scale: 1, found: value.found, addToScene: false }
        )
        obj.then(response => {
          this.objects.push(response.meshes[0])
        })
      }
    })
    setTimeout(() => {
      let animation = !this.canAnimated
      this.scaleItems(this.objects, animation, 1)
    }, 700)
  }
  selectedItem (name) {
    let animation = !this.canAnimated
    this.item = this.objects.filter(item => item.name === name)[0].gltf
    this.otherItems = this.objects.filter(item => item.name !== name)
    this.scaleItems(this.otherItems, animation, 0.00001)

    this.animateVector3(this.item.position, new THREE.Vector3(-5, 8, 8), {
      duration: 800,
      easing: TWEEN.Easing.Quadratic.InOut
    })
  }
  backToList () {
    let itemIndex = store.state.objects.filter(item => item.name === this.item.name)[0].id - 1
    let x = itemIndex % 3 === 0 ? -13 : itemIndex % 3 === 1 ? 0 : 13
    let y = itemIndex < 3 ? 10 : 0
    let animation = !this.canAnimated
    this.scaleItems(this.otherItems, animation, 1)
    this.animateVector3(this.item.position, new THREE.Vector3(x, y, 0), {
      duration: 800,
      easing: TWEEN.Easing.Quadratic.InOut
    })
  }
  scaleItems (array, animation, scale) {
    array.forEach((element) => {
      const meshes = element
      this.animateVector3(meshes.scale, new THREE.Vector3(scale, scale, scale), {
        duration: 500,
        easing: TWEEN.Easing.Quadratic.InOut,
        callback: () => {
          animation = false
        }
      })
    })
    this.canAnimated = animation
  }
  animateVector3 (vectorToAnimate, target, options) { // anim can be position or scale
    options = options || {}
    // get targets from options or set to defaults
    let to, easing, duration, delay
    to = target || THREE.Vector3()
    easing = options.easing || TWEEN.Easing.Quadratic.In
    duration = options.duration || 2000
    delay = options.delay || 0
    // create the tween
    let tweenVector3 = new TWEEN.Tween(vectorToAnimate)
      .to({ x: to.x, y: to.y, z: to.z }, duration)
      .delay(delay)
      .easing(easing)
      .onComplete(function () {
        if (options.callback) options.callback()
      })
    tweenVector3.start()
    // return the tween in case we want to manipulate it later on
    return tweenVector3
  }
  update () {
    if (this.canAnimated) TWEEN.update()
  }
}
