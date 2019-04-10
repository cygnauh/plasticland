import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader';

export default class GltfLoaderTest {
    constructor(name, path, scene) {
        this.scene = scene;
        this.name = name;
        this.loader = new GLTFLoader();

        // draco loader
        // see gltf-pipeline

        this.loader.load(
            path,
            (gltf) => {
                gltf.scene.name = this.name
                this.scene.add(gltf.scene)

                console.log(gltf.scene)

                gltf.scene.traverse( (child) => {
                        //console.log(child.material)
                        if (child.isMesh) {
                            // show the count of vertices here
                            child.material.side = 2;
                        }
                    }
                );
            },
            (xhr) => {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            (error) => {
                console.log( 'An error happened' + error );
            }
        );
    }

}
