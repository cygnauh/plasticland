// import * as THREE from 'three'
import GltfLoader from './GltfLoaderRefactored'
import { store } from '../../store/index'
import * as THREE from 'three/src/Three'
import * as TWEEN from 'tween'
import { animateVector3 } from '../utils/Animation'

// Inventory collectable and XP collectable

export default class Collectable {
  constructor (scene, manager, camera, width, height) {
    this.scene = scene
    this.manager = manager
    this.camera = camera
    this.width = width
    this.height = height
    this.objects = []
    this.collectableGroup = null
    this.item = null
    this.otherItems = []
    this.animateVector3 = animateVector3
    this.initCollectables()
  }

  initCollectables () {
    let obj = null
    this.collectableGroup = new THREE.Group()
    store.state.objects.forEach((value, i) => {
      let x = i % 3 === 0 ? 13 : i % 3 === 1 ? 0 : -13
      let y = (i === 0 ? -1 : i === 5 ? -11 : i < 3 ? 0 : -10) + (3)
      if (value) {
        obj = new GltfLoader(
          value.name,
          value.model,
          this.scene,
          this.manager,
          { posX: x, posY: y, scale: 0.00001, found: value.found, addToScene: false }
        )
        obj.then(response => {
          this.objects.push(response.meshes[0])
          this.collectableGroup.add(response.meshes[0])
        })
      }
    })
  }
  changeMaterial (object) {
    let flatMaterial = new THREE.MeshPhongMaterial({
      color: (0x81C186),
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    })
    object.then(response => {
      if (response.meshes[0].material.type !== 'MeshPhongMaterial') {
        response.meshes[0].material = flatMaterial
      } else {
        response.meshes[0].material = response.materials[0].material
      }
    })
  }

  openInventory (value) {
    if (value) {
      this.scaleItems(this.objects, 1)
    } else {
      if (this.item) this.backToList()
      this.scaleItems(this.objects, 0.00001)
    }
  }

  selectedItem (name) {
    let posY = -1.9
    this.objects.forEach(element => {
      if (element.name === name) {
        this.item = element
        if (this.item.name === 'Ce n\'est pas juste du plastique, c\'est starbucks.') {
          posY = -3
        }
      }
    })

    this.otherItems = this.objects.filter(item => item.name !== name)
    this.scaleItems(this.otherItems, 0.00001)
    this.animateVector3(this.item.position, new THREE.Vector3(3, posY, -25), {
      duration: 800,
      easing: TWEEN.Easing.Quadratic.InOut
    })
    this.animateVector3(this.item.rotation, new THREE.Vector3(-0.4, 0, 0.1), {
      duration: 800,
      easing: TWEEN.Easing.Quadratic.InOut,
      delay: 400
    })
  }

  backToList () {
    let itemIndex = store.state.objects.filter(item => item.name === this.item.name)[0].id - 1
    // initial position of the selected item
    let x = itemIndex % 3 === 0 ? 13 : itemIndex % 3 === 1 ? 0 : -13
    let y = (itemIndex === 0 ? -1 : itemIndex === 5 ? -11 : itemIndex < 3 ? 0 : -10) + (3)
    this.animateVector3(this.item.position, new THREE.Vector3(x, y, 0), {
      duration: 800,
      easing: TWEEN.Easing.Quadratic.InOut
    })
    this.animateVector3(this.item.rotation, new THREE.Vector3(0, 0, 0), {
      duration: 800,
      easing: TWEEN.Easing.Quadratic.InOut
    })
    this.scaleItems(this.otherItems, 1)
  }

  rotateSelectedItem (boolean) {
    if (this.item) {
      console.log(this.item.rotation.y)
      if (boolean) {
        this.item.rotation.y += 0.01
      } else {
        this.item.rotation.y -= 0.01
      }
    }
  }

  scaleItems (array, scale) {
    array.forEach((element) => {
      this.animateVector3(element.scale, new THREE.Vector3(scale, scale, scale), {
        duration: 1000,
        easing: TWEEN.Easing.Quadratic.InOut
      })
    })
  }
  
  update () {
    TWEEN.update()
  }
}
