import GltfLoader from './GltfLoaderRefactored'
import * as THREE from 'three/src/Three'
import * as TWEEN from 'tween'
import * as store from '../../store'
import { setupScene, rendenerSceneInfo } from '../utils/utilsScene'
import { animateVector3 } from '../utils/Animation'

export default class Collectable {
  constructor (renderer, manager) {
    this.renderer = renderer
    this.manager = manager
    // this.scene = scene // if using GLTFLoader.js pass scene in params
    this.collectableArray = []
    this.flatMaterial = new THREE.MeshBasicMaterial({
      color: (0x3b3c55)
    })
    this.itemSelected = ''
    this.initCollectables()
  }

  initCollectables () {
    store.default.state.objects.forEach(element => {
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
    const containers = store.default.state.objectContainers
    this.collectableArray.forEach(scene => {
      if (scene && scene.name && containers[`${scene.name}`][0]) {
        rendenerSceneInfo(scene, containers[`${scene.name}`][0], this.renderer)
      }
    })
  }

  renderSelectedCollectable () {
    let scene = this.collectableArray.filter(element => element.name === this.itemSelected)
    scene[0].mesh.rotation.y += 0.01
    this.renderScissor()
    rendenerSceneInfo(scene[0], store.default.state.selectItemContainer, this.renderer)
  }

  changeMaterial (name, bool) {
    let obj = this.collectableArray.filter(element => element.mesh.name === name)[0]
    let objMesh = obj.scene.children[1]
    if (objMesh.material.type !== 'MeshBasicMaterial' && !bool) {
      objMesh.material = this.flatMaterial
    } else {
      objMesh.material = obj.materials.material
    }
  }
  closeCollectable () { // TODO if selected item, scale out all execept selected item
    this.collectableArray.forEach((element) => {
      element.mesh.scale.x = 0.000001
      element.mesh.scale.y = 0.000001
      element.mesh.scale.z = 0.000001
    })
  }
  openCollectable () {
    this.collectableArray.forEach((element) => {
      this.scaleItems(element.mesh, 1)
    })
  }
  closeItem () {
    let item = this.collectableArray.filter(element => element.name === this.itemSelected)
    item[0].scene.children[1].rotation.y = 0
  }

  openItem () {
    let item = this.collectableArray.filter(element => element.name === this.itemSelected)
    this.scaleItems(item[0].mesh, 1)
  }

  scaleItems (element, scale) {
    animateVector3(element.scale, new THREE.Vector3(scale, scale, scale), {
      duration: 1000,
      easing: TWEEN.Easing.Quadratic.InOut
    })
  }

  tweenUpdate () {
    TWEEN.update()
  }
}
