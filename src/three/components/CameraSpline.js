import * as THREE from 'three'

export default class CameraSpline {
  constructor (scene, camera) {
    this.scene = scene
    this.camera = camera
    this.percentageCamera = 0

    this.initSpline()
  }

  initSpline () {
    let points = [
      [33.29779815673828, -1625.17333984375, 0.09950000047683716],
      [31.629199981689453, -1193.315185546875, 0.09950000047683716],
      [-54.100799560546875, -810.0264282226562, 0.09950000047683716],
      [100.6720962524414, -527.3427734375, 0.09950000047683716],
      [82.0342025756836, -169.00909423828125, 0.09950000047683716],
      [-51.996498107910156, 363.8955993652344, 0.09950000047683716]
    ]

    for (let i = 0; i < points.length; i++) {
      let x = points[i][0]
      let y = points[i][1]
      let z = points[i][2]
      points[i] = new THREE.Vector3(x, z, -y)
    }

    this.spline = new THREE.CatmullRomCurve3(points)
    let totalPoints = this.spline.getPoints(50)
    let geometry = new THREE.BufferGeometry().setFromPoints(totalPoints)
    let material = new THREE.LineBasicMaterial({
      color: 0xff00ff
    })
    let spline = new THREE.Line(geometry, material)
    this.scene.add(spline)
  }

  moveCamera () {
    this.percentageCamera += 0.00045

    // position
    let p1 = this.spline.getPointAt(this.percentageCamera % 1) // x,y,z
    let p2 = this.spline.getPointAt((this.percentageCamera + 0.01) % 1) // lookat

    // angle
    let tangent = this.spline.getTangent(this.percentageCamera)

    this.camera.position.x = p1.x
    this.camera.position.y = p1.y + 2
    this.camera.position.z = p1.z
    this.camera.lookAt(p2.x, p2.y + 3, p2.z)
    this.camera.rotation.y = -tangent.x
  }
}
