console.log("002_fractalObject.js loaded");

let fractalObject;

function createFractalObject() {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  function addBranch(start, length, angle, depth) {
    if (depth === 0) return;
    const end = new THREE.Vector3(
      start.x + length * Math.cos(angle),
      start.y + length * Math.sin(angle),
      start.z
    );
    vertices.push(start.x, start.y, start.z, end.x, end.y, end.z);
    addBranch(end, length * 0.7, angle + Math.PI / 4, depth - 1);
    addBranch(end, length * 0.7, angle - Math.PI / 4, depth - 1);
  }

  addBranch(new THREE.Vector3(0, 0, 0), 1, 0, 5);

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  return new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: 0xff0000 }));
}
