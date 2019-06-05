import * as THREE from 'three'
import GLTFLoader from '../three-examples/loader/GLTFLoader'
import { textureCubeMap } from '../utils/utilsScene'

export default class GltfLoaderRefactored {
  constructor (name, path, scene, manager, {
    posX = 0,
    posY = 0,
    posZ = 0,
    scale = 1,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    found = true,
    addToScene = true
  }) {
    if (addToScene) this.scene = scene
    this.loader = new THREE.GLTFLoader(manager)
    this.gltf = null
    let gltfChild = null
    let childName = name
    let geometries = []
    let materials = []
    let meshes = []

    let promise = new Promise((resolve, reject) => {
      this.loader.load(path, (gltf) => {
        this.gltf = gltf.scene
        this.gltf.name = name
        // this.gltf.castShadow = true
        let textureCube = new THREE.CubeTextureLoader().load(textureCubeMap())
        textureCube.mapping = THREE.CubeReflectionMapping
        textureCube.format = THREE.RGBFormat
        this.gltf.traverse(function (child) {
          if (child.isMesh) {
            gltfChild = child
            child.position.x = posX
            child.position.y = posY
            child.position.z = posZ
            child.scale.x = scale
            child.scale.y = scale
            child.scale.z = scale
            // child.rotation.x = rotateX
            // child.rotation.y = rotateY
            // child.rotation.z = rotateZ
            child.material.side = 2
            child.material.envMap = textureCube
            child.material.needsUpdate = true
            child.name = childName
            meshes.push(child)
            let geometry = child.geometry
            geometries.push(geometry)
            materials.push({ name: child.name, material: child.material })
          }
        })
        if (addToScene && gltfChild && this.scene) {
          this.scene.add(gltfChild)
        }
        resolve({
          geometries: geometries,
          materials: materials,
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
    if (this.scene) {
	    let gltf = this.scene.getObjectByName(this.name)
	    this.scene.remove(gltf)
    }
  }
}
