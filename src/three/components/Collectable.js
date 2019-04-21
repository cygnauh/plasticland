import * as THREE from 'three'
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
    console.log(config.objects)
  }

  initCollectables () {
    let test = config.objects
    test.forEach((value) => {
      console.log(value)
      let obj = new GltfLoaderTest(
        value.name,
        '/models/boat.gltf',
        this.scene,
        this.manager,
        this.width/3,
        5 * (value.id % 2 ? -1 : 1),
        0,
        0
      )
      this.objects.push(obj)
    })
    console.log(this.objects)
  }
  update (time) {
  }
}
