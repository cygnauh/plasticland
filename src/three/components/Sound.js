import * as THREE from 'three'
import * as TWEEN from 'tween'
import * as store from '../../store/index'
import { Howl } from 'howler'

export default class Sound {
  constructor (scene, camera) {
    this.scene = scene
    this.camera = camera
    this.ambiantSoundPlaying = false
    this.melodySoundPlaying = false
    this.isClimaxSoundPlaying = false
    this.climaxId = null
    this.isClockPlaying = false
    this.currentSound = null
    this.soundId = null
    this.voiceId = null
  }

  initSound () {
    this.initAmbiantSound()
    this.initMelodySound()
    this.initPlaceSound()
    this.initVoiceOver()
    this.initClimaxSound()
    this.initClockSound()
  }

  initAmbiantSound () {
    // create a global audio source
    let src = store.default.state.sounds.ambiant.src
    this.ambiantSound = new Howl({
      src: [src],
      loop: true,
      volume: 0 // fade to 1 when it plays
    })
  }
  initMelodySound () {
    let src = store.default.state.sounds.melody.src
    this.melodySound = new Howl({
      src: [src],
      loop: true,
      volume: 0 // fade to 1 when it plays
    })
  }
  initClimaxSound () {
    let src = store.default.state.sounds.climax.src
    console.log(src)
    this.climaxSound = new Howl({
      src: [src],
      loop: false,
      volume: 1 // fade to 1 when it plays
    })
  }
  initClockSound () {
    let src = store.default.state.sounds.clock.src
    this.clockSound = new Howl({
      src: [src],
      loop: true,
      volume: 1 // fade to 1 when it plays
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
      sprite: store.default.state.sounds.voice.sprites[0],
      volume: 1 // TODO put to 1 in prod
    })
  }
  playAmbiantAndMelody () {
    if (this.ambiantSoundPlaying && this.melodySoundPlaying) return
    if (this.voiceOver.seek() > 13.0 && !this.ambiantSoundPlaying) {
      this.ambiantSound.id = this.ambiantSound.play()
      this.ambiantSound.fade(0, 1, 1000, this.ambiantSound.id)
      this.ambiantSoundPlaying = true
    } else if (this.voiceOver.seek() > 21.19 && !this.melodySoundPlaying && this.voiceOver.seek() < 75.07) {
      this.melodySound.id = this.melodySound.play()
      this.melodySound.fade(0, 1, 1000, this.melodySound.id)
      this.melodySoundPlaying = true
    }
  }
  finalTwist () {
    // stop melody at 75.07s, stop placeSound, play Nestle2.mp3 at 76.08s, playClock at 79.24s
    if (this.voiceOver.seek() > 75.07 && this.melodySound && this.melodySound.playing()) {
      this.melodySound.pause()
      console.log('hello')
    }
    if (this.voiceOver.seek() > 74.21 && this.currentSound && !this.isClimaxSoundPlaying) {
      // this.currentSound.sound.pause()
      this.climaxId = this.climaxSound.play()
      this.isClimaxSoundPlaying = true
      console.log('cli')
    }
    if (this.voiceOver.seek() > 78.6 && this.climaxSound && this.climaxSound.playing() && !this.isClockPlaying) {
      // this.climaxSound.fade(1, 0, 200, this.climaxId)
      // this.climaxSound.pause()
      this.clockSound.play()
      this.isClockPlaying = true
      console.log('clo')
    }
  }
  updatePlaceSound (percentageCamera) {
    store.default.state.sounds.place.forEach(element => {
      if (
        percentageCamera > element.startAt &&
        percentageCamera <= element.endAt &&
        store.default.state.currentPlace.name !== element.name &&
        element.name !== 'final'
      ) {
        store.default.commit('setCurrentPlace', element)
        if (this.soundId) this.currentSound.sound.fade(1, 0, 5000, this.soundId)
        this.currentSound = this.placeSounds.filter(item => item.name === element.name) ? this.placeSounds.filter(item => item.name === element.name)[0] : null
        if (this.currentSound) {
          // this.soundId = this.currentSound.sound.play() // TODO uncomment when voiceOver task's done
          this.currentSound.sound.fade(0, 1, 5000, this.soundId) // TODO uncomment when voiceOver task's done
        }
      }
    })
  }
  updateVoiceOverSound (percentageCamera) {
    store.default.state.sounds.voice.interval.forEach(element => {
      if (percentageCamera > element.startAt && !element.played) {
        store.default.commit('voiceOverPlayed', element.name) // set play to true
        this.voiceOver.play(element.name)
      }
    })
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
      this.playAmbiantAndMelody()
      this.finalTwist()
      this.updateSubtitle()
      if (store.default.state.currentVoiceOverSeek !== this.voiceOver.seek()) {
        store.default.commit('setVoiceOver', this.voiceOver.seek())
      }
    } else {
      if (store.default.state.currentSubtitle !== '') {
        store.default.commit('setCurrentSubtitle', '')
      }
    }
    // is bigger than the next break point
    TWEEN.update(time)
  }
}
