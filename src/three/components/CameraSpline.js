import * as THREE from 'three'
import * as TWEEN from 'tween'

export default class CameraSpline {
  constructor (scene, camera) {
    this.scene = scene
    this.camera = camera
    this.percentageCamera = { value: 0 }
    this.breakPoints = [0.2, 0.6, 0.7, 0.8, 0.98]
    this.tween = null

    this.initSpline()
    this.moveCamera()
  }

  initSpline () {
    let points = [
      [33.29779815673828, -1625.17333984375, 0.09950000047683716],
      [31.629199981689453, -1193.315185546875, 0.09950000047683716],
      [-54.100799560546875, -810.0264282226562, 0.09950000047683716],
      [100.6720962524414, -527.3427734375, 0.09950000047683716],
      [82.0342025756836, -169.00909423828125, 0.09950000047683716],
      [-109.14830017089844, -69.94390106201172, 0.09950000047683716],
      [-40.162498474121094, 136.98829650878906, 0.09950000047683716],
      [-47.44369888305664, 329.62548828125, 0.09950000047683716]
    ]

    for (let i = 0; i < points.length; i++) {
      let x = points[i][0]
      let y = points[i][1]
      let z = points[i][2]
      points[i] = new THREE.Vector3(x, z, -y)
    }

    this.spline = new THREE.CatmullRomCurve3(points)
    let totalPoints = this.spline.getPoints(100)
    let geometry = new THREE.BufferGeometry().setFromPoints(totalPoints)
    let material = new THREE.LineBasicMaterial({
      color: 0xff00ff
    })
    this.splineLine = new THREE.Line(geometry, material)
    this.splineLine.name = 'splineLine'
    this.scene.add(this.splineLine)
  }

  moveCamera () {
    setTimeout(() => {
      this.tweenToBreakpoint(this.breakPoints[4])
    }, 4000)
  }

  tweenToBreakpoint (breakpoint) {
    this.tween = new TWEEN.Tween(this.percentageCamera)
      .to({ value: breakpoint }, 60000)
      .easing(TWEEN.Easing.Linear.None)
      .start()
  }

  updateCamera () {
    // position
    let p1 = this.spline.getPoint(this.percentageCamera.value % 1) // x,y,z
    let p2 = this.spline.getPoint((this.percentageCamera.value + 0.01) % 1) // lookat

    this.camera.position.set(p1.x, p1.y + 3, p1.z)
    this.camera.lookAt(p2.x, p2.y + 3.5, p2.z)
  }
}
