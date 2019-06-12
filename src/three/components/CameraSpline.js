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
      [33.29779815673828, -2001.6573486328125, 0.0995],
      [31.629199981689453, -1193.315185546875, 0.0995],
      [-54.100799560546875, -810.0264282226562, 0.0995],
      [183.20199584960938, -342.8611145019531, 0.0995],
      [-114.49729919433594, -4.303100109100342, 0.0995],
      [41.410701751708984, 369.5090026855469, 0.0995],
      [-240.41639709472656, 715.1845092773438, 0.0995],
      [-160.4936981201172, 1208.04248046875, 0.0995]
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
      mid: 0.03
    }
    if (this.percentageCamera.value + speed.slow <= store.default.state.objects[0].position) {
      this.tweenToScroll(speed.slow)
      this.moveRadar()
    } else if (store.default.state.objects[0].found && this.percentageCamera.value + speed.mid <= store.default.state.objects[1].position) {
      this.tweenToScroll(speed.mid)
      this.moveRadar()
    } else if (store.default.state.objects[0].found && store.default.state.objects[1].found && this.percentageCamera.value + speed.mid <= store.default.state.objects[2].position) {
      this.tweenToScroll(speed.mid)
      this.moveRadar()
    } else if (store.default.state.objects[0].found && store.default.state.objects[1].found && store.default.state.objects[2].found && this.percentageCamera.value + speed.mid <= store.default.state.objects[3].position) {
      this.tweenToScroll(speed.mid)
      this.moveRadar()
    } else if (store.default.state.objects[0].found && store.default.state.objects[1].found && store.default.state.objects[2].found && store.default.state.objects[3].found && this.percentageCamera.value + speed.mid <= store.default.state.objects[4].position) {
      this.tweenToScroll(speed.mid)
      this.moveRadar()
    } else if (store.default.state.objects[0].found && store.default.state.objects[1].found && store.default.state.objects[2].found && store.default.state.objects[3].found && store.default.state.objects[4].found && this.percentageCamera.value + speed.mid >= 0) {
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
    // console.log(this.radar, offset)
    if (this.radar) this.radar.style.top = `${offset}px`
  }

  updateCamera () {
    store.default.commit('setSplinePosition', this.percentageCamera.value)
    let p1 = this.spline.getPointAt(this.percentageCamera.value) // x,y,z
    this.camera.position.set(p1.x, p1.y + 3, p1.z)
  }
}
