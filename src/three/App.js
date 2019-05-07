import * as THREE from 'three'
import Engine from './Engine'

import Environment from './components/Environment'
import CubeTest from './components/CubeTest'
import Collectable from './components/Collectable'
import Instances from './components/Instances'
import GltfLoader from './components/GltfLoader'
import Boat from './components/Boat'

export default class App extends Engine {
  constructor (canvas) {
    super(canvas)
    this.initGeometry()
    this.scene.add(this.mainXpGroup())
    this.animate()
  }
  initGeometry () {
    this.environment = new Environment(this.scene, this.renderer, this.light) // this.waterOld = new WaterV1(this.scene) merci quoi :(
    this.cube = new CubeTest(this.scene)
    this.boat = new Boat(this.scene, this.manager, this.camera)
    this.instances = new Instances(this.scene, this.manager, './models/instance_montange_null_01.glb')
    this.mountain = new GltfLoader('montagne', './models/montagne.glb', this.scene, this.manager, { posX: 0, posZ: 0, scale: 0.025, rotateY: -200, addToScene: false })
    this.collectable = new Collectable(this.scene, this.manager, this.camera, this.width, this.height)
  }

  mainXpGroup () {
    this.xpGroup = new THREE.Group()
    this.instances.dechetsPromise.then(() => {
      this.instances.clusterArray.forEach(element => {
        this.xpGroup.add(element)
      })
    })
    this.xpGroup.add(this.environment.water)
    this.xpGroup.add(this.cube.object)
    this.mountain.then(response => {
      response.meshes.forEach(element => {
        this.xpGroup.add(element)
      })
    })
    return this.xpGroup
  }

  setDisplayInventory (value) {
    // remove the groupe from the scene
    if (value) {
      this.scene.remove(this.camera)
      this.scene.background = null
      this.scene.remove(this.mainXpGroup())
      this.collectable.objects.forEach(element => {
        this.scene.add(element)
      })
      // this.scene.add(this.inventoryCamera)
    } else {
      this.scene.background = this.environment.cubeCamera.renderTarget
      this.collectable.objects.forEach(element => {
        this.scene.remove(element)
      })
      this.scene.add(this.mainXpGroup())
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
    this.boat.update(this.timeElapsed)
    this.environment.update(this.timeElapsed)

    this.render()

    if (this.helpers.stats) this.helpers.stats.end()

    requestAnimationFrame(() => this.animate())
  }
}
