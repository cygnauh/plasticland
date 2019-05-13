import * as THREE from 'three'
import Engine from './Engine'

import Environment from './components/Environment'
import CubeTest from './components/CubeTest'
import Sphere from './components/SphereSound'
import Collectable from './components/Collectable'
import Instances from './components/Instances'
import GltfLoader from './components/GltfLoader'
import Boat from './components/Boat'
import Photograph from './components/Photograph'
import Sound from './components/Sound'

export default class App extends Engine {
  constructor (canvas) {
    super(canvas)
    this.initGeometry()
    this.initGroup()
    this.initSound()
    this.animate()
  }
  initSound () {
    this.sound = new Sound(this.scene, this.camera, this.sphere.mesh)
  }
  initGeometry () {
    this.environment = new Environment(this.scene, this.renderer, this.light) // this.waterOld = new WaterV1(this.scene) merci quoi :(
    this.cube = new CubeTest(this.scene)
    this.sphere = new Sphere(this.scene, this.camera)
    this.boat = new Boat(this.scene, this.manager, this.camera)
    this.instances = new Instances(this.scene, this.manager, './models/instance_montange_null_01.glb')
    this.mountain = new GltfLoader('montagne', './models/montagne_ensemble_05.glb', this.scene, this.manager, { posX: 0, posZ: 0, scale: 0.025, rotateY: -200, addToScene: true })
    this.photograph = new Photograph(this.scene, this.camera)
    this.collectable = new Collectable(this.scene, this.manager, this.camera, this.width, this.height)
  }

  initGroup () {
    this.initMountainInstancesGroup()
    this.initWaterBoatGroup()
    this.scene.add(this.mountainInstancesGroup)
    this.scene.add(this.waterBoatGroup)
    this.mountainInstancesGroup.position.x = 35
    this.mountainInstancesGroup.position.z = 370 // for test use 300
  }
  moveGroup () {
    const strength = 10.0
    let x = this.mountainInstancesGroup.position.x + (this.mouseLerp.x / strength)
    let z = this.mountainInstancesGroup.position.z - (this.mouseLerp.y / strength)
    this.mountainInstancesGroup.position.set(x, 0, z)
    this.mountainInstancesGroup.rotation.y = (this.mouseLerp.x / strength / 5)
    if (this.mountainInstancesGroup.position.z < 270) {
      this.sound.fadeOut(this.sound.introSound)
    }
  }

  initWaterBoatGroup () {
    this.waterBoatGroup = new THREE.Group()
    this.waterBoatGroup.name = 'water and boat'
    this.boat.object.then(response => {
      response.meshes.forEach(element => {
        this.waterBoatGroup.add(element)
      })
    })
    this.waterBoatGroup.add(this.environment.water)
  }

  initMountainInstancesGroup () {
    this.mountainInstancesGroup = new THREE.Group()
    this.mountainInstancesGroup.name = 'mountain and instances'
    this.mountainInstancesGroup.add(this.sphere.mesh)
    this.instances.dechetsPromise.then(() => {
      this.instances.clusterArray.forEach(element => {
        this.mountainInstancesGroup.add(element)
      })
    })
    this.mountain.then(response => {
      response.meshes.forEach(element => {
        this.mountainInstancesGroup.add(element)
      })
    })
    this.mountainInstancesGroup.add(this.photograph.photographPoint)
    this.mountainInstancesGroup.add(this.cube.object)
  }

  setDisplayInventory (value) {
    // remove the groupe from the scene
    if (value) {
      this.scene.background = null
      this.scene.remove(this.mountainInstancesGroup)
      this.scene.remove(this.waterBoatGroup)
      this.scene.add(this.collectable.collectableGroup)
      this.collectable.openInventory(true)
      this.camera.position.set(0, 0, -40)
    } else {
      this.scene.background = this.environment.cubeCamera.renderTarget
      this.collectable.openInventory(false)
      this.scene.remove(this.collectable.collectableGroup)
      this.scene.add(this.mountainInstancesGroup)
      this.scene.add(this.waterBoatGroup)
      this.camera.position.set(0, 3.5, -52)
    }
  }

  onClick () {
    let intersected = false
    let group = this.scene.children.filter(element => element.name === 'mountain and instances')
    let intersects = this.raycaster.intersectObjects(group[0].children)
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

    // navigation
    this.moveGroup()

    // update
    this.sound.update(this.timeElapsed)
    this.cube.update(this.timeElapsed)
    this.collectable.update()
    this.boat.update(this.timeElapsed, this.mouseLerp)
    this.environment.update(this.timeElapsed)

    this.render()

    if (this.helpers.stats) this.helpers.stats.end()

    requestAnimationFrame(() => this.animate())
  }
}
