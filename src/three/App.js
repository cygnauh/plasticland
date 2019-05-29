import * as THREE from 'three'
import * as TWEEN from 'tween'
import Engine from './Engine'
import Environment from './components/Environment'
import CubeTest from './components/CubeTest'
import Collectable from './components/Collectable'
import Instances from './components/Instances'
import GltfLoader from './components/GltfLoader'
import GltfLoaderRefactored from './components/GltfLoaderRefactored'
import Boat from './components/Boat'
import Sound from './components/Sound'
import { onClickRaycaster } from './utils/Event'

export default class App extends Engine {
  constructor (refs) {
    super(refs.canvas)
    this.openInventory = false
    this.initGeometry(refs)
    this.initGroup()
    this.initCollectable()
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
    this.mountain = new GltfLoader('montagne', './models/montagne_ensemble_15.glb', this.scene, this.manager, { posY: -1.2, addToScene: false })
    this.objectCollectable2 = new GltfLoaderRefactored('second', './models/bottle_coca.glb', this.scene, this.manager, { posX: 0, posY: 0, posZ: 0, scale: 0.01, addToScene: true })
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

  initCollectable () {
    this.collectable = new Collectable(this.renderer, this.manager, this.scene)
    this.collectableElement = this.collectable.initCollectables()
  }

  setDisplayInventory (value) {
    if (value) {
      this.scene.remove(this.groupPlasticLand)
      this.scene.remove(this.cameraSpline.splineLine)
      setTimeout(() => {
        this.openInventory = true
      }, 1)
      this.scene.background = null
    } else {
      this.scene.background = this.environment.cubeCamera.renderTarget
      this.openInventory = false
      this.scene.add(this.groupPlasticLand)
      this.scene.add(this.cameraSpline.splineLine)
    }
  }

  onClick () {
    // let arrayMesh = this.scene.children.filter(x => x.type === 'Group')
    // onClickRaycaster(arrayMesh[0].children, this.raycaster)
  }

  animate () {
    // helpers
    if (this.helpers.stats) this.helpers.stats.begin()
    if (this.helpers.orbitControls) this.helpers.orbitControls.update()

    // update
    TWEEN.update()
    this.timeDelta = this.clock.getDelta()
    this.timeElapsed = this.clock.getElapsedTime()

    // update scene children
    this.cameraSpline.updateCamera()
    this.sound.update(this.timeElapsed)
    this.cube.update(this.timeElapsed)
    this.boat.update(this.timeElapsed, this.mouseLerp, this.cameraSpline)
    this.environment.update(this.timeElapsed, this.cameraSpline)

    if (this.openInventory && this.collectable) {
      // render collectable scenes
      this.collectable.collectableRender(this.collectableElement)
    } else {
      // reset initial viewport, full screen size
      this.renderer.setScissor(0, 0, this.width, this.height)
      this.renderer.setViewport(0, 0, this.width, this.height)
    }
    // stop rendering the main scene when inventory open
    if (!this.openInventory) this.composer.render(this.timeDelta)

    if (this.helpers.stats) this.helpers.stats.end()
    requestAnimationFrame(() => this.animate())
  }
}
