import * as THREE from 'three'
import * as TWEEN from 'tween'

// positionial sound
// ambiant sound
// interaction sound

export default class Sound {
  constructor (scene, camera, mesh) {
    // this.scene = scene
    this.camera = camera
    this.initSound()
    this.initSptialSound(mesh)
    this.initAmbiantSound()
    this.initIntroSound()
    window.addEventListener('click', () => {
      if (this.ambiantSound && !this.ambiantSound.isPlaying) {
        this.ambiantSound.play()
        this.spacialSound.play()
        this.introSound.play()
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
    this.audioLoader.load('../../sounds/sound_ambiant_xp.mp3', (buffer) => {
      this.ambiantSound.setBuffer(buffer)
      this.ambiantSound.setLoop(true)
      this.ambiantSound.setVolume(1)
    })
  }
  initIntroSound () {
    // create a global audio source
    this.introSound = new THREE.Audio(this.listener)
    // load a sound and set it as the Audio object's buffer
    this.audioLoader.load('../../sounds/sound_spatial_intro.mp3', (buffer) => {
      this.introSound.setBuffer(buffer)
      this.introSound.setLoop(false)
      this.introSound.setVolume(0.5)
    })
  }
  initSptialSound (mesh) {
    // create the PositionalAudio object (passing in the listener)
    this.spacialSound = new THREE.PositionalAudio(this.listener)

    // load a sound and set it as the PositionalAudio object's buffer
    this.audioLoader.load('../../sounds/sound_spatial_seagulls.mp3', (buffer) => {
      this.spacialSound.setBuffer(buffer)
      this.spacialSound.setRefDistance(8)
      this.spacialSound.setLoop(true)
      this.spacialSound.setVolume(1)
    })

    // finally add the sound to the mesh
    mesh.add(this.spacialSound)
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
