import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'

export default class GltfLoaderTest {
  constructor (name, path, manager, posX, posY, posZ, scale, rotateX, found) {
    // this.scene = scene
    this.name = name
    this.loader = new GLTFLoader(manager)
    this.gltf = null

    // draco loader
    // see gltf-pipeline

    this.root = null
    this.flatMaterial = new THREE.MeshPhongMaterial({
      color: (0x81C186),
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    })

    this.loader.load(
      path,
      gltf => {
        this.gltf = gltf.scene
        this.gltf.name = this.name
        // this.scene.add(this.gltf)
        this.gltf.position.x = posX
        this.gltf.position.y = posY
        this.gltf.position.z = posZ
        this.gltf.scale.x = scale
        this.gltf.scale.y = scale
        this.gltf.scale.z = scale
        this.gltf.rotateY(rotateX)
        this.gltf.traverse(child => {
          // console.log(child.material)
          if (child.isMesh) {
            // show the count of vertices here
            child.material.side = 2
            if (!found) {
              child.material = this.flatMaterial
            }
          }
        })
      },
      xhr => {
        // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      error => {
        console.log('An error happened' + error)
      }
    )
  }
}
