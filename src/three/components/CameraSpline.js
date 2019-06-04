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
    this.stops = [
      {
        name: 'starbucks',
        breakpoint: 0.22,
        speed: 12000,
        collected: false
      },
      {
        name: 'carrefour',
        breakpoint: 0.4,
        speed: 8000,
        collected: false
      },
      {
        name: 'coca-cola',
        breakpoint: 0.55,
        speed: 8000,
        collected: false
      },
      {
        name: 'suremballage',
        breakpoint: 0.68,
        speed: 8000,
        collected: false
      },
      {
        name: 'cube',
        breakpoint: 0.86,
        speed: 8000,
        collected: false
      },
      {
        name: 'end',
        breakpoint: 0.95,
        speed: 3000
      }
    ]
    this.positionStop = 0
    this.animateWater = true
    this.radar = store.default.state.radar
    console.log(this.radar)

    this.initSpline()
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

  moveCamera (e) {
	  this.percentageCamera.value += (Math.abs(e.deltaY) / 10000)
	  this.tweenToScroll()
    this.moveRadar()
    console.log(this.percentageCamera.value)
    store.default.state.sounds.place.forEach(element => {
      console.log(this.percentageCamera.value, element.startAt, element.endAt, element.name, store.default.state.currentPlace.name)
      if (this.percentageCamera.value > element.startAt &&
        this.percentageCamera.value <= element.endAt) {
        console.log(store.default.state.currentPlace.name)
        // this.percentageCamera.value <= element.endAt && store.state.currentPlace.name !== element.name) {
        store.default.commit('setCurrentPlace', element)
      }
    })
  }

  tweenToScroll () {
    this.tween = new TWEEN.Tween(this.percentageCamera)
      .to({ value: this.percentageCamera.value + 0.04 }, 4000)
      .easing(TWEEN.Easing.Cubic.Out)
      .onComplete(() => {
        // this.moving = false
        // this.animateWater = true
      })
      .start()
  }

  moveRadar () {
    let offset = this.percentageCamera.value * 100
    this.radar.style.top = `${offset}px`
    // console.log(this.radar.style.top)
  }

  // tweenToBreakpoint (breakpoint, speed) {
  //   this.tween = new TWEEN.Tween(this.percentageCamera)
  //     .to({ value: breakpoint }, speed)
  //     .easing(TWEEN.Easing.Sinusoidal.InOut)
  //     .onComplete(() => {
  //       this.moving = false
  //       this.positionStop = this.positionStop + 0.5
  //       this.animateWater = true
  //     })
  //     .start()
  // }

  updateCamera () {
    // position
    let p1 = this.spline.getPoint(this.percentageCamera.value % 1) // x,y,z
    let p2 = this.spline.getPoint((this.percentageCamera.value + 0.01) % 1) // lookat

    this.camera.position.set(p1.x, p1.y + 3, p1.z)
    this.camera.lookAt(p2.x, p2.y + 3.5, p2.z)
  }
}
