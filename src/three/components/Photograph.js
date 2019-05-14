import * as THREE from 'three'
import { animateVector3 } from '../utils/Animation'
import * as TWEEN from 'tween'

export default class Photograph {
  constructor (scene, camera) {
    this.scene = scene
    this.camera = camera
    this.initPhotographPoint()
  }

  initPhotographPoint () {
	  var spriteMap = new THREE.TextureLoader().load('./textures/cta-photo@3x.png')
	  var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff })
	  this.photographPoint = new THREE.Sprite(spriteMaterial)
    this.photographPoint.position.z = -170
    this.photographPoint.position.y = 10
    this.photographPoint.position.x = -5
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
  // update (time) {
  // }
}
