import GLTFLoader from 'three-gltf-loader';

export default class GltfLoader {
    constructor(name, path, scene, manager) {
        this.scene = scene
        this.name = name
        this.loader = new GLTFLoader(manager)

        // draco loader
        // see gltf-pipeline

        let geometries = []
        console.log(path)
        let promise = new Promise((resolve, reject) => {
            this.loader.load(path, (gltf) => {
                gltf.scene.name = this.name
                this.scene.add(gltf.scene)

                this.scene.scale.multiplyScalar(0.1)

                //firstGeometry = gltf.scene.children[0].children[0]
                //console.log(firstGeometry)
                console.log(gltf)
                gltf.scene.traverse( function (child)  {
                    //console.log(child.material)
                    if (child.isMesh) {

                        // show the count of vertices here
                        child.material.side = 2
                        let geometry= child.geometry
                        geometries.push(geometry)
                        //console.log(geometries)
                    }
                });
                resolve(geometries)
            },
            (xhr) => {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
            },
            (error) => {
                console.log( 'An error happened' + error )
                reject(new Error("there is an error"))
            })
        })

        return promise;
    }

    destroy() {
        let gltf = this.scene.getObjectByName(this.name)
        this.scene.remove(gltf)
    }

}
