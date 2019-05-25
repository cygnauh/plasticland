import * as THREE from 'three'
import Water from '../three-examples/Water'
import Sky from '../three-examples/Sky'

export default class Environment extends THREE.Object3D {
  constructor (scene, renderer, light) {
    super()
    this.scene = scene
    this.renderer = renderer
    this.light = light

    this.initPlaneGeometry(100, 100, 20, 20)
    this.initWater()
    this.initSkybox()
    this.initCubeCamera()
    this.updateGeom()
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
        sunDirection: new THREE.Vector3(0, 0, 0),
        sunColor: 0xFBE387,
        waterColor: 0x394482,
        distortionScale: 0.0,
        fog: this.scene.fog !== undefined
      }
    )
    this.water.rotation.x = -Math.PI / 2

    // this.scene.add(this.water)
  }

  initSkybox () {
    this.sky = new THREE.Sky()
    let uniforms = this.sky.material.uniforms

    uniforms[ 'turbidity' ].value = 5.0
    uniforms[ 'rayleigh' ].value = 2.0
    uniforms[ 'luminance' ].value = 1.0
    uniforms[ 'mieCoefficient' ].value = 0.0
    uniforms[ 'mieDirectionalG' ].value = 0.4
  }

  updateGeom () {
    this.parameters = {
      distance: 10,
      inclination: 0.08,
      azimuth: 0.4
    }

    let theta = Math.PI * (this.parameters.inclination - 0.5)
    let phi = 2 * Math.PI * (this.parameters.azimuth - 0.5)

    this.light.position.x = this.parameters.distance * Math.cos(phi)
    this.light.position.y = this.parameters.distance * Math.sin(phi) * Math.sin(theta)
    this.light.position.z = this.parameters.distance * Math.sin(phi) * Math.cos(theta)

    this.updateSky()
    this.updateWater()
    this.updateCubeCamera()
  }

  initCubeCamera () {
    this.cubeCamera = new THREE.CubeCamera(0.1, 1, 512)
    this.cubeCamera.renderTarget.texture.generateMipmaps = true
    this.cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter
    this.scene.background = this.cubeCamera.renderTarget
  }

  updateSky () {
    this.sky.material.uniforms['sunPosition'].value = this.light.position.copy(this.light.position)
  }

  updateWater () {
    this.water.material.uniforms['sunDirection'].value.copy(this.light.position).normalize()
  }

  updateCubeCamera () {
    this.cubeCamera.update(this.renderer, this.sky)
  }

  update (time) {
    this.water.material.uniforms['time'].value = time / 10
  }
}
