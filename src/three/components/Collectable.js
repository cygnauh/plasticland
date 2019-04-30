// import * as THREE from 'three'
import GltfLoaderTest from './GltfLoaderTest'
import config from '../../data/inventory'
import * as THREE from 'three/src/Three'
import * as TWEEN from 'tween'
import GltfLoader from './GltfLoader'

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
    // console.log(config.objects)
  }

  initCollectables () {
    let obj = null
    config.objects.forEach((value, i) => {
      let x = i % 3 === 0 ? 0 : i % 3 === 1 ? -13 : 13
      let y = i % 2 === 0 ? 10 : 0
      console.log(i, x, y)
      obj = new GltfLoaderTest(
        value.name,
        './models/starbucks_cup.glb',
        this.scene,
        this.manager,
        x, // x
        y, // y
        0, // z
        -Math.PI / 2 // rotation
      )
      this.objects.push(obj)
    })
  }
  update (time) {
    if (this.canAnimated) TWEEN.update()
  }
  selectedItem (name) {
    let animation = !this.canAnimated
    console.log(this.objects)
    console.log(this.objects.filter(item => item.name === name))
    const selectedItem = this.objects.filter(item => item.name === name)[0].gltf
    const otherItems = this.objects.filter(item => item.name !== name)
    otherItems.forEach((element) => {
      console.log(element.gltf)
      let scale = 0.00001
      this.animateVector3(element.gltf.scale, new THREE.Vector3(scale, scale, scale), {
        duration: 500,
        easing: TWEEN.Easing.Quadratic.InOut,
        callback: () => {
          animation = false
          console.log('Completed')
        }
      })
    })
    this.canAnimated = animation
    console.log('this.canAnimated Completed', this.canAnimated)
    this.animateVector3(selectedItem.position, new THREE.Vector3(-5, 8, 8), {
      duration: 800,
      easing: TWEEN.Easing.Quadratic.InOut,
      callback: () => {
        console.log('Completed')
      }
    })
    // TODO take chosen item to the left
    // TODO scale to 0 the others then render false
  }

  animateVector3 (vectorToAnimate, target, options) { // anim can be position or scale
    options = options || {}
    // get targets from options or set to defaults
    let to = target || THREE.Vector3(),
      easing = options.easing || TWEEN.Easing.Quadratic.In,
      duration = options.duration || 2000
    // create the tween
    let tweenVector3 = new TWEEN.Tween(vectorToAnimate)
      .to({ x: to.x, y: to.y, z: to.z }, duration)
      .easing(easing)
      .onComplete(function () {
        if (options.callback) options.callback()
      })
    tweenVector3.start()
    // return the tween in case we want to manipulate it later on
    return tweenVector3
  }

  /* How to use */
}
