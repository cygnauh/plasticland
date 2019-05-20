import * as THREE from 'three'
import GltfLoader from './GltfLoader'
// import GltfLoader from './GltfLoaderRefactored'
import dechets from '../../data/instances/dechetsNewOpti.js'

const InstancedMesh = require('three-instanced-mesh')(THREE) // should replace shaders on first call

export default class Instances {
  constructor (scene, manager, path) {
    this.scene = scene
    this.manager = manager
    this.path = path
    this.clusterArray = []
    this.initInstances()
  }

  initInstances () {
    let material = new THREE.MeshPhongMaterial()

    // dechets Glb
    this.dechetsPromise = new GltfLoader('dechets', this.path, this.scene, this.manager, { addToScene: false })
    this.dechetsPromise.then(response => {
      var geometries = response.geometries
      const clusterNodes = new Array(geometries.length).fill(null).map(() => [])
      const e = new THREE.Euler()

      // dechets positions from null
      dechets.translation.forEach(pos => {
        const r = Math.floor(Math.random() * clusterNodes.length)
        if (pos) {
          clusterNodes[r].push(pos)
        }
      })

      geometries.forEach((geometry, index) => {
        let matTest = new THREE.MeshPhongMaterial({
          color: 0xF8DDBA
        })

        let cluster = new InstancedMesh(geometry, matTest, clusterNodes[index].length, true, false, true)
        clusterNodes[index].forEach((pos, rank) => {
          // console.log(pos, rank)
          let random = Math.random()
          cluster.setQuaternionAt(rank, new THREE.Quaternion().setFromEuler(new THREE.Euler(
            Math.random() * 2 * Math.PI,
            Math.random() * 2 * Math.PI,
            Math.random() * 2 * Math.PI
          )))
          cluster.setPositionAt(rank, new THREE.Vector3(pos[0], pos[1], pos[2]).multiplyScalar(1))
          cluster.setScaleAt(rank, new THREE.Vector3(random, random, random).multiplyScalar(1))
        })

        this.clusterArray.push(cluster)
      })
    })
  }
}
