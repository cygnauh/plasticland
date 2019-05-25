import GltfLoader from './GltfLoaderRefactored'
import * as THREE from 'three/src/Three'
import { store } from '../../store/index'
import { setupScene, resizeRendererToDisplaySize, rendenerSceneInfo } from '../utils/utilsScene'

// Inventory collectable and XP collectable

// method to update the

export default class Collectable2 {
  constructor (containers, renderer, manager) {
    this.renderer = renderer
    this.manager = manager
    // this.initCollectables()
  }

  initCollectables () {
    // store.state.objects.forEach(element => {
		 //  setupScene(document.querySelector('#plastique1'))
    // })

    // test only for one object
	  return setupScene(document.querySelector('#plastique1')) // from the store get the name of objects
  }

  collectableRender (scene) {
	  resizeRendererToDisplaySize(this.renderer)

	  this.renderer.setScissorTest(false)
	  this.renderer.clear(true, true)
	  this.renderer.setScissorTest(true)

	  rendenerSceneInfo(scene, this.renderer)
  }
  update () {
    // TWEEN.update()
  }
}
