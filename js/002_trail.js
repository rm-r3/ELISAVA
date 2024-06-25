console.log("002_trail.js loaded");

const trailGeometry = new THREE.BufferGeometry();
const trailVertices = new Float32Array(300); // Adjust size based on max trail length * 3
trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailVertices, 3));

const trailMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
const trail = new THREE.Line(trailGeometry, trailMaterial);
scene.add(trail);

let trailIndex = 0;

function updateTrail() {
  trailVertices[trailIndex * 3] = fractalObject.position.x;
  trailVertices[trailIndex * 3 + 1] = fractalObject.position.y;
  trailVertices[trailIndex * 3 + 2] = fractalObject.position.z;

  trailIndex = (trailIndex + 1) % 100; // Loop over the trail array, adjust size as needed
  trailGeometry.attributes.position.needsUpdate = true;
}
