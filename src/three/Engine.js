import * as THREE from 'three'
import Helpers from './components/Helpers'
import Water from './components/Water'
import Boat from './components/Boat'

export default class Engine {
    constructor(canvas) {
        this.initCanvas(canvas)
        this.initScene()
        this.addGeometry()
        this.initLoadingManager()
        this.addEventListeners()
        this.animate()
    }

    initCanvas(canvas) {
        this.canvas = canvas
        this.setSize()
    }

    setSize() {
        this.width = this.canvas.width = window.innerWidth
        this.height = this.canvas.height = window.innerHeight
    }

    initScene(){
        // scene
        this.scene = new THREE.Scene()

        // camera
        this.camera = new THREE.PerspectiveCamera( 65, this.width / this.height, 0.1, 10000 )
        this.camera.position.set(0, 4, 20)

        // clock
        this.clock = new THREE.Clock()
        this.timeDelta = 0
        this.timeElapsed = 0

        // helpers
        this.helpers = new Helpers(this.scene, this.camera)

        // renderer
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true, alpha: true})
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setClearColor(0xffffff)

        // gltf lighting
        this.renderer.gammaOutput = true
        this.renderer.gammaFactor = 2.2
        this.renderer.gammaOutput = true
        this.renderer.gammaFactor = 2.2
    }

    addGeometry() {
        this.water = new Water(this.scene);
        this.boat = new Boat(this.scene);
    }

    initLoadingManager() {
        this.manager = new THREE.LoadingManager()
        this.manager.onStart = (url, itemsLoaded, itemsTotal) => {
            console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
        };
        this.manager.onLoad = () => {
            console.log( 'Loading complete!')
        };
        this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
        };
        this.manager.onError = (url) => {
            console.log( 'There was an error loading ' + url )
        };
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.resize())
    }

    resize() {
        this.setSize();

        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.width, this.height)
    }

    animate() {
        // helpers
        this.helpers.stats ? this.helpers.stats.begin() : null
        this.helpers.controls ? this.helpers.controls.update() : null

        // update
        this.timeDelta = this.clock.getDelta()
        this.timeElapsed = this.clock.getElapsedTime()

        // update water
        this.water.update(this.timeElapsed)
        this.boat.update(this.timeElapsed)

        this.render()

        this.helpers.stats ? this.helpers.stats.end() : null

        requestAnimationFrame(() => this.animate())
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }
}
