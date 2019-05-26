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

import { store } from '../store/index'
import * as TWEEN from 'tween'

export default class App extends Engine {
  constructor (canvas) {
    super(canvas)
    this.displayInventory = false
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
    this.mountain = new GltfLoader('montagne', './models/montagne_ensemble_15.glb', this.scene, this.manager, { addToScene: false })
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

  /* onClick () {
    this.collectable.changeMaterial(this.objectCollectable2)
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
  } */

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
    this.environment.update(this.timeElapsed)
    this.collectable.update()

    this.render()

    if (this.helpers.stats) this.helpers.stats.end()

    requestAnimationFrame(() => this.animate())
  }
}
