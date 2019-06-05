import * as THREE from 'three'
import * as TWEEN from 'tween'
import * as store from '../../store/index'
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
    this.voiceId = null
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
      sprite: {
        yes: [1000, 1000],
        intro1: [3000, 5000],
        intro2: [9000, 6000], // maybe mixed both
        intro2bis: [16000, 6000], // maybe mixed both
        starbucks: [26000, 9000],
        carrefour: [36000, 11000],
        cocacola: [49000, 9000],
        gestespropres: [59000, 14000],
        nestle: [76000, 12000],
        final: [88000, 8000],
        seconds: [88000, 8000]
      },
      volume: 1 // fade to 1 when it plays
    })
  }

  updatePlaceSound (value) {
    if (this.soundId) {
      this.currentSound.fade(1, 0, 2000, this.soundId)
    }
    this.currentSound = this.placeSounds.filter(element => element.name === value) ? this.placeSounds.filter(element => element.name === value)[0] : null
    if (this.currentSound) {
      // this.soundId = this.currentSound.sound.play() // TODO uncomment when voiceOver task's done
      this.voiceOver.play(this.currentSound.name)
      // this.currentSound.fade(0, 0.3, 3000, this.soundId) // TODO uncomment when voiceOver task's done
    }
  }
  updateSubtitle () {
    store.default.state.subtitle.forEach(element => {
      if (this.voiceOver.seek() > element.startAt &&
        this.voiceOver.seek() <= element.endAt) {
        store.default.commit('setCurrentSubtitle', element.text)
      }
    })
  }
  update (time) {
    if (this.voiceOver.playing()) {
      this.updateSubtitle()
    } else {
      store.default.commit('setCurrentSubtitle', '')
    }
    // is bigger than the next break point
    TWEEN.update(time)
  }
}
