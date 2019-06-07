import * as THREE from 'three'
import * as TWEEN from 'tween'
import Engine from './Engine'
import Environment from './components/Environment'
import ObjectsToCollect from './components/ObjectsToCollect'
import Collectable from './components/Collectable'
import Instances from './components/Instances'
import GltfLoader from './components/GltfLoader'
import GltfLoaderRefactored from './components/GltfLoaderRefactored'
import Boat from './components/Boat'
import Sound from './components/Sound'
import * as store from '../store'

export default class App extends Engine {
  constructor (refs) {
    super(refs.canvas)
    this.currentRender = 'scene'
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
    this.environment = new Environment(this.scene, this.renderer, this.light) // water and sky
    this.mountain = new GltfLoader('montagne', './models_converted/environnement.glb', this.scene, this.manager, { addToScene: false }) // mountains
    this.instances = new Instances(this.scene, this.manager, './models_converted/instances_01.glb') // instances on mountains
    this.boat = new Boat(this.scene, this.manager, this.camera) // boat
    this.objectsToCollect = new ObjectsToCollect(this.scene, this.manager, this.raycaster, this.cameraSpline, this.renderer) // objects to collect
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
    // this.objectCollectable2.then(response => {
    //   response.meshes[0].rotation.x = -20
    //   this.groupPlasticLand.add(response.meshes[0])
    // })
    this.scene.add(this.groupPlasticLand)
  }

  initCollectable () {
    this.collectable = new Collectable(this.renderer, this.manager, this.scene)
  }

  handleRender (value) {
    if (value === 'list') {
      this.scene.remove(this.groupPlasticLand)
      this.scene.remove(this.cameraSpline.splineLine)
      // setTimeout(() => {
      this.currentRender = 'list'
      // }, 1)
      this.scene.background = null
    } else if (value === 'scene') {
      this.scene.background = this.environment.cubeCamera.renderTarget
      this.currentRender = 'scene'
      this.scene.add(this.groupPlasticLand)
      this.scene.add(this.cameraSpline.splineLine)
    } else if (value === 'cinematic') {
      this.currentRender = 'cinematic'
      this.collectable.itemSelected = store.default.state.currentFoundObjectName
    } else {
      this.currentRender = 'detail' // TODO handle the other case ( about page )
    }
  }
  
  handleWheel (e) {
    // apply on the first wheel event triggered
    if (store.default.state.displayIntro) {
      store.default.commit('hideIntro')
    }
    if (!this.wheelStart) {
      this.cameraSpline.moveCamera(e)
      // console.log(this.cameraSpline.percentageCamera)
      store.default.state.sounds.place.forEach(element => {
        if (this.cameraSpline.percentageCamera.value > element.startAt &&
          this.cameraSpline.percentageCamera.value <= element.endAt &&
          store.default.state.currentPlace.name !== element.name
        ) {
          store.default.commit('setCurrentPlace', element)
          this.sound.updatePlaceSound(element.name)
        }
      })
    }
    this.wheelStart = true
    if (this.timer !== null) {
      clearTimeout(this.timer)
    }
    // triggered when the wheel stops
    this.timer = setTimeout(() => {
      this.wheelStart = false
    }, 100)
  }

  onClick () {
    // let arrayMesh = this.scene.children.filter(x => x.type === 'Group')
    // onClickRaycaster(arrayMesh[0].children, this.raycaster)
    this.objectsToCollect.onClick()
    store.default.state.objects.forEach(element => {
      if (element.found) {
        this.collectable.changeMaterial(element.name, true)
      }
    })
    // this.sound.voiceOver.play()
    console.log(this.sound.voiceOver)
    // var promise = HTMLMediaElement.play()
    // promise.then(response => {
    //   console.log(response)
    // })
    this.sound.playSpatialSounds()
  }

  animate () {
    // helpers
    if (this.helpers.stats) this.helpers.stats.begin()
    if (this.helpers.orbitControls) this.helpers.orbitControls.update()
    this.raycaster.setFromCamera(this.mouse, this.camera)

    // update
    this.timeDelta = this.clock.getDelta()
    this.timeElapsed = this.clock.getElapsedTime()

    // update scene children
    this.cameraSpline.updateCamera()
    this.sound.update(this.timeElapsed, this.cameraSpline.percentageCamera)
    this.objectsToCollect.update(this.timeElapsed)
    this.boat.update(this.timeElapsed, this.mouseLerp, this.cameraSpline)
    this.environment.update(this.cameraSpline)
    this.collectable.tweenUpdate() // update tween

    if (this.currentRender === 'list' && this.collectable) {
      // render collectable scenes
      this.collectable.renderCollectables()
    } else if (this.currentRender === 'scene') {
      // reset initial viewport, full screen size
      this.renderer.setScissor(0, 0, this.width, this.height)
      this.renderer.setViewport(0, 0, this.width, this.height)
    } else {
      this.collectable.renderSelectedCollectable(this.currentRender)
    }

    // stop rendering the main scene when inventory open
    if (this.currentRender === 'scene') { // scene
      this.composer.render(this.timeDelta)
    }

    if (this.helpers.stats) this.helpers.stats.end()
    requestAnimationFrame(() => this.animate())
  }
}
