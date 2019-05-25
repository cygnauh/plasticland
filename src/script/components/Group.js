// import * as THREE from 'three/src/Three'
//
// export default class Group extends THREE.Group {
//   constructor (scene, instances, mountain, boat, cube) {
//     super()
//
//     this.scene = scene
//     this.children = []
//
//     this.group = new THREE.Group()
//     this.group.name = 'xpGroup'
//
//     this.addToGroup(instances, mountain, boat, cube)
//     console.log(this.group)
//   }
//
//   addToGroup (instances, mountain, boat, cube) {
//     instances.dechetsPromise.then(() => {
//       instances.clusterArray.forEach(element => {
//         this.children.push(element)
//       })
//     })
//
//     mountain.then(response => {
//       response.meshes.forEach(element => {
//         this.children.push(element)
//       })
//     })
//
//     boat.object.then(response => {
//       response.meshes.forEach(element => {
//         this.children.push(element)
//       })
//     })
//
//     this.group.add(cube.object)
//     this.group.add(this.children)
//     this.scene.add(this.group)
//   }
// }
