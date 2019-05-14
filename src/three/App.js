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
    this.initColliders()
    this.initGroup()
    this.animate()
  }
  initGeometry () {
    this.environment = new Environment(this.scene, this.renderer, this.light)
    this.cube = new CubeTest(this.scene)
    this.boat = new Boat(this.scene, this.manager, this.camera)
    this.instances = new Instances(this.scene, this.manager, './models/instance_montange_null_01.glb')
    this.mountain = new GltfLoader('montagne', './models/montagne_ensemble_12.glb', this.scene, this.manager, { addToScene: true })
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
    this.mainGroup = this.mainXpGroup()
    this.scene.add(this.mainGroup)
  }

  moveGroup () {
    const strength = 2.0

    // detect collision
    this.mountainBoxesPromise.then(mountainBoxes => {
      mountainBoxes.forEach(el => {
        this.boatBoxPromise.then(boatBox => {
          console.log(el, boatBox)
          const collision = el.intersectsBox(boatBox)
          console.log(collision)
          if (!collision) {
            let x = this.mainGroup.position.x + (this.mouseLerp.x / strength)
            let z = this.mainGroup.position.z - (this.mouseLerp.y / strength)
            this.mainGroup.position.set(x, 0, z)
            this.mainGroup.rotation.y = (this.mouseLerp.x / strength / 5)
          }
        })
      })
    })

    // logic is check if mountainBox.intersectsBox(boatBox)
  }

  mainXpGroup () {
    this.xpGroup = new THREE.Group()
    this.instances.dechetsPromise.then(() => {
      this.instances.clusterArray.forEach(element => {
        this.xpGroup.add(element)
      })
    })
    this.mountain.then(response => {
      response.meshes.forEach(element => {
        this.xpGroup.add(element)
      })
    })
    // this.boat.object.then(response => {
    //   response.meshes.forEach(element => {
    //     this.xpGroup.add(element)
    //   })
    // })
    // this.xpGroup.add(this.environment.water)
    this.xpGroup.add(this.cube.object)
    return this.xpGroup
  }

  setDisplayInventory (value) {
    // remove the group from the scene
    if (value) {
      this.scene.background = null
      this.scene.remove(this.mainGroup)
      this.collectable.objects.forEach(element => { this.scene.add(element) })
      this.collectable.openInventory(true)
      this.camera.position.set(10, 0, -40)
    } else {
      this.scene.background = this.environment.cubeCamera.renderTarget
      this.collectable.openInventory(false)
      this.collectable.objects.forEach(element => { this.scene.remove(element) })
      this.scene.add(this.mainGroup)
      this.camera.position.set(0, 3.5, -52)
    }
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
    if (this.helpers.orbitControls) this.helpers.orbitControls.update()

    // update
    this.timeDelta = this.clock.getDelta()
    this.timeElapsed = this.clock.getElapsedTime()

    // nav
    this.moveGroup()

    // update
    this.cube.update(this.timeElapsed)
    this.collectable.update()
    this.boat.update(this.timeElapsed, this.mouseLerp)
    this.environment.update(this.timeElapsed)

    this.render()

    if (this.helpers.stats) this.helpers.stats.end()

    requestAnimationFrame(() => this.animate())
  }
}
