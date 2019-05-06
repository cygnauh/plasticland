import * as THREE from 'three'
import Engine from './Engine'

import WaterV2 from './components/WaterV2'
import CubeTest from './components/CubeTest'
import Collectable from './components/Collectable'
// import Boat from './components/Boat'
import Instances from './components/Instances'
import GltfLoader from './components/GltfLoader'

export default class App extends Engine {
  constructor (canvas) {
    super(canvas)

    this.addGeometry()
    this.animate()
    this.createGroup()
  }

  addGeometry () {
    this.water = new WaterV2(this.scene, this.renderer) // this.waterOld = new WaterV1(this.scene) merci quoi :(
    this.cube = new CubeTest(this.scene)
    // this.boat = new Boat(this.scene, this.manager, this.camera)
    this.instances = new Instances(this.scene, this.manager, './models/instance_montange_null_01.glb')
    this.mountain = new GltfLoader('montagne', './models/montagne.glb', this.scene, this.manager)
    this.collectable = new Collectable(this.manager, this.camera, this.width, this.height)

    // TODO handle this, to display when it's needed
    setTimeout(() => {
      this.collectable.objects.forEach((element) => {
        this.scene.add(element.gltf)
      })
    }, 300)
  }

  createGroup () {
    this.xpGroup = new THREE.Group()
    setTimeout(() => {
      console.log(this.mountain.gltf)
      this.instances.clusterArray.forEach((element) => {
        // console.log(element)
        this.xpGroup.add(element)
      })
    }, 500)

    this.xpGroup.add(this.water)
    // this.xpGroup.add(this.mountain)
    this.scene.add(this.xpGroup)
  }

  setDisplayInventory (value) {
    this.displayInventory = value
    // remove the groupe from the scene
    if (this.displayInventory) {
      console.log('hee')
      this.scene.remove(this.camera)
      // this.scene.add(this.inventoryCamera)
    } else {
      // this.scene.activeCamera = this.camera
    }
    // this.scene.activeCamera.needsUpdate = true
  }

  onClick () {
    let intersected = false
    let intersects = this.raycaster.intersectObjects(this.scene.children)
    intersects.forEach((intersect) => {
      switch (intersect.object.name) {
        case 'cubeTest':
          intersected = true
          console.log('tu as clické sur le cubeTest')
          break
        default:
          intersected = false
          break
      }
    })
  }

  animate () {
    // helpers
    if (this.helpers.stats) this.helpers.stats.begin()
    if (this.helpers.controls) this.helpers.controls.update()

    // update
    this.timeDelta = this.clock.getDelta()
    this.timeElapsed = this.clock.getElapsedTime()

    // update
    this.cube.update(this.timeElapsed)
    this.collectable.update()
    // this.boat.update(this.timeElapsed)
    this.water.update(this.timeElapsed)

    this.render()

    if (this.helpers.stats) this.helpers.stats.end()

    requestAnimationFrame(() => this.animate())
  }
}
