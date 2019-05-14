// import * as THREE from 'three'
import GltfLoader from './GltfLoader'
import { store } from '../../store/index'
import * as THREE from 'three/src/Three'
import * as TWEEN from 'tween'
import { animateVector3 } from '../utils/Animation'

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
      let y = i < 3 ? 0 : -10
      if (value) {
        obj = new GltfLoader(
          value.name,
          value.model,
          this.scene,
          this.manager,
          { posX: x, posY: y, posZ: 0, scale: 0.00001, found: value.found, addToScene: false }
        )
        obj.then(response => {
          this.objects.push(response.meshes[0])
          this.collectableGroup.add(response.meshes[0])
        })
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
    this.objects.forEach(element => {
      if (element.name === name) {
        this.item = element
      }
    })

    this.otherItems = this.objects.filter(item => item.name !== name)
    this.scaleItems(this.otherItems, 0.00001)
    this.animateVector3(this.item.position, new THREE.Vector3(3, -1.9, -25), {
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
    let y = itemIndex < 3 ? 0 : -10
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

  rotateSelectedItem () {
    if (this.item) {
      this.item.rotation.y += 0.01
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
