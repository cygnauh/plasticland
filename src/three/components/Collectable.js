import GltfLoader from './GltfLoaderRefactored'
import * as THREE from 'three/src/Three'
import { store } from '../../store/index'
import { setupScene, rendenerSceneInfo } from '../utils/utilsScene'

export default class Collectable {
  constructor (renderer, manager) {
    this.renderer = renderer
    this.manager = manager
    // this.scene = scene // if using GLTFLoader.js pass scene in params
    this.collectableArray = []
    this.flatMaterial = new THREE.MeshPhongMaterial({
      color: (0x81C186),
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    })
  }

  initCollectables () {
    store.state.objects.forEach(element => {
      let object = setupScene(element.name, element.model, this.manager, element.found, this.flatMaterial)
      this.collectableArray.push(object)
    })
    return this.collectableArray
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

  changeMaterial (name) {
    let obj = this.collectableArray.filter(element => element.mesh.name === name)[0]
    let objMesh = obj.scene.children[1]
    if (objMesh.material.type !== 'MeshPhongMaterial') {
      objMesh.material = this.flatMaterial
    } else {
      objMesh.material = obj.materials.material
    }
  }

  update () {
    // TWEEN.update()
  }
}
