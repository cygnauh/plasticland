import * as THREE from 'three'
import GltfLoader from '../components/GltfLoader'

const makeScene = (elem) => {
  const scene = new THREE.Scene()

  const fov = 45
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 5
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 1, 2)
  camera.lookAt(0, 0, 0)

  {
    const color = 0xFFFFFF
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    scene.add(light)
  }

  return { scene, camera, elem }
}

const setupScene = (element, name, path, scene, manager) => {
  const sceneInfo = makeScene(element)
  let mesh = null
  let test = new GltfLoader(name, path, scene, manager, { addToScene: false })
  test.then(response => {
    mesh = response.meshes[0]
    sceneInfo.scene.add(mesh)
    sceneInfo.mesh = mesh
  })
  return sceneInfo
}

const resizeRendererToDisplaySize = (renderer) => {
  const canvas = renderer.domElement
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}

const rendenerSceneInfo = (sceneInfo, renderer) => {
  const { scene, camera, elem } = sceneInfo
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

export { makeScene, setupScene, rendenerSceneInfo, resizeRendererToDisplaySize }
