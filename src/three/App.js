import * as THREE from 'three'
import Engine from './Engine'

import Environment from './components/Environment'
import CubeTest from './components/CubeTest'
import Collectable from './components/Collectable'
import Instances from './components/Instances'
import GltfLoader from './components/GltfLoader'
import GltfLoaderRefactored from './components/GltfLoaderRefactored'
import Boat from './components/Boat'
import Sound from './components/Sound'
import { animateVector3 } from './utils/Animation'
import { onClickRaycaster } from './utils/Event'

import { store } from '../store/index'
import * as TWEEN from 'tween'

export default class App extends Engine {
  constructor (canvas) {
    super(canvas)
    this.showPhotograph = false
    this.initGeometry()
    this.initGroup()
    this.initSound()
    this.animate()
  }

  initSound () {
    this.sound = new Sound(this.scene, this.camera)
  }

  initGeometry () {
    this.environment = new Environment(this.scene, this.renderer, this.light)
    this.cube = new CubeTest(this.scene)
    this.boat = new Boat(this.scene, this.manager, this.camera)
    this.instances = new Instances(this.scene, this.manager, './models/instance_montange_null_01.glb')
    this.mountain = new GltfLoader('montagne', './models/montagne_ensemble_12.glb', this.scene, this.manager, { addToScene: false })
    this.collectable = new Collectable(this.scene, this.manager, this.camera, this.width, this.height)
    this.objectCollectable2 = new GltfLoaderRefactored('second', './models/bottle_coca.glb', this.scene, this.manager, { posX: 0, posY: 0, posZ: 0, scale: 0.01, addToScene: true })
    this.scene.add(this.collectable.collectableGroup)
  }

  initGroup () {
    this.groupPlasticLand = new THREE.Group()
    this.groupPlasticLand.name = 'plasticland'
    this.boat.object.then(response => {
      response.meshes.forEach(el => {
        this.groupPlasticLand.add(el)
      })
    })
    this.groupPlasticLand.add(this.environment.water)
    this.instances.dechetsPromise.then(() => {
      this.instances.clusterArray.forEach(el => {
        this.groupPlasticLand.add(el)
      })
    })
    this.mountain.then(response => {
      response.meshes.forEach(el => {
        this.groupPlasticLand.add(el)
      })
    })
    this.objectCollectable2.then(response => {
      response.meshes[0].rotation.x = -20
      this.groupPlasticLand.add(response.meshes[0])
      this.sound.initSptialSound(response.meshes[0])
    })
    this.groupPlasticLand.add(this.cube.object)
    this.scene.add(this.groupPlasticLand)
  }

  setDisplayInventory (value) {
    if (value) {
      this.scene.background = null
      this.scene.remove(this.groupPlasticLand)
      this.scene.add(this.collectable.collectableGroup)
      this.collectable.openInventory(true)
      this.camera.position.set(0, 0, -40)
    } else {
      this.scene.background = this.environment.cubeCamera.renderTarget
      this.collectable.openInventory(false)
      this.scene.remove(this.collectable.collectableGroup)
      this.scene.add(this.groupPlasticLand)
      this.camera.position.set(0, 3.5, -52)
    }
  }

  onShowPhotograph () {
    // if (this.showPhotograph) {
    // }
    // return this.showPhotograph
  }

  closePhoto () {
    this.showPhotograph = false
  }

  onClick (array) {
    onClickRaycaster(array)
  }
  animate () {
    // helpers
    if (this.helpers.stats) this.helpers.stats.begin()
    if (this.helpers.orbitControls) this.helpers.orbitControls.update()

    this.timeDelta = this.clock.getDelta()
    this.timeElapsed = this.clock.getElapsedTime()
    this.sound.update(this.timeElapsed)
    this.cube.update(this.timeElapsed)
    this.boat.update(this.timeElapsed, this.mouseLerp)
    this.environment.update(this.timeElapsed)
    this.collectable.update()

    this.camera.lookAt(0, 0, 0)

    this.render()

    if (this.helpers.stats) this.helpers.stats.end()

    requestAnimationFrame(() => this.animate())
  }
}
