console.log("002_plotPoints.js loaded");

function addPoint(lat, lon, color = 0xff0000) {
  const radius = 5;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  const pointGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const pointMaterial = new THREE.MeshBasicMaterial({ color: color });
  const point = new THREE.Mesh(pointGeometry, pointMaterial);

  point.position.set(x, y, z);
  scene.add(point);
}

// Example: Add a point for Barcelona
addPoint(41.3888, 2.159);
