import * as THREE from 'three'
import * as TWEEN from 'tween'
import * as store from '../../store/index'
import { Howl } from 'howler'

export default class Sound {
  constructor (scene, camera) {
    this.scene = scene
    this.camera = camera
    this.initSound()
    this.initAmbiantSound()
    // this.initPlaceSound()
    this.initVoiceOver()
    this.currentSound = null
    this.soundId = null
    this.voiceId = null
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
        loop: true,
        volume: 1 // fade to 1 when it plays
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
        intro1: [3000, 5000], // charles, yes, tell me about one of your expedition,
        intro2: [9000, 6000], // I was traveling the ocean, watching the endless horizon.
        starbucks: [26000, 9000],
        carrefour: [36000, 11000],
        cocacola: [49000, 9000],
        gestespropres: [59000, 14000],
        nestle: [76000, 12000],
        final: [88000, 8000],
        interaction1: [88000, 8000], // INTERATIONS : Look at that!
        interaction2: [88000, 8000], // INTERATIONS : Check this out!
        interaction3: [88000, 8000], // INTERATIONS : Do you know this?
        interaction4: [88000, 8000], // INTERATIONS : What was that doing there?
        interaction5: [88000, 8000], // INTERATIONS : What the hell is that?
        interaction6: [88000, 8000], // INTERATIONS : Why is this object here?
        interaction7: [88000, 8000], // INTERATIONS : What is it?
        reaction1: [88000, 8000], // REACTIONS : It looks big here.
        reaction2: [88000, 8000], // REACTIONS : It's a huge mountain.
        reaction3: [88000, 8000], // REACTIONS : Oooooh, that smell, it's awful.
        reaction4: [88000, 8000] // REACTIONS : I can't believe it.
      },
      volume: 1 // fade to 1 when it plays
    })
  }

  updatePlaceSound (value) {
    if (this.soundId) {
      this.currentSound.sound.fade(1, 0, 5000, this.soundId)
    }
    console.log(value)
    this.currentSound = this.placeSounds.filter(element => element.name === value) ? this.placeSounds.filter(element => element.name === value)[0] : null
    if (this.currentSound) {
      this.soundId = this.currentSound.sound.play() // TODO uncomment when voiceOver task's done
      console.log(this.soundId)
      // this.voiceOver.play(this.currentSound.name)
      this.currentSound.sound.fade(0, 1, 5000, this.soundId) // TODO uncomment when voiceOver task's done
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
    if (this.voiceOver && this.voiceOver.playing()) {
      this.updateSubtitle()
    } else {
      store.default.commit('setCurrentSubtitle', '')
    }
    // is bigger than the next break point
    TWEEN.update(time)
  }
}
