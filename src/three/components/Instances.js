import * as THREE from 'three'
const InstancedMesh = require('three-instanced-mesh')( THREE ) //should replace shaders on first call
import GltfLoader from './GltfLoader'
import dechets from '../../data/instances/dechets.js'

export default class Instances {
    constructor(scene, manager, path) {
        this.scene = scene;
        this.manager = manager;
        this.path = path;

        this.initInstances();
    }

    initInstances() {
        let material = new THREE.MeshPhongMaterial()

        // dechets Glb
        let dechetsPromise = new GltfLoader('dechets', this.path, this.scene, this.manager)
        dechetsPromise.then(geometries => {
            const clusterNodes = new Array(geometries.length).fill(null).map(() => [])

            const e = new THREE.Euler()

            dechets.nodes.forEach(node => {
                const r = Math.floor(Math.random()*clusterNodes.length)
                if (node.extras && node.extras.transformData && node.extras.transformData.rotation && node.extras.transformData.scale && node.extras.transformData.translation) {
                    clusterNodes[r].push(node);
                }
            })
            geometries.forEach((geometry, index) => {
                let cluster = new InstancedMesh(geometry,  material,  clusterNodes[index].length,  true,  false,  true)
                clusterNodes[index].forEach((node, rank) => {
                    const {rotation, scale, translation, eulerOrder} = node.extras.transformData;
                    e.set(rotation[0], rotation[1], rotation[2], eulerOrder)
                    cluster.setQuaternionAt(rank, new THREE.Quaternion().setFromEuler(e))
                    cluster.setPositionAt(rank, new THREE.Vector3(translation[0], translation[1], translation[2]))
                    cluster.setScaleAt(rank, new THREE.Vector3(scale[0], scale[1], scale[2]).multiplyScalar(5))
                })
                cluster.scale.set(0.1, 0.1, 0.1)
                this.scene.add( cluster );
                console.log(cluster, this.scene)
            })

        })
        //console.log(dechets.geometry)
        //let dechetsGeometry = dechets.geometry
        //console.log(dechetsGeometry, dechetsGeometry.length)


    }
}
