import * as THREE from 'three'
import { store } from '../../store/index'
import GltfLoader from '../components/GltfLoaderRefactored'

const makeScene = () => {
  const scene = new THREE.Scene()
  const fov = 45
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 50
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 1, 2)
  camera.lookAt(0, 0, -150)

  {
    const color = 0xFFFFFF
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    scene.add(light)
  }

  return { scene, camera }
}

const setupScene = (name, path, manager, isFound, flatMat) => {
  const sceneInfo = makeScene()
  let mesh = null
  let test = new GltfLoader(name, path, null, manager, { addToScene: false })
  test.then(response => {
    mesh = response.meshes[0]
    mesh.scale.x = 0.002
    mesh.scale.y = 0.002
    mesh.scale.z = 0.002
    mesh.rotation.z = Math.PI / 2
    mesh.rotation.x = Math.PI / 3
    mesh.position.y = 1
    if (!isFound) {
      mesh.material = flatMat
    }
    sceneInfo.scene.add(mesh)
    sceneInfo.mesh = mesh
    sceneInfo.gltf = response
    sceneInfo.materials = response.materials[0]
    sceneInfo.name = name
  })
  return sceneInfo
}

const rendenerSceneInfo = (sceneInfo, elem, renderer) => {
  const { scene, camera } = sceneInfo
  // get the viewport relative position opf this element
  const { left, right, top, bottom, width, height } = elem.getBoundingClientRect()

  const isOffscreen =
  bottom < 0 ||
  top > renderer.domElement.clientHeight ||
  right < 0 ||
  left > renderer.domElement.clientWidth

  if (isOffscreen) {
    return
  }

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  const positiveYUpBottom = renderer.domElement.clientHeight - bottom
  renderer.setScissor(left, positiveYUpBottom, width, height)
  renderer.setViewport(left, positiveYUpBottom, width, height)

  renderer.render(scene, camera)
}

export { makeScene, setupScene, rendenerSceneInfo }
