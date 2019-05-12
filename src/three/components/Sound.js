// positionial sound
// ambiant sound
// interaction sound

import * as THREE from 'three'

export default class Sound {
  constructor (scene, camera, mesh) {
    // this.scene = scene
    this.camera = camera
    this.initSound()
    this.initSptialSound(mesh)
    this.initAmbiantSound()
    window.addEventListener('click', () => {
      console.log('click')
      if (this.ambiantSound && !this.ambiantSound.isPlaying) {
        this.ambiantSound.play()
        this.spacialSound.play()
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
      this.ambiantSound.setVolume(0.5)
      // this.ambiantSound.play()
    })
  }
  initSptialSound (mesh) {
    // create the PositionalAudio object (passing in the listener)
    this.spacialSound = new THREE.PositionalAudio(this.listener)

    // load a sound and set it as the PositionalAudio object's buffer
    this.audioLoader.load('../../sounds/sound_spatial_seagulls.mp3', (buffer) => {
      this.spacialSound.setBuffer(buffer)
      this.spacialSound.setRefDistance(10)
      this.spacialSound.setLoop(true)
      this.spacialSound.setVolume(1)
    })

    // finally add the sound to the mesh
    mesh.add(this.spacialSound)
  }
}
