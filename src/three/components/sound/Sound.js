import * as THREE from 'three'
import * as TWEEN from 'tween'
import * as store from '../../../store/index'
import { Howl } from 'howler'

export default class Sound {
  constructor (scene, camera) {
    // this.scene = scene
    this.camera = camera
    this.initSound()
    this.initAmbiantSound()
    this.initPlaceSound()
    this.initVoiceOver()
    this.currentSound = null
    this.soundId = null
    window.addEventListener('click', () => { // TODO temporary, need to be removed as soon as possible
      if (this.ambiantSound && !this.ambiantSound.isPlaying) {
        // this.ambiantSound.play()
      }
    }, false)
  }

  initSound () {
    this.listener = new THREE.AudioListener()
    this.camera.add(this.listener)
    this.audioLoader = new THREE.AudioLoader()
  }

  initAmbiantSound () {
    // create a global audio source
    this.ambiantSound = new THREE.Audio(this.listener)
    // load a sound and set it as the Audio object's buffer
    const srcAmbiant = store.default.state.sounds.ambiant.src
    this.audioLoader.load(srcAmbiant, (buffer) => {
      this.ambiantSound.setBuffer(buffer)
      this.ambiantSound.setLoop(true)
      this.ambiantSound.setVolume(1)
    })
  }

  initPlaceSound () {
    this.placeSounds = []
    store.default.state.sounds.place.forEach(element => {
      let src = element.src
      let placeSound = new Howl({
        src: [src],
        volume: 0 // fade to 1 when it plays
      })
      placeSound.once('load', () => {
        this.placeSounds.push({ 'name': element.name, sound: placeSound })
      })
    })
  }

  initVoiceOver () {
    let src = store.default.state.sounds.voice.src
    this.voiceOver = new Howl({
      src: [src],
      volume: 0 // fade to 1 when it plays
    })
    this.voiceOver.once('load', () => {
      this.voiceOver.play()
    })
  }

  updatePlaceSound (value) {
    if (this.soundId) {
      this.currentSound.fade(1, 0, 2000, this.soundId)
    }
    this.currentSound = this.placeSounds.filter(element => element.name === value) ? this.placeSounds.filter(element => element.name === value)[0].sound : null
    console.log(this.currentSound)
    if (this.currentSound) {
      this.soundId = this.currentSound.play()
      this.currentSound.fade(0, 1, 3000, this.soundId)
    }
  }
  update (time) {
    if (this.soundId) {
      // console.log(this.currentSound.seek()) // ==>  on play return the current Time
    }
    // is bigger than the next break point
    TWEEN.update(time)
  }
}
