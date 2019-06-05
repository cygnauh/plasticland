import * as THREE from 'three'
import * as TWEEN from 'tween'
import * as store from '../../store'

export default class CameraSpline {
  constructor (scene, camera) {
    this.scene = scene
    this.camera = camera

    this.percentageCamera = { value: 0 }
    this.tween = null
    this.moving = false
    this.radar = store.default.state.radar

    this.initSpline()
  }

  initSpline () {
    let points = [
      [33.29779815673828, -2174.857421875, 0.09950000047683716],
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
    let totalPoints = this.spline.getPoints(150)
    let geometry = new THREE.BufferGeometry().setFromPoints(totalPoints)
    let material = new THREE.LineBasicMaterial({
      color: 0xff00ff
    })
    this.splineLine = new THREE.Line(geometry, material)
    this.splineLine.name = 'splineLine'
    this.splineLine.visible = false
    this.scene.add(this.splineLine)
  }

  moveCamera (e) {
    // console.log(this.percentageCamera.value)
    let speed = {
      slow: 0.03,
      mid: 0.05,
      fast: 0.15
    }
    if (this.percentageCamera.value <= store.default.state.objects[0].position) {
      this.tweenToScroll(speed.slow)
      this.moveRadar()
    } else if (store.default.state.objects[0].found && this.percentageCamera.value <= store.default.state.objects[1].position) {
      this.tweenToScroll(speed.mid)
      this.moveRadar()
    } else if (store.default.state.objects[0].found && store.default.state.objects[1].found && this.percentageCamera.value <= store.default.state.objects[2].position) {
      this.tweenToScroll(speed.mid)
      this.moveRadar()
    } else if (store.default.state.objects[0].found && store.default.state.objects[1].found && store.default.state.objects[2].found && this.percentageCamera.value <= store.default.state.objects[3].position) {
      this.tweenToScroll(speed.mid)
      this.moveRadar()
    } else if (store.default.state.objects[0].found && store.default.state.objects[1].found && store.default.state.objects[2].found && store.default.state.objects[3].found && this.percentageCamera.value <= store.default.state.objects[4].position) {
      this.tweenToScroll(speed.mid)
      this.moveRadar()
    } else if (store.default.state.objects[0].found && store.default.state.objects[1].found && store.default.state.objects[2].found && store.default.state.objects[3].found && store.default.state.objects[4].found && this.percentageCamera.value <= store.default.state.objects[5].position) {
      this.tweenToScroll(speed.mid)
      this.moveRadar()
    }
  }

  tweenToScroll (speed) {
    this.moving = true
    this.tween = new TWEEN.Tween(this.percentageCamera)
      .to({ value: this.percentageCamera.value + speed }, 4000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onComplete(() => {
        this.moving = false
      })
      .start()
  }

  moveRadar () {
    let offset = this.percentageCamera.value * 100
    this.radar.style.top = `${offset}px`
  }

  updateCamera () {
    let p1 = this.spline.getPointAt(this.percentageCamera.value) // x,y,z
    let p2 = this.spline.getPointAt((this.percentageCamera.value + 0.01) % 1) // lookat
    
    this.camera.position.set(p1.x, p1.y + 3, p1.z)
    this.camera.lookAt(p2.x, p2.y + 3.5, p2.z)
  }
}
