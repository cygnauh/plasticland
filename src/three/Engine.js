import * as THREE from 'three'
import Helpers from './components/Helpers'
import Instances from './components/Instances'
import GltfLoader from './components/GltfLoader'
// import Water from './components/WaterOld'
import Water from './components/Water'
import Sky from './components/Sky'
import Boat from './components/Boat'
import CubeTest from './components/CubeTest'
import Collectable from './components/Collectable'

export default class Engine {
  constructor (canvas) {
    this.initCanvas(canvas)
    this.initScene()
    this.initInventoryScene()
    this.initLoadingManager()
    this.addGeometry()
    this.addWater()
    this.addEventListeners()
    this.animate()
    this.displayInventory = false
  }

  initCanvas (canvas) {
    this.canvas = canvas
    this.setSize()
  }

  setSize () {
    this.width = this.canvas.width = window.innerWidth
    this.height = this.canvas.height = window.innerHeight
  }

  initScene () {
    // scene
    this.scene = new THREE.Scene()
    this.scene.name = 'scene'
    window.scene = this.scene
    window.THREE = THREE

    // camera
    this.camera = new THREE.PerspectiveCamera(65, this.width / this.height, 0.01, 10000)
    this.camera.position.set(0, 1, 0)

    // clock
    this.clock = new THREE.Clock()
    this.timeDelta = 0
    this.timeElapsed = 0

    // light
    this.ambiantlight = new THREE.AmbientLight(0x404040)
    this.spotlight = new THREE.SpotLight(0x404040)
    this.spotlight.position.set(100, 1000, 100)

    this.scene.add(this.ambiantlight)
    this.scene.add(this.spotlight)

    // mouse
    this.mouse = new THREE.Vector2(0, 0)

    // helpers
    this.helpers = new Helpers(this.scene, this.camera)

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xffffff, 0)

    // gltf lighting
    this.renderer.gammaOutput = true
    this.renderer.gammaFactor = 2.2
  }
  initInventoryScene () {
    this.inventoryScene = new THREE.Scene()
    // this.inventoryScene.background = new THREE.Color(0xff0000)
    this.inventoryScene.name = 'scene2'
    this.inventoryScene.position.y = -5
    // camera
    this.inventoryCamera = new THREE.PerspectiveCamera(
      5,
      this.width / this.height,
      1,
      10000
    )
    this.inventoryCamera.position.set(0, 10, 70)
    this.inventoryScene.add(this.ambiantlight)
    this.inventoryScene.add(this.spotlight)
    // helpers
    this.helpers = new Helpers(this.inventoryScene, this.inventoryCamera)
  }

  addGeometry () {
    this.collectable = new Collectable(this.inventoryScene, this.manager, this.camera, this.width, this.height)
    // this.water = new Water(this.scene)
    this.cube = new CubeTest(this.scene)
    this.boat = new Boat(this.scene, this.manager, this.camera)
    this.instances = new Instances(this.scene, this.manager, './models/instance_montange_null_01.glb')
    this.montagne = new GltfLoader('montagne', './models/montagne.glb', this.scene, this.manager)
  }
  addWater () {
    let water, light
    let waterGeometry = new THREE.PlaneBufferGeometry(10000, 10000)
    light = new THREE.DirectionalLight(0xffffff, 0.8)
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
        sunDirection: this.spotlight.position.clone().normalize(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
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
    uniforms[ 'mieCoefficient' ].value = 0.005
    uniforms[ 'mieDirectionalG' ].value = 0.8

    this.parameters = {
      distance: 400,
      inclination: 0.278,
      azimuth: 0.248
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

  initLoadingManager () {
    this.manager = new THREE.LoadingManager()
    this.manager.onStart = (url, itemsLoaded, itemsTotal) => {
      // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
    }
    this.manager.onLoad = () => {
      // console.log('Loading complete!')
    }
    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
    }
    this.manager.onError = (url) => {
      // console.log('There was an error loading ' + url)
    }
  }

  addEventListeners () {
    window.addEventListener('resize', () => this.resize())
    window.addEventListener('mousemove', (e) => this.onMouseMove(e))
  }

  resize () {
    this.setSize()
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  setDisplayInventory (value) {
    this.displayInventory = value
  }

  onMouseMove (e) {
    this.mouse.x = (e.clientX / this.renderer.domElement.clientWidth) * 2 - 1
    this.mouse.y = -(e.clientY / this.renderer.domElement.clientHeight) * 2 + 1
  }

  animate () {
    // helpers

    if (this.helpers.stats) this.helpers.stats.begin()
    if (this.helpers.controls) this.helpers.controls.update()

    // update
    this.timeDelta = this.clock.getDelta()
    this.timeElapsed = this.clock.getElapsedTime()

    // update water
    // this.water.update(this.timeElapsed)
    this.cube.update(this.timeElapsed)
    this.boat.update(this.timeElapsed)
    this.collectable.update()
    this.water.material.uniforms[ 'time' ].value += 0.1 / 60.0;
    this.render()

    if (this.helpers.stats) this.helpers.stats.end()

    requestAnimationFrame(() => this.animate())
  }

  render () {
    if (!this.displayInventory) {
      window.scene = this.scene
      this.renderer.render(this.scene, this.camera)
    } else {
      window.scene = this.inventoryScene
      this.renderer.render(this.inventoryScene, this.inventoryCamera)
    }
  }
}
