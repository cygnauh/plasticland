import GLTFLoader from 'three-gltf-loader'
import * as THREE from 'three/src/Three'

export default class GltfLoader {
  constructor (name, path, scene, manager, { posX = 0, posY = 0, posZ = 0, scale = 0.1, found = true }) {
    this.scene = scene
    this.name = name
    this.loader = new GLTFLoader(manager)
    this.gltf = null

    // draco loader
    // see gltf-pipeline

    let flatMaterial = new THREE.MeshPhongMaterial({
      color: (0x81C186),
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    })

    let geometries = []

    let promise = new Promise((resolve, reject) => {
      this.loader.load(path, (gltf) => {
        this.gltf = gltf.scene
        this.gltf.name = this.name
        this.gltf.position.x = posX
        this.gltf.position.y = posY
        this.gltf.position.z = posZ
        // this.gltf.scale.x = scale
        // this.gltf.scale.y = scale
        // this.gltf.scale.z = scale
        this.scene.add(this.gltf)
        this.scene.scale.multiplyScalar(scale)
        this.gltf.traverse(function (child) {
          // console.log(child.material)
          if (child.isMesh) {
            child.material.side = 2
            if (!found) {
              child.material = flatMaterial
            }
            let geometry = child.geometry
            geometries.push(geometry)
          }
        })
        resolve(geometries)
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      (error) => {
        console.log('An error happened' + error)
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
