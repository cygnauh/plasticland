import GltfLoader from './GltfLoaderRefactored'
import * as THREE from 'three/src/Three'
import { store } from '../../store/index'
import { setupScene, rendenerSceneInfo } from '../utils/utilsScene'

export default class Collectable {
  constructor (renderer, manager) {
    this.renderer = renderer
    this.manager = manager
    // this.scene = scene // if using GLTFLoader.js pass scene in params
  }

  initCollectables () {
    let collectableArray = []
    const containers = store.state.objectContainers
    store.state.objects.forEach(element => {
      // collectableArray.push(setupScene(containers[`${element.name}`][0], element.name, element.model, this.manager))
      collectableArray.push(setupScene(element.name, element.model, this.manager))
    })
    return collectableArray
  }

  collectableRender (array) {
    this.renderer.setScissorTest(false)
    this.renderer.clear(true, true)
    this.renderer.setScissorTest(true)
	  const containers = store.state.objectContainers
    array.forEach(scene => {
      if (scene && scene.name) {
        rendenerSceneInfo(scene, containers[`${scene.name}`][0], this.renderer)
      }
    })
  }
  update () {
    // TWEEN.update()
  }
}
