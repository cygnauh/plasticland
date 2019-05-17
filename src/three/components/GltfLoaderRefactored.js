import * as THREE from 'three'
import GLTFLoader from '../utils/GLTFLoader'

export default class GltfLoaderRefactored {
  constructor (name, path, scene, manager, { posX = 0, posY = 0, posZ = 0, scale = 1, found = true, addToScene = true, rotateY = 0 }) {
    this.scene = scene
    this.name = name
    this.loader = new THREE.GLTFLoader(manager)
    this.gltf = null

    // draco loader
    // see gltf-pipeline

    let flatMaterial = new THREE.MeshPhongMaterial({
      color: (0x81C186),
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    })

    let geometries = []
    let meshes = []

    let promise = new Promise((resolve, reject) => {
      this.loader.load(path, (gltf) => {
        this.gltf = gltf.scene // TODO fix and replace, gltf.scene.children[0] to get de meshes
        this.gltf.name = name
        // this.gltf.castShadow = true
        if (addToScene) {
          this.scene.add(this.gltf)
        }
        // this.scene.scale.multiplyScalar(scale)
        this.gltf.traverse(function (child) {
          // console.log(child.material)
          if (child.isMesh) {
            let scale1 = 0.1
            // child.position.x = posX
            // child.position.y = posY
            // child.position.z = posZ
            child.scale.x = scale1
            child.scale.y = scale1
            child.scale.z = scale1
            child.rotation.x = 180
            child.rotation.y = rotateY
            child.material.side = 2
            meshes.push(child)
            // if (!found) {
            //   child.material = flatMaterial
            // }
            let geometry = child.geometry
            geometries.push(geometry)
          }
        })
		    // console.log(this.gltf)
        
        resolve({
          geometries: geometries,
          meshes: meshes
        })
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      },
      (error) => {
        reject(new Error('there is an error' + error))
      })
    })

    return promise
  }

  destroy () {
    let gltf = this.scene.getObjectByName(this.name)
    this.scene.remove(gltf)
  }
}
