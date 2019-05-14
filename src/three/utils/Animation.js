import * as THREE from 'three/src/Three'
import * as TWEEN from 'tween'

const animateVector3 = (vectorToAnimate, target, options) => {
	options = options || {}
	// get targets from options or set to defaults
	let to, easing, duration, delay
	to = target || THREE.Vector3()
	easing = options.easing || TWEEN.Easing.Quadratic.In
	duration = options.duration || 2000
	delay = options.delay || 0
	// create the tween
	let tweenVector3 = new TWEEN.Tween(vectorToAnimate)
		.to({ x: to.x, y: to.y, z: to.z }, duration)
		.delay(delay)
		.easing(easing)
		.onComplete(function () {
			if (options.callback) options.callback()
		})
	tweenVector3.start()
	// return the tween in case we want to manipulate it later on
	return tweenVector3
}

export { animateVector3 }
