import * as THREE from 'three'
import GltfLoaderTest from './GltfLoaderTest'
import config from '../../assets/data/inventory'

export default class Collectable {
  constructor (scene, manager, camera) {
    this.scene = scene
    this.manager = manager
    this.camera = camera
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
        -2 * value.id,
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
