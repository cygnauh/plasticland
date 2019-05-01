import * as THREE from 'three'

export default class CubeTest {
  constructor (scene) {
    this.scene = scene
    this.initBoat()
  }

  initBoat () {
    this.initShader()
    // var texture = new THREE.TextureLoader().load( 'https://cinemont.com/tutorials/zelda/water.png' );
    this.geometry = new THREE.BoxBufferGeometry(2, 2, 2)
    // this.material = new THREE.MeshNormalMaterial()
    this.object = new THREE.Mesh(this.geometry, this.material)
    this.object.position.y = 0
    this.object.position.x = 10
    this.object.position.z = 10
    this.scene.add(this.object)
  }

  initShader () {
    this.material = new THREE.MeshPhongMaterial({
      color: 0x0B2641,
      shininess: 15,
      emissive: 0x0B2641,
      emissiveIntensity: 0.8
    })
  }
  calculateSurface (x, z, uTime) {
    let y = 0.0
    let SCALE = 10.0
    y +=
      (Math.sin((x * 1.0) / SCALE + uTime * 1.0) +
        Math.sin((x * 2.3) / SCALE + uTime * 1.5) +
        Math.sin((x * 3.3) / SCALE + uTime * 0.4)) /
      4.0
    y +=
      (Math.sin((z * 0.2) / SCALE + uTime * 1.8) +
        Math.sin((z * 1.8) / SCALE + uTime * 1.8) +
        Math.sin((z * 2.8) / SCALE + uTime * 0.8)) /
      2.0
    return y
  }
  update (time) {
    var y = this.calculateSurface(10, 10, time)
    this.object.position.y = y
  }
}
