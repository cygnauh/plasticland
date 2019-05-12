import * as THREE from 'three'

export default class SphereSound {
  constructor (scene, camera) {
    this.scene = scene
    this.camera = camera
    this.initCube()
  }

  initCube () {
    var listener = new THREE.AudioListener()
    this.camera.add(listener)

    // create the PositionalAudio object (passing in the listener)
    var sound = new THREE.PositionalAudio(listener)
    console.log(sound)

    // load a sound and set it as the PositionalAudio object's buffer
    var audioLoader = new THREE.AudioLoader()
    audioLoader.load('../../sounds/sound_spatial_seagulls.mp3', (buffer) => {
      sound.setBuffer(buffer)
      sound.setRefDistance(20)
      sound.setLoop(true)
      // sound.play()
      console.log(sound)
    })

    console.log(audioLoader)

    // create an object for the sound to play from
    var sphere = new THREE.SphereGeometry(3, 32, 16)
    var material = new THREE.MeshPhongMaterial({ color: 0xff2200 })
    this.mesh = new THREE.Mesh(sphere, material)
    // console.log(mesh)
    this.mesh.position.x = -10
    // mesh.position.z = -100
    // this.scene.add(mesh)

    // finally add the sound to the mesh
    this.mesh.add(sound)
    console.log(this.mesh)
    window.addEventListener('click', () => {
      if (sound && !sound.isPlaying) sound.play()
    }, false)
  }

  // update (time) {
  // }
}
