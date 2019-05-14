import * as THREE from 'three'
import Engine from './Engine'

import Environment from './components/Environment'
import CubeTest from './components/CubeTest'
import Sphere from './components/SphereSound'
import Collectable from './components/Collectable'
import Instances from './components/Instances'
import GltfLoader from './components/GltfLoader'
import Boat from './components/Boat'
import CannonTest from './components/cannonTest'
import Photograph from './components/Photograph'
import Sound from './components/Sound'

export default class App extends Engine {
  constructor (canvas) {
    super(canvas)
    // this.initCannon()
    this.showPhotograph = false
    this.initGeometry()
    this.initColliders()
    this.initGroup()
    // this.keyboard()
    this.initSound()
    this.animate()
  }
  initSound () {
    this.sound = new Sound(this.scene, this.camera, this.sphere.mesh)
  }
  // initCannon () {
  //   this.cannonTest = new CannonTest(this.scene, this.helpers.transformControls)
  // }

  initGeometry () {
    this.environment = new Environment(this.scene, this.renderer, this.light)
    this.cube = new CubeTest(this.scene)
    this.sphere = new Sphere(this.scene, this.camera)
    this.boat = new Boat(this.scene, this.manager, this.camera)
    this.instances = new Instances(this.scene, this.manager, './models/instance_montange_null_01.glb')
    this.mountain = new GltfLoader('montagne', './models/montagne_ensemble_12.glb', this.scene, this.manager, { addToScene: true })
    this.photograph = new Photograph(this.scene, this.camera)
    this.collectable = new Collectable(this.scene, this.manager, this.camera, this.width, this.height)
  }

  initColliders () {
    // mountains
    this.mountainBoxesPromise = this.mountain.then(response => {
      let geom = response.geometries
      const mountainBoxes = []
      geom.forEach(function (el) {
        el.computeBoundingBox()
        let mountainBox = new THREE.Box3(el.boundingBox.min, el.boundingBox.max)
        mountainBoxes.push(mountainBox)
        // console.log(mountainBoxes)
      })
      return mountainBoxes
    })

    // boat
    this.boatBoxPromise = this.boat.object.then((response) => {
      let geom = response.geometries
      let box = geom[0].computeBoundingBox()
      const boatBox = new THREE.Box3(geom[0].boundingBox.min, geom[0].boundingBox.max)
      // console.log(boatBox)
      return boatBox
    })
  }

  initGroup () {
    this.initMountainInstancesGroup()
    this.initWaterBoatGroup()
    this.scene.add(this.mountainInstancesGroup)
    this.scene.add(this.waterBoatGroup)
    this.mountainInstancesGroup.position.x = 35
    this.mountainInstancesGroup.position.z = 370 // use for prod 370
  }
  moveGroup () {
    if (this.showPhotograph) return
    const strength = 4.0
    let x = this.mountainInstancesGroup.position.x + (this.mouseLerp.x / strength)
    let z = this.mountainInstancesGroup.position.z - (this.mouseLerp.y / strength)
    this.mountainInstancesGroup.position.set(x, 0, z)
    // this.mountainInstancesGroup.rotation.y = (this.mouseLerp.x / strength / 5)
    if (this.mountainInstancesGroup.position.z < 270) {
      this.sound.fadeOut(this.sound.introSound)
    }
    // detect collision
    // this.mountainBoxesPromise.then(mountainBoxes => {
    //   mountainBoxes.forEach(el => {
    //     this.boatBoxPromise.then(boatBox => {
    //       // console.log(el, boatBox)
    //       const collision = el.intersectsBox(boatBox)
    //       // console.log(collision)
    //       if (!collision) {
    //
    //       }
    //     })
    //   })
    // })

  }
  // keyboard () {
  //   let mainGroup = this.mainGroup
  //   let mouseLerp = this.mouseLerp
  //   // this.mainGroup.rotation.y = (this.mouseLerp.x / strength / 5)
  //
  //   document.addEventListener('keydown', function (e) {
  //     console.log(e.code)
  //     switch (e.key) {
  //       case 'ArrowRight':
  //         // console.log("rotate right")
  //         mainGroup.rotation.y += 0.1
  //         break
  //       case 'ArrowLeft':
  //         // console.log("rotate left")
  //         mainGroup.rotation.y -= 0.1
  //         break
  //       case 'ArrowDown':
  //         // console.log("go down")
  //         mainGroup.position.z += 1
  //         break
  //       case 'ArrowUp':
  //         // console.log("go up")
  //         mainGroup.position.z -= 1
  //         break
  //       default:
  //         break
  //     }
  //   }, false)
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
    // remove the group from the scene
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
  onShowPhotograph () {
    if (this.showPhotograph) {
      this.photograph.scaleOut(0.000001)
    }
    return this.showPhotograph
  }
  closePhoto () {
    this.showPhotograph = false
    // remove point of interest
  }
  onClick () {
    let intersected = false
    let group = this.scene.children.filter(element => element.name === 'mountain and instances')
    let intersects = this.raycaster.intersectObjects(group[0].children)
    intersects.forEach((intersect) => {
      switch (intersect.object.name) {
        case 'cubeTest':
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
    this.collectable.update()
    this.boat.update(this.timeElapsed, this.mouseLerp)
    this.environment.update(this.timeElapsed)
    // this.cannonTest.update(this.timeDelta)

    this.render()

    if (this.helpers.stats) this.helpers.stats.end()

    requestAnimationFrame(() => this.animate())
  }
}
