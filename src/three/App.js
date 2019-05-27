import * as THREE from 'three'
import Engine from './Engine'

import Environment from './components/Environment'
import CubeTest from './components/CubeTest'
// import CollectableOld from './components/Collectable'
// import Collectable from './components/Collectable'
import Instances from './components/Instances'
import GltfLoader from './components/GltfLoader'
import GltfLoaderRefactored from './components/GltfLoaderRefactored'
import Boat from './components/Boat'
import Sound from './components/Sound'
import { onClickRaycaster } from './utils/Event'
// import { setupScene, setupScene2, rendenerSceneInfo, resizeRendererToDisplaySize } from './utils/utilsScene'

export default class App extends Engine {
  constructor (refs) {
    super(refs.canvas)
    this.initGeometry(refs)
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
    this.mountain = new GltfLoader('montagne', './models/montagne_ensemble_15.glb', this.scene, this.manager, { addToScene: false })
    // this.collectable = new Collectable(this.renderer, this.manager, this.scene)
    // this.collectableElement = this.collectable.initCollectables()
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

  setDisplayInventory (value) {
    // if (value) {
    //   this.scene.background = null
    //   this.scene.remove(this.groupPlasticLand)
    //   // this.collectable.openInventory(true)
    //   this.camera.position.set(0, 0, -40)
    // } else {
    //   this.scene.background = this.environment.cubeCamera.renderTarget
    //   // this.collectable.openInventory(false)
    //   this.scene.add(this.groupPlasticLand)
    //   this.camera.position.set(0, 3.5, -52)
    // }
  }

  onShowPhotograph () {
    // if (this.showPhotograph) {
    // }
    // return this.showPhotograph
  }

  closePhoto () {
    this.showPhotograph = false
  }

  onClick () {
    let arrayMesh = this.scene.children.filter(x => x.type === 'Group')
    onClickRaycaster(arrayMesh[0].children, this.raycaster)
  }
  animate () {
    // helpers
    if (this.helpers.stats) this.helpers.stats.begin()
    if (this.helpers.orbitControls) this.helpers.orbitControls.update()

    // update
    this.timeDelta = this.clock.getDelta()
    this.timeElapsed = this.clock.getElapsedTime()

    // update
    this.cameraSpline.moveCamera()
    this.sound.update(this.timeElapsed)
    this.cube.update(this.timeElapsed)
    this.boat.update(this.timeElapsed, this.mouseLerp, this.cameraSpline)
    this.environment.update(this.timeElapsed, this.cameraSpline)
	  // this.collectable.collectableRender(this.collectableElement)
	  
	  this.render()

    if (this.helpers.stats) this.helpers.stats.end()

    requestAnimationFrame(() => this.animate())
  }
}
