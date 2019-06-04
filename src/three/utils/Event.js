import { animateVector3 } from './Animation'
import * as TWEEN from 'tween'
import * as THREE from 'three/src/Three'
import * as store from '../../store'

const onClickRaycaster = (array, raycaster) => { // array to raycast -> an array with meshes
  let intersected = false
  if (array.length > 0) {
    let intersects = raycaster.intersectObjects(array)
    intersects.forEach((intersect) => {
      // console.log(intersect.object)
      switch (intersect.object.name) {
        case 'starbucks':
          store.default.commit('objectFound', 6)
          intersected = true
          break
        default:
          intersected = false
          break
      }
    })
  }
}

export { onClickRaycaster }
