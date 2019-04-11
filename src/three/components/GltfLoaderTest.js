import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'

export default class GltfLoaderTest {
    constructor(name, path, scene, manager, posX, posY, posZ, rotateX) {
        this.scene = scene
        this.name = name
        this.loader = new GLTFLoader(manager)

        // draco loader
        // see gltf-pipeline

        this.root = null;

        this.loader.load(
            path,
            (gltf) => {
                this.root = gltf.scene;

                gltf.scene.name = this.name
                this.scene.add(gltf.scene)

                console.log(gltf.scene)
                gltf.scene.position.x = posX
                gltf.scene.position.y = posY
                gltf.scene.position.z = posZ
                gltf.scene.rotateY(rotateX)


                console.log('rest')

                gltf.scene.traverse( (child) => {
                        //console.log(child.material)
                        if (child.isMesh) {
                            // show the count of vertices here
                            child.material.side = 2
                        }
                    }
                )
            },
            (xhr) => {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
            },
            (error) => {
                console.log( 'An error happened' + error )
            }
        )
    }
}
