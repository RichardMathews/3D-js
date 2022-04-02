import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

const pointLight = new THREE.PointLight(0xffffff)

pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)

//Stars 
function addStart() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = new Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStart)

//Background
const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpeg')
scene.background = spaceTexture

//Normal texture
const normalTexture = new THREE.TextureLoader().load('./assets/normal.jpeg')

//Earth
const earthTexture = new THREE.TextureLoader().load('./assets/earth.jpeg')

const earth =  new THREE.Mesh(
  new THREE.SphereGeometry(10, 40, 40),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture
  })
)

scene.add(earth)

//Moon
const moonTexture = new THREE.TextureLoader().load('./assets/moon.jpeg')

const moon =  new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)

scene.add(moon)

moon.position.z = 30
moon.position.setX(-10)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top
  moon.position.x += 0.5
  moon.position.z += 0.75
  moon.position.x += 0.05

  camera.position.z = t * -0.01
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate)

  earth.rotation.y += 0.005

  controls.update()

  renderer.render(scene, camera)
}

animate() 