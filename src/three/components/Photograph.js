import * as THREE from 'three'
import { animateVector3 } from '../utils/Animation'
import * as TWEEN from 'tween'

export default class Photograph {
  constructor (scene, camera) {
    this.scene = scene
    this.camera = camera
    this.showPhotograph = false
    this.initPhotographPoint()
  }

  initPhotographPoint () {
    let spriteMap = new THREE.TextureLoader().load('./textures/cta-photo@3x.png')
    let spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff })
    this.photographPoint = new THREE.Sprite(spriteMaterial)
    this.photographPoint.position.z = -110
    this.photographPoint.position.y = 10
    this.photographPoint.position.x = 50
    this.photographPoint.rotateY(10)
    this.photographPoint.name = 'photograph'
    this.photographPoint.scale.set(10, 10, 1)
  }

  scaleOut (scale) {
    animateVector3(this.photographPoint.scale, new THREE.Vector3(scale, scale, scale), {
      duration: 1000,
      easing: TWEEN.Easing.Quadratic.InOut
    })
  }

  onShowPhotograph () {
    if (this.showPhotograph) {
      // this.photograph.scaleOut(0.000001)
    }
    return this.showPhotograph
  }

  closePhoto () {
    this.showPhotograph = false
    // remove point of interest
  }
}
