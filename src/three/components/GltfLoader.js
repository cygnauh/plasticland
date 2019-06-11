import * as THREE from 'three'
import GLTFLoader from '../three-examples/loader/GLTFLoader'

export default class GltfLoader {
  constructor (name, path, scene, manager, { posX = 0, posY = 0, posZ = 0, scale = 1, found = true, addToScene = true, rotateY = 0 }) {
    this.scene = scene
    this.name = name
    this.loader = new THREE.GLTFLoader(manager)
    this.gltf = null

    let flatMaterial = new THREE.MeshBasicMaterial({
      color: (0x3b3c55)
      // opacity: 0.2
      // blending: THREE.AdditiveBlending
    })

    let geometries = []
    let meshes = []

    let promise = new Promise((resolve, reject) => {
      this.loader.load(path, (gltf) => {
        this.gltf = gltf.scene // TODO fix and replace, gltf.scene.children[0] to get de meshes
        this.gltf.name = name
        this.gltf.position.x = posX
        this.gltf.position.y = posY
        this.gltf.position.z = posZ
        this.gltf.scale.x = scale
        this.gltf.scale.y = scale
        this.gltf.scale.z = scale
        this.gltf.rotation.y = rotateY
        // this.gltf.castShadow = true
        if (gltf.animations && gltf.animations.length) {
          this.mixer = new THREE.AnimationMixer(gltf.scene)
          for (let i = 0; i < gltf.animations.length; i++) {
            let animation = gltf.animations[i]
            let action = this.mixer.clipAction(animation)
            action.startAt(10)
            action.setLoop(THREE.LoopOnce)
            action.clampWhenFinished = true
            action.enabled = true
            action.play()
          }
        }
        if (addToScene) {
          this.scene.add(this.gltf)
        }
        // this.scene.scale.multiplyScalar(scale)
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
        meshes.push(this.gltf)
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
