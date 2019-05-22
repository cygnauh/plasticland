import * as THREE from 'three'

export default class CameraSpline {
  constructor (scene) {
    this.scene = scene

    this.initSpline()
  }

  initSpline () {
    let points = [
      [7.275232315063477, -151.403076171875, 0.021109700202941895],
      [4.846329689025879, -58.97895050048828, 0.021109700202941895],
      [11.49052906036377, -39.558982849121094, 0.021109700202941895],
      [-1.8230066299438477, -28.93889617919922, 0.021109700202941895],
      [-15.107107162475586, -18.751258850097656, 0.021109702065587044],
      [-15.685903549194336, -2.1816024780273438, 0.021109700202941895],
      [0.08921146392822266, -2.5730514526367188, 0.021109700202941895]
    ]

    let scale = 2
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
      color: 0xffffff
    })
    let curveObject = new THREE.Line(geometry, material)
    this.scene.add(curveObject)
  }
}
