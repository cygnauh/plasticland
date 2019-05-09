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
    this.collectableGroup = null
    this.item = null
    this.otherItems = []
    this.initCollectables()
  }

  initCollectables () {
    let obj = null
    this.collectableGroup = new THREE.Group()
    store.state.objects.forEach((value, i) => {
      let x = i % 3 === 0 ? 13 : i % 3 === 1 ? 0 : -13
      let y = i < 3 ? 0 : -10
      if (value) {
        obj = new GltfLoader(
          value.name,
          value.model,
          this.scene,
          this.manager,
          { posX: x, posY: y, posZ: 0, scale: 0.00001, found: value.found, addToScene: false }
        )
        obj.then(response => {
          this.objects.push(response.meshes[0])
          this.collectableGroup.add(response.meshes[0])
        })
      }
    })
  }

  openInventory (value) {
    if (value) {
      this.scaleItems(this.objects, 1)
    } else {
      if (this.item) this.backToList()
      this.scaleItems(this.objects, 0.00001)
    }
  }

  selectedItem (name) {
    this.objects.forEach(element => {
      if (element.name === name) {
        this.item = element
      }
    })

    this.otherItems = this.objects.filter(item => item.name !== name)
    this.scaleItems(this.otherItems, 0.00001)
    this.animateVector3(this.item.position, new THREE.Vector3(0, 0, 8), {
      duration: 800,
      easing: TWEEN.Easing.Quadratic.InOut
    })
  }
  backToList () {
    let itemIndex = store.state.objects.filter(item => item.name === this.item.name)[0].id - 1
    // initial position of the selected item
    let x = itemIndex % 3 === 0 ? 13 : itemIndex % 3 === 1 ? 0 : -13
    let y = itemIndex < 3 ? 0 : -10
    this.animateVector3(this.item.position, new THREE.Vector3(x, y, 0), {
      duration: 800,
      easing: TWEEN.Easing.Quadratic.InOut
    })
    this.scaleItems(this.otherItems, 1)
  }
  scaleItems (array, scale) {
    array.forEach((element) => {
      this.animateVector3(element.scale, new THREE.Vector3(scale, scale, scale), {
        duration: 1000,
        easing: TWEEN.Easing.Quadratic.InOut
      })
    })
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
    TWEEN.update()
  }
}
