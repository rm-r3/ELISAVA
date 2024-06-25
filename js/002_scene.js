console.log("002_scene.js loaded");

// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Add OrbitControls
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// Function to create wireframe globe
function createWireframeGlobe(radius, segments) {
  const globeGeometry = new THREE.SphereGeometry(radius, segments, segments);
  const globeMaterial = new THREE.MeshBasicMaterial({
    color: 0x040299,
    wireframe: true,
    opacity: 0.65,
    transparent: true
  }); // Darker blue color with transparency
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globe);
}

// Call the function to create the wireframe globe
createWireframeGlobe(5, 32);

// Position the camera and set initial control settings
camera.position.set(10, 10, 10);
controls.update();

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
