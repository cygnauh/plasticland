import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'

export default class GltfLoaderTest {
  constructor (name, path, scene, manager, posX, posY, posZ, rotateX) {
    this.scene = scene
    this.name = name
    this.loader = new GLTFLoader(manager)
    this.gltf = null
    // draco loader
    // see gltf-pipeline

    this.root = null

    this.loader.load(
      path,
      gltf => {
        this.gltf = gltf.scene
        this.gltf.name = this.name
        this.scene.add(this.gltf)
        this.gltf.position.x = posX
        this.gltf.position.y = posY
        this.gltf.position.z = posZ
        this.gltf.rotateY(rotateX)
        this.gltf.traverse(child => {
          // console.log(child.material)
          if (child.isMesh) {
            // show the count of vertices here
            child.material.side = 2
          }
        })
      },
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      error => {
        console.log('An error happened' + error)
      }
    )
    console.log(this.loader)
  }
}
