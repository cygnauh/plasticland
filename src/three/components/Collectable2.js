import GltfLoader from './GltfLoaderRefactored'
import * as THREE from 'three/src/Three'
import { makeScene } from '../utils/utilsScene'

// Inventory collectable and XP collectable

export default class Collectable2 {
  constructor (containers, scene, manager, camera, width, height) {
    this.scene = scene
    this.manager = manager
    this.camera = camera
    this.initCollectables()
  }

  initCollectables () {
  }
  update () {
    // TWEEN.update()
  }
}
