import * as THREE from 'three'
import Engine from './Engine'

import Environment from './components/Environment'
import CubeTest from './components/CubeTest'
import Collectable from './components/Collectable'
import Instances from './components/Instances'
// import GltfLoader from './components/GltfLoader'
import GltfLoaderRefactored from './components/GltfLoaderRefactored'
import Boat from './components/Boat'
// import Photograph from './components/Photograph'
import Sound from './components/Sound'
import { animateVector3 } from './utils/Animation'

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
    // console.log(this.scene)
  }
  initSound () {
    this.sound = new Sound(this.scene, this.camera)
  }

  initGeometry () {
    this.environment = new Environment(this.scene, this.renderer, this.light)
    this.cube = new CubeTest(this.scene)
    this.boat = new Boat(this.scene, this.manager, this.camera)
    this.instances = new Instances(this.scene, this.manager, './models/instance_montange_null_01.glb')
    this.mountain = new GltfLoaderRefactored('montagne', './models/montagne_ensemble_12.glb', this.scene, this.manager, { addToScene: false })
    // this.photograph = new Photograph(this.scene, this.camera)
    this.collectable = new Collectable(this.scene, this.manager, this.camera, this.width, this.height)
    this.objectCollectable2 = new GltfLoaderRefactored('second', './models/bottle_coca.glb', this.scene, this.manager, { posX: 0, posY: 0, posZ: -40, scale: 0.1, addToScene: true })
    this.scene.add(this.collectable.collectableGroup)
  }
	
  initColliders () {
    // mountains
    this.mountainBoxesPromise = this.mountain.then(response => {
    })
    
    // boat
    this.boatBoxPromise = this.boat.object.then((response) => {
    })
  }
  
	initGroup () {
    this.initMountainInstancesGroup()
    this.initWaterBoatGroup()
    this.scene.add(this.mountainInstancesGroup)
    this.scene.add(this.waterBoatGroup)
    this.mountainInstancesGroup.position.z = 370 // use for prod 370
  }

  moveGroup () {
    if (this.showPhotograph) return
    const strength = 2.0
    let x = this.mountainInstancesGroup.position.x + (this.mouseLerp.x / strength)
    let z = this.mountainInstancesGroup.position.z - (this.mouseLerp.y / strength)
    this.mountainInstancesGroup.position.set(x, 0, z)
    // this.mountainInstancesGroup.rotation.y = (this.mouseLerp.x / strength / 5)
    if (this.mountainInstancesGroup.position.z < 270) {
      this.sound.fadeOut(this.sound.introSound)
    }
    // detect collision
    // this.mountainBoxesPromise.then(mountainBoxes => {
    // })
  }
  // keyboard () {
  // }
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
    // this.mountainInstancesGroup.add(this.sphere.mesh)
    this.instances.dechetsPromise.then(() => {
      this.instances.clusterArray.forEach(element => {
        // this.mountainInstancesGroup.add(element)
      })
    })
    this.mountain.then(response => {
      response.meshes.forEach(element => {
        // this.mountainInstancesGroup.add(element)
      })
    })
    this.objectCollectable2.then(response => {
      response.meshes[0].rotation.x = -20
      this.mountainInstancesGroup.add(response.meshes[0])
      this.sound.initSptialSound(response.meshes[0])
    })
    // this.mountainInstancesGroup.add(this.photograph.photographPoint)
    // this.mountainInstancesGroup.add(this.cube.object)
  }
  setDisplayInventory (value) {
    if (value) {
      // this.scene.background = null
      // this.scene.remove(this.mountainInstancesGroup)
      // this.scene.remove(this.waterBoatGroup)
      // this.scene.add(this.collectable.collectableGroup)
      // this.collectable.openInventory(true)
      // this.camera.position.set(0, 0, -40)
    } else {
      // this.scene.background = this.environment.cubeCamera.renderTarget
      // this.collectable.openInventory(false)
      // this.scene.remove(this.collectable.collectableGroup)
      // this.scene.add(this.mountainInstancesGroup)
      // this.scene.add(this.waterBoatGroup)
      // this.camera.position.set(0, 3.5, -52)
    }
  }
  onShowPhotograph () {
    if (this.showPhotograph) {
      // this.photograph.scaleOut(0.000001)
    }
    return this.showPhotograph
  }
  closePhoto () {
    this.showPhotograph = false
    // remove point of interest
  }
  
  onClick () {
    this.collectable.changeMaterial(this.objectCollectable2)
    // console.log(store)
    let intersected = false
    let group = this.scene.children.filter(element => element.name === 'mountain and instances')
    if (group[0] && group[0].children) {
      let clickableElement = []
      let groupScene = group[0].children.filter(element => element.type === 'Scene')
      clickableElement.push(group[0].children)
      groupScene.forEach(element => {
        if (element.children[0].type === 'Mesh') clickableElement[0].push(element.children[0])
      })
      let intersects = this.raycaster.intersectObjects(clickableElement[0])
      let scaleOut = 0.00001
      intersects.forEach((intersect) => {
        switch (intersect.object.name) {
          case 'starbucks':
            store.objectFound(6)
            animateVector3(intersect.object.scale, new THREE.Vector3(scaleOut, scaleOut, scaleOut), {
              duration: 1000,
              easing: TWEEN.Easing.Quadratic.InOut
            })
            intersected = true
            break
          case 'bouteille_coca':
            intersected = true
            store.objectFound(2)
            animateVector3(intersect.object.scale, new THREE.Vector3(scaleOut, scaleOut, scaleOut), {
              duration: 1000,
              easing: TWEEN.Easing.Quadratic.InOut
            })
            break
          case 'montagne':
            console.log('montagne')
            intersected = true
            break
          case 'photograph':
            intersected = true
            this.showPhotograph = true
            break
          default:
            intersected = false
            break
        }
      })
    }
  }
  animate () {
    // helpers
    if (this.helpers.stats) this.helpers.stats.begin()
    if (this.helpers.orbitControls) this.helpers.orbitControls.update()

    // update
    this.timeDelta = this.clock.getDelta()
    this.timeElapsed = this.clock.getElapsedTime()

    // nav
    this.moveGroup()

    // update
    this.sound.update(this.timeElapsed)
    this.cube.update(this.timeElapsed)
    // this.collectable.update()
    this.boat.update(this.timeElapsed, this.mouseLerp)
    this.environment.update(this.timeElapsed)

    this.camera.lookAt(0, 0, 0)

    this.render()

    if (this.helpers.stats) this.helpers.stats.end()

    requestAnimationFrame(() => this.animate())
  }
}
