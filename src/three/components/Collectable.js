import GltfLoader from './GltfLoaderRefactored'
import * as THREE from 'three/src/Three'
import { store } from '../../store/index'
import { setupScene, resizeRendererToDisplaySize, rendenerSceneInfo } from '../utils/utilsScene'

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
			collectableArray.push(setupScene(containers[`${element.name}`][0], element.name, element.model, this.manager))
    })
    return collectableArray
  }

  collectableRender (array) {
    resizeRendererToDisplaySize(this.renderer)

    this.renderer.setScissorTest(false)
    this.renderer.clear(true, true)
    this.renderer.setScissorTest(true)
    array.forEach(scene => {
      rendenerSceneInfo(scene, this.renderer)
    })
  }
  update () {
    // TWEEN.update()
  }
}
