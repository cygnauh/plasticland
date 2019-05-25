import * as THREE from 'three'

export default class CameraSpline {
  constructor (scene) {
    this.scene = scene

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

    let scale = 1
    for (let i = 0; i < points.length; i++) {
      let x = points[i][0] * scale
      let y = points[i][1] * scale
      let z = points[i][2] * scale
      points[i] = new THREE.Vector3(x, z, -y)
    }

    let curve = new THREE.CatmullRomCurve3(points)
    let totalPoints = curve.getPoints(50)
    let geometry = new THREE.BufferGeometry().setFromPoints(totalPoints)
    let material = new THREE.LineBasicMaterial({
      color: 0xff00ff
    })
    let curveObject = new THREE.Line(geometry, material)
    // curveObject.rotateX(Math.PI)
    this.scene.add(curveObject)
  }
}
