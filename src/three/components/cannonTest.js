import * as CANNON from 'cannon'
import * as THREE from 'three'

export default class CannonTest {
  constructor (scene, controls) {
    this.scene = scene
    this.transformControls = controls

    this.materials = {
      solid: new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      }),
      colliding: new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5
      })
    }

    this.initCube()
    this.initCubeBody()
  }

  initCube () {
    this.geom = new THREE.BoxGeometry(0.75, 0.75, 0.75)
    this.cube = new THREE.Mesh(this.geom, this.materials.solid)
    this.cube.position.set(2, 2, 1.74)
    this.scene.add(this.cube)

    this.cubeTwo = new THREE.Mesh(this.geom, this.mat)
    this.cubeTwo.position.set(5, 2, 1.74)
    this.scene.add(this.cubeTwo)

    this.transformControls.attach(this.cube)
    this.scene.add(this.transformControls)
  }

  initCubeBody () {
    this.setupWorld()
    this.cubeBody = this.addPhysicalBody(this.cube, { mass: 1 })
    this.cubeBody2 = this.addPhysicalBody(this.cubeTwo, { mass: 1 })

    // register for collide events
    this.cubeBody.addEventListener('collide', (e) => {
      console.log('Collision!' + e)
    })
  }

  setupWorld () {
    // Setup our world
    this.world = new CANNON.World()
    this.world.gravity.set(0, 0, -9.82) // m/s²
    this.world.broadphase = new CANNON.NaiveBroadphase()
  }

  addPhysicalBody (mesh, bodyOptions) {
    mesh.geometry.computeBoundingBox()
    let box = mesh.geometry.boundingBox
    let shape = new CANNON.Box(new CANNON.Vec3(
      (box.max.x - box.min.x) / 2,
      (box.max.y - box.min.y) / 2,
      (box.max.z - box.min.z) / 2
    ))

    let body = new CANNON.Body(bodyOptions)
    body.addShape(shape)
    body.position.copy(mesh.position)
    body.computeAABB()
    body.collisionResponse = false // collision response: objects (don't) move when they collide
    body.mesh = mesh // keep a reference to the mesh so we can update its properties later
    this.world.addBody(body)
    return body
  }

  // basicExample () {
  //   // Create a sphere : dynamic
  //   let radius = 1
  //   this.cubeBody = new CANNON.Body({
  //     mass: 5, // kg
  //     position: new CANNON.Vec3(0, 0, 0),
  //     shape: new CANNON.Sphere(radius)
  //   })
  //   this.world.addBody(this.cubeBody)
  //
  //   // Create a plane : static
  //   this.groundBody = new CANNON.Body({
  //     mass: 0,
  //     shape: new CANNON.Plane()
  //   })
  //   this.world.add(this.groundBody)
  // }

  update () {
    let timeStep = 1.0 / 60.0 // seconds
    for (let i = 0; i < 60; ++i) {
      this.world.step(timeStep)

      // move the cube body with mouse controls
      this.cubeBody.position.copy(this.cube.position)

      // reset materials
      this.cube.material = this.materials.solid
      this.cubeTwo.material = this.materials.solid

      this.world.contacts.forEach((contact) => {
        console.log(contact)
        contact.bi.mesh.material = this.materials.colliding
        contact.bj.mesh.material = this.materials.colliding
        this.cube.material = this.materials.solid
      })

      // console.log(this.cubeBody.position.x, this.cubeBody.position.y, this.cubeBody.position.z)
    }
  }
}
