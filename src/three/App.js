import * as THREE from 'three'
import Engine from './Engine'

import WaterOld from './components/WaterOld'
import CubeTest from './components/CubeTest'
import Collectable from './components/Collectable'
import Water from './components/Water'
import Sky from './components/Sky'
// import Boat from './components/Boat'
import Instances from './components/Instances'
import GltfLoader from './components/GltfLoader'

export default class App extends Engine {
  constructor (canvas) {
    super(canvas)

    this.addGeometry()
    this.animate()
    this.addWater()
  }

  addGeometry () {
    // this.waterOld = new WaterOld(this.scene)
    this.cube = new CubeTest(this.scene)
    // this.boat = new Boat(this.scene, this.manager, this.camera)
    this.instances = new Instances(this.scene, this.manager, './models/instance_montange_null_01.glb')
    this.montagne = new GltfLoader('montagne', './models/montagne.glb', this.scene, this.manager)
    this.collectable = new Collectable(this.inventoryScene, this.manager, this.camera, this.width, this.height)
  }
  addWater () {
    let light
    let waterGeometry = new THREE.PlaneBufferGeometry(10000, 10000)
    light = new THREE.DirectionalLight(0x544d75, 0.8)
    this.scene.add(light)
    this.water = new THREE.Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('textures/waternormals.jpg', function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        }),
        alpha: 1.0,
        sunDirection: light.position.clone().normalize(),
        sunColor: 0xffffff,
        waterColor: 0x544d75,
        distortionScale: 3.7,
        fog: this.scene.fog !== undefined
      }
    )
    this.water.rotation.x = -Math.PI / 2
    this.scene.add(this.water)

    // Skybox
    var sky = new THREE.Sky()
    var uniforms = sky.material.uniforms
    uniforms[ 'turbidity' ].value = 10
    uniforms[ 'rayleigh' ].value = 2
    uniforms[ 'luminance' ].value = 1
    uniforms[ 'mieCoefficient' ].value = 0.1
    uniforms[ 'mieDirectionalG' ].value = 0.8

    this.parameters = {
      distance: 500,
      inclination: 0.1,
      azimuth: 0.4
    }
    var cubeCamera = new THREE.CubeCamera(0.1, 1, 512)
    cubeCamera.renderTarget.texture.generateMipmaps = true
    cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter
    this.scene.background = cubeCamera.renderTarget

    var theta = Math.PI * (this.parameters.inclination - 0.5)
    var phi = 2 * Math.PI * (this.parameters.azimuth - 0.5)
    light.position.x = this.parameters.distance * Math.cos(phi)
    light.position.y = this.parameters.distance * Math.sin(phi) * Math.sin(theta)
    light.position.z = this.parameters.distance * Math.sin(phi) * Math.cos(theta)
    sky.material.uniforms['sunPosition'].value = light.position.copy(light.position)
    this.water.material.uniforms['sunDirection'].value.copy(light.position).normalize()
    cubeCamera.update(this.renderer, sky)
  }

  onClick () {
    let intersected = false
    let intersects = this.raycaster.intersectObjects(this.scene.children)
    intersects.forEach((intersect) => {
      switch (intersect.object.name) {
        case 'cubeTest':
          intersected = true
          console.log('tu as clické sur le cubeTest')
          break
        default:
          intersected = false
          break
      }
    })
  }

  animate () {
    // helpers
    if (this.helpers.stats) this.helpers.stats.begin()
    if (this.helpers.controls) this.helpers.controls.update()

    // update
    this.timeDelta = this.clock.getDelta()
    this.timeElapsed = this.clock.getElapsedTime()

    // update
    // this.waterOld.update(this.timeElapsed)
    this.cube.update(this.timeElapsed)
    this.collectable.update()
    // this.boat.update(this.timeElapsed)
    if (this.water) this.water.material.uniforms[ 'time' ].value += 0.1 / 60.0

    this.render()

    if (this.helpers.stats) this.helpers.stats.end()

    requestAnimationFrame(() => this.animate())
  }
}
