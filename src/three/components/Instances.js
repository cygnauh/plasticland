import * as THREE from 'three';
const InstancedMesh = require('three-instanced-mesh')( THREE ); //should replace shaders on first call
import GltfLoader from './GltfLoader';

export default class Instances {
    constructor(scene, manager, path) {
        this.scene = scene;
        this.manager = manager;
        this.path = path;

        this.initInstances();
    }

    initInstances() {
        //geometry to be instanced
        let boxGeometry = new THREE.BoxBufferGeometry(2,2,2,1,1,1)
        console.log(boxGeometry)
        let dechets = new GltfLoader('dechets', this.path, this.scene, this.manager)
        console.log(dechets)

        //material that the geometry will use
        let material = new THREE.MeshPhongMaterial()

        //the instance group
        let cluster = new InstancedMesh(
            boxGeometry,                   //this is the same
            material,
            10000,                       //instance count
            false,                       //is it dynamic
            false,                        //does it have color
            true,                        //uniform scale, if you know that the placement function will not do a non-uniform scale, this will optimize the shader
        )

        const scale = 10

        for (let i = 0; i < 100; i++) {
            cluster.setQuaternionAt(i, new THREE.Quaternion())
            cluster.setPositionAt(i, new THREE.Vector3().set(Math.random() * scale, Math.random() * scale, Math.random() * scale))
            cluster.setScaleAt(i, new THREE.Vector3().set(1,1,1))
        }

        this.scene.add( cluster );
    }
}
