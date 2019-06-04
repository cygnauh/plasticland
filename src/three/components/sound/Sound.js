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
    this.currendSound = null
    window.addEventListener('click', () => { // TODO temporary, need to be removed as soon as possible
      // this.test.play()
      console.log('hello')
      // this.placeSound.rate(1.5, this.test)
      this.placeSound.fade(0, 1, 3000, this.test)
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
        volume: 0
      })
      placeSound.once('load', () => {
        this.placeSounds.push([{ 'name': element.name }, { sound: placeSound }])
        console.log(this.placeSounds)
        // if (store.default.state.sounds.place.length === this.placeSounds)
      })
    })
    // let placeSound = new THREE.Audio(this.listener)
    // console.log(test)
    // Clear listener after first call.
    // placeSound.once('load', () => {
    //   placeSound.play()
    // })
    // placeSound.once('end', () => {
    //  console.log('end')
    // })
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

  update (time, cameraPosition) {
    let currentSound = store.default.state.sounds.place.filter(element => (element.startAt >= cameraPosition && element.endAt < cameraPosition))
    // if (currentSound.length !== 0) console.log(currentSound)
    if (cameraPosition === store.default.state.sounds.place.startAt) {
      console.log(store.default.state.sounds.place.name)
      // this.placeSounds.filter(element => element[0].name === )
    }
    
    //is bigger than the next break point
    TWEEN.update(time)
  }
}
