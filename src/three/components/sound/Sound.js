import * as THREE from 'three'
import * as TWEEN from 'tween'
import * as store from '../../../store'
import { Howl } from 'howler'
// positionial sound
// ambiant sound
// interaction sound

export default class Sound {
  constructor (scene, camera) {
    // this.scene = scene
    this.camera = camera
    this.initSound()
    this.initAmbiantSound()
    this.initPlaceSound()
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
        this.placeSounds.push([{ 'name': element.name }, { sound: placeSound }])
      })
    })
  }

  updatePlaceSound (value) {
    if (this.soundId) {
      this.currentSound.fade(1, 0, 2000, this.soundId)
    }
    this.currentSound = this.placeSounds.filter(element => element[0].name === value)[0][1].sound
    this.soundId = this.currentSound.play()
    this.currentSound.fade(0, 1, 3000, this.soundId)
  }
  update (time) {
    // is bigger than the next break point
    TWEEN.update(time)
  }
}
