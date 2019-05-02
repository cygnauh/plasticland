import Engine from './Engine'

import Water from './components/Water'
import CubeTest from './components/CubeTest'
import Collectable from './components/Collectable'
// import Boat from './components/Boat'
// import Instances from './components/Instances'
// import GltfLoader from './components/GltfLoader'

export default class App extends Engine {
  constructor (canvas) {
    super(canvas)

    this.addGeometry()
    this.animate()
  }

  addGeometry () {
    this.water = new Water(this.scene)
    this.cube = new CubeTest(this.scene)
    // this.boat = new Boat(this.scene, this.manager, this.camera)
    // this.instances = new Instances(this.scene, this.manager, './models/instance_montange_null_01.glb')
    // this.montagne = new GltfLoader('montagne', './models/montagne.glb', this.scene, this.manager, { scale : 0.1})
    this.collectable = new Collectable(this.inventoryScene, this.manager, this.camera, this.width, this.height)
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
    this.water.update(this.timeElapsed)
    this.cube.update(this.timeElapsed)
    this.collectable.update()
    // this.boat.update(this.timeElapsed)

    this.render()

    if (this.helpers.stats) this.helpers.stats.end()

    requestAnimationFrame(() => this.animate())
  }
}
