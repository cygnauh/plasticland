import * as store from '../../store/index'
import GltfLoaderRefactored from './GltfLoaderRefactored'

export default class ObjectsToCollect {
  constructor (scene, manager, raycaster) {
    this.scene = scene
    this.manager = manager
    this.raycaster = raycaster
    this.array = []

    this.initCollectables()
  }

  initCollectables () {
    let objects = store.default.state.objects
    objects.forEach((object) => {
      let mesh = new GltfLoaderRefactored(object.name, object.model, this.scene, this.manager, { posX: object.x, posY: 0, posZ: object.z, scale: 10, addToScene: true })
      this.array.push(mesh)
    })
  }

  calculateSurface (x, z, uTime) {
    let y = 0.0
    let scale = 10.0
    y +=
      (Math.sin((x * 1.0) / scale + uTime * 1.0) +
        Math.sin((x * 2.3) / scale + uTime * 1.5) +
        Math.sin((x * 3.3) / scale + uTime * 0.4)) /
      4.0
    y +=
      (Math.sin((z * 0.2) / scale + uTime * 1.8) +
        Math.sin((z * 1.8) / scale + uTime * 1.8) +
        Math.sin((z * 2.8) / scale + uTime * 0.8)) /
      2.0
    return y
  }

  onClick () {
    if (this.array.length > 0) {
      let intersects = this.raycaster.intersectObjects(this.scene.children)
      intersects.forEach((intersect) => {
        // console.log(intersect)
        // if (intersect.object.type === 'mesh') {
        switch (intersect.object.name) {
          case 'starbucks':
            store.default.commit('objectFound', 1)
            store.default.commit('setCinematicObject', true)
            console.log(store.default.state.displayCinematicObject)
            break
          case 'carrefour':
            store.default.commit('objectFound', 2)
            store.default.commit('setCinematicObject', true)
            break
          case 'cocacola':
            store.default.commit('objectFound', 3)
            store.default.commit('setCinematicObject', true)
            break
          case 'gestespropres':
            store.default.commit('objectFound', 4)
            store.default.commit('setCinematicObject', true)
            break
          case 'nestle':
            store.default.commit('objectFound', 5)
            store.default.commit('setCinematicObject', true)
            break
          case 'final':
            store.default.commit('objectFound', 6)
            store.default.commit('setCinematicObject', true)
              break
          default:
            break
        }
        // }
      })
    }
  }

  update (time) {
    let y = this.calculateSurface(10, 10, time)

    if (this.array.length > 0) {
      this.array.forEach(collectable => {
        collectable.then(response => {
          response.meshes.forEach(mesh => {
            mesh.position.y = y
            mesh.rotation.y = Math.sin(time) / 3
            mesh.rotation.z = mesh.rotation.x = Math.sin(time) / 4
          })
        })
      })
    }
  }
}
