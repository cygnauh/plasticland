import * as THREE from 'three'
import Helpers from './components/Helpers'

export default class Engine {
  constructor (canvas) {
    this.initCanvas(canvas)
    this.initScene()
    this.initInventoryScene()
    this.initLoadingManager()
    this.addEventListeners()
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
    this.scene.name = 'scene1'
    window.scene = this.scene
    window.THREE = THREE

    // camera
    this.camera = new THREE.PerspectiveCamera(65, this.width / this.height, 0.01, 10000)
    this.camera.position.set(0, 1, 0)

    // clock
    this.clock = new THREE.Clock()
    this.timeDelta = 0
    this.timeElapsed = 0

    // helpers
    this.helpers = new Helpers(this.scene, this.camera)

    // light
    this.ambiantlight = new THREE.AmbientLight(0x404040)
    this.spotlight = new THREE.SpotLight(0x404040)
    this.spotlight.position.set(100, 1000, 100)

    this.scene.add(this.ambiantlight)
    this.scene.add(this.spotlight)

    this.pointLight = new THREE.PointLight(0xffffff, 2, 15)
    this.pointLight.position.set(0, 6, 0)
    this.scene.add(this.pointLight)
    this.helpers.pointLightHelper(this.pointLight, 1) // light helper
    // fog
    this.scene.fog = new THREE.Fog(0x0B2641, 1, 40)

    // mouse
    this.mouse = new THREE.Vector2(0, 0)

    // raycaster
    this.raycaster = new THREE.Raycaster()

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x0B2641, 1)

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
    // this.helpers = new Helpers(this.inventoryScene, this.inventoryCamera)
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
    document.addEventListener('click', (e) => this.onClick(e), false)
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

  render () {
    this.raycaster.setFromCamera(this.mouse, this.camera)

    if (!this.displayInventory) {
      window.scene = this.scene
      this.renderer.render(this.scene, this.camera)
    } else {
      window.scene = this.inventoryScene
      this.renderer.render(this.inventoryScene, this.inventoryCamera)
    }
  }
}
