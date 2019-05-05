import GLTFLoader from 'three-gltf-loader'

export default class GltfLoader {
  constructor (name, path, scene, manager) {
    this.scene = scene
    this.name = name
    this.loader = new GLTFLoader(manager)
    this.gltf = null
    // draco loader
    // see gltf-pipeline
    // let scale = 1
    let geometries = []
    // let scaleFactor = scale
    let promise = new Promise((resolve, reject) => {
      this.loader.load(path, (gltf) => {
        this.gltf = gltf.scene
        this.gltf.name = this.name
        console.log(this.gltf)
        this.scene.add(this.gltf)
        this.scene.scale.multiplyScalar(0.1)

        // console.log(this.gltf)
        this.gltf.traverse(function (child) {
          // console.log(child.material)
          if (child.isMesh) {
            // show the count of vertices here
            child.material.side = 2
            // child.scale.set(scaleFactor, scaleFactor, scaleFactor)
            let geometry = child.geometry
            geometries.push(geometry)
            // console.log(geometries)
          }
        })
        resolve(geometries)
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      (error) => {
        // console.log('An error happened' + error)
        reject(new Error('there is an error'))
      })
    })

    return promise
  }

  destroy () {
    let gltf = this.scene.getObjectByName(this.name)
    this.scene.remove(gltf)
  }
}
