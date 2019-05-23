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

const setupScene1 = () => {
  const sceneInfo = makeScene(document.querySelector('#box'))
	console.log(document.querySelector('#box'))
  const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({ color: 'red' })
  const mesh = new THREE.Mesh(geometry, material)
  sceneInfo.scene.add(mesh)
  sceneInfo.mesh = mesh
  return sceneInfo
}

const setupScene2 = () => {
  const sceneInfo = makeScene(document.querySelector('#pyramid'))
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

export { makeScene, setupScene1, setupScene2, rendenerSceneInfo }
