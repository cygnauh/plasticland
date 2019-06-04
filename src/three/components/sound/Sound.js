import * as THREE from 'three'
import * as TWEEN from 'tween'
import { store } from '../../../store/index'
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
    const srcAmbiant = store.state.sounds.ambiant.src
    this.audioLoader.load(srcAmbiant, (buffer) => {
      this.ambiantSound.setBuffer(buffer)
      this.ambiantSound.setLoop(true)
      this.ambiantSound.setVolume(1)
    })
  }

  initPlaceSound () {
    this.placeSounds = []
    store.state.sounds.place.forEach(element => {
      // let placeSound = new THREE.Audio(this.listener)
      let placeSound = new Howl({
        src: [element.src]
      })

      // Clear listener after first call.
      placeSound.once('load', () => {
        let test = placeSound.play()
        console.log(test)
        this.placeSounds.push([placeSound, placeSound.play])
      })

      // Fires when the sound finishes playing.
      // this.audioLoader.load(element.src, (buffer) => {
      //   placeSound.setBuffer(buffer)
      //   placeSound.setLoop(true)
      //   placeSound.setVolume(1)
      // })
    })
  }

  fadeOut (sound) {
    let volume = { x: sound.getVolume() } // tweens not work without object
    // using Tween.js
    new TWEEN.Tween(volume).to({
      x: 0
    }, 5).onUpdate(() => {
      sound.setVolume(volume.x)
    }).onComplete(() => {
      if (sound && sound.isPlaying && sound.getVolume() < 0.0001) {
        sound.stop()
      }
    }).start()
  }

  update (time) {
    TWEEN.update(time)
  }
}
