// import * as THREE from 'three'
import GltfLoaderTest from './GltfLoaderTest'
import config from '../../assets/data/inventory'

export default class Collectable {
  constructor (scene, manager, camera, width, height) {
    this.scene = scene
    this.manager = manager
    this.camera = camera
    this.width = width
    this.height = height
    this.objects = []
    this.initCollectables()
    // console.log(config.objects)
  }

  initCollectables () {
    let obj = null
    config.objects.forEach((value, i) => {
      let x = i % 3 === 0 ? 0 : i % 3 === 1 ? -13 : 13
      let y = i % 2 === 0 ? 0 : 10
      obj = new GltfLoaderTest(
        value.name,
        '/models/boat.gltf',
        this.scene,
        this.manager,
        x, // x
        y, // y
        0, // z
        -Math.PI / 2 // rotation
      )
      this.objects.push(obj)
    })
  }
  update (time) {
  }
  selectedItem (name) {
    console.log(this.objects)
    console.log(this.objects.filter(item => item.name === name))
    const selectedItem = this.objects.filter(item => item.name === name)[0].gltf
    selectedItem.position.x = -4
    selectedItem.position.y = 6
    selectedItem.scale.x = 1.5
    selectedItem.scale.y = 1.5
    selectedItem.scale.z = 1.5
    // TODO take chosen item to the left
    // TODO scale to 0 the others then render false
  }
}
