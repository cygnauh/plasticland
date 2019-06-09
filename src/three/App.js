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
    this.soundPlayed = false
  }

  initSound () {
    this.sound = new Sound(this.scene, this.camera)
  }

  initGeometry () {
    this.environment = new Environment(this.scene, this.renderer, this.light) // water and sky
    this.mountain = new GltfLoader('montagne', './models_converted/environnement.glb', this.scene, this.manager, { addToScene: false }) // mountains
    this.instances = new Instances(this.scene, this.manager, './models_converted/instances_01.glb') // instances on mountains
    this.boat = new Boat(this.scene, this.manager, this.camera) // boat
    this.objectsToCollect = new ObjectsToCollect(this.scene, this.manager, this.raycaster) // objects to collect
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
    if (store.default.state.displayIntroText) {
      store.default.commit('hideIntroText')
      if (this.sound && this.sound.voiceOver) {
        setTimeout(() => {
          this.sound.voiceOver.play('intro1')
        }, 500)
      }
    }
    if (
      !this.wheelStart &&
      store.default.state.currentRoute === '/plasticland' &&
      store.default.state.currentVoiceOverSeek > store.default.state.showFirstDidacticielAt // first didacticiel
    ) {
      this.cameraSpline.moveCamera(e)
      this.sound.updatePlaceSound(this.cameraSpline.percentageCamera.value)
      this.sound.updateVoiceOverSound(this.cameraSpline.percentageCamera.value)
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
    if (!this.soundPlayed) {
      this.handleSoundFirstTime()
    }
  }

  handleSoundFirstTime () {
    this.soundPlayed = true
    if (this.sound) {
      this.sound.initAmbiantSound()
      this.sound.initMelodySound()
      this.sound.initPlaceSound()
      this.sound.initVoiceOver()
    }
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
