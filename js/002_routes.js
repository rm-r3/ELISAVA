console.log("002_routes.js loaded");

function addRoute(startLat, startLon, direction, distance, color) {
  const material = new THREE.LineBasicMaterial({ color });
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  let lat = startLat;
  let lon = startLon;
  const step = 1; // Define the step size for each segment of the route

  for (let i = 0; i < distance; i += step) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = 5 * Math.sin(phi) * Math.cos(theta);
    const y = 5 * Math.cos(phi);
    const z = 5 * Math.sin(phi) * Math.sin(theta);
    vertices.push(x, y, z);

    switch (direction) {
      case 'north':
        lat += step;
        break;
      case 'south':
        lat -= step;
        break;
      case 'east':
        lon += step;
        break;
      case 'west':
        lon -= step;
        break;
      default:
        break;
    }
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  const line = new THREE.Line(geometry, material);
  scene.add(line);
}

// Example: Add a route starting from New York going east for 360 steps
addRoute(40.7128, -74.0060, 'east', 360, 0xff0000); // Adjust direction and distance as needed
