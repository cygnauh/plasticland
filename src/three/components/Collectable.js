import GltfLoader from './GltfLoaderRefactored'
import * as THREE from 'three/src/Three'
import * as TWEEN from 'tween'
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
    this.itemSelected = ''
    this.initCollectables()
  }

  initCollectables () {
    store.state.objects.forEach(element => {
      let object = setupScene(element.name, element.model, this.manager, element.found, this.flatMaterial)
      this.collectableArray.push(object)
    })
    return this.collectableArray
  }

  renderScissor () {
    this.renderer.setScissorTest(false)
    this.renderer.clear(true, true)
    this.renderer.setScissorTest(true)
  }

  renderCollectables () {
    this.renderScissor()
    const containers = store.state.objectContainers
    this.collectableArray.forEach(scene => {
      if (scene && scene.name) {
        rendenerSceneInfo(scene, containers[`${scene.name}`][0], this.renderer)
      }
    })
  }

  renderSelectedCollectable () {
    const name = this.itemSelected
    let scene = this.collectableArray.filter(element => element.name === name)
    this.renderScissor()
    rendenerSceneInfo(scene[0], store.state.selectItemContainer, this.renderer)
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
