import * as THREE from 'three'
import Water from '../three-examples/Water'
import Sky from '../three-examples/Sky'

export default class WaterV2 extends THREE.Object3D {
  constructor (scene, renderer) {
    super()
    this.scene = scene
    this.renderer = renderer

    this.initLight()
    this.initPlaneGeometry(10000, 10000, 20, 20)
    this.initWater()
    this.initSkybox()
    this.lightUpdate()
  }

  initLight () {
    this.light = new THREE.DirectionalLight(0x544d75, 0.8)
    this.scene.add(this.light)
  }

  initPlaneGeometry (width, height, widthSegments, heightSegments) {
    this.geometry = new THREE.PlaneBufferGeometry(width, height, widthSegments, heightSegments)
  }

  initWater () {
    this.water = new THREE.Water(
      this.geometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('textures/waternormals.jpg', (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        }),
        alpha: 1.0,
        sunDirection: this.light.position.clone().normalize(),
        sunColor: 0xffffff,
        waterColor: 0x544d75,
        distortionScale: 3.7,
        fog: this.scene.fog !== undefined
      }
    )
    this.water.rotation.x = -Math.PI / 2
    this.scene.add(this.water)
  }

  initSkybox () {
    this.sky = new THREE.Sky()
    let uniforms = this.sky.material.uniforms

    uniforms[ 'turbidity' ].value = 10
    uniforms[ 'rayleigh' ].value = 2
    uniforms[ 'luminance' ].value = 1
    uniforms[ 'mieCoefficient' ].value = 0.1
    uniforms[ 'mieDirectionalG' ].value = 0.8
  }

  lightUpdate () {
    this.parameters = {
      distance: 500,
      inclination: 0.1,
      azimuth: 0.4
    }

    this.cubeCamera = new THREE.CubeCamera(0.1, 1, 512)
    this.cubeCamera.renderTarget.texture.generateMipmaps = true
    this.cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter
    this.scene.background = this.cubeCamera.renderTarget

    let theta = Math.PI * (this.parameters.inclination - 0.5)
    let phi = 2 * Math.PI * (this.parameters.azimuth - 0.5)

    this.light.position.x = this.parameters.distance * Math.cos(phi)
    this.light.position.y = this.parameters.distance * Math.sin(phi) * Math.sin(theta)
    this.light.position.z = this.parameters.distance * Math.sin(phi) * Math.cos(theta)

    this.sky.material.uniforms['sunPosition'].value = this.light.position.copy(this.light.position)
    this.water.material.uniforms['sunDirection'].value.copy(this.light.position).normalize()

    this.cubeCamera.update(this.renderer, this.sky)
  }

  update (time) {
    this.water.material.uniforms['time'].value += 0.1 / 60.0
  }
}
