import * as THREE from 'three'
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

const setupScene = (element) => {
  const sceneInfo = makeScene(element)
  // const sceneInfo = makeScene(document.querySelector('#box'))
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({ color: 'red' })
  const mesh = new THREE.Mesh(geometry, material)
  sceneInfo.scene.add(mesh)
  sceneInfo.mesh = mesh
  return sceneInfo
}

const setupScene2 = (element) => {
  const sceneInfo = makeScene(element)
  const radius = 0.8
  const widthSegments = 4
  const heightSegments = 2
  const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments)
  const material = new THREE.MeshPhongMaterial({
    color: 'blue',
    flatShading: true
  })
  const mesh = new THREE.Mesh(geometry, material)
  sceneInfo.scene.add(mesh)
  sceneInfo.mesh = mesh
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
  // let left, right, top, bottom, width, height
  // if (elem) {
  // 	left = elem.getBoundingClientRect().left
  //   right = elem.getBoundingClientRect().right
  //   top = elem.getBoundingClientRect().top
  //   bottom = elem.getBoundingClientRect().bottom
  //   width = elem.getBoundingClientRect().width
  //   height = elem.getBoundingClientRect().height
  // }
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

export { makeScene, setupScene, setupScene2, rendenerSceneInfo, resizeRendererToDisplaySize }
