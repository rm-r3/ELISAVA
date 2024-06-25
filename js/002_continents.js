console.log("002_continents.js loaded");

function addGeoJsonToGlobe(geojson, color, opacity = 0.75) {
  const material = new THREE.LineBasicMaterial({ color, opacity, transparent: true });
  const features = geojson.features;

  const convertCoordinatesToVector3 = (lon, lat) => {
    const radius = 5;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  };

  features.forEach(feature => {
    const coordinates = feature.geometry.coordinates;
    if (feature.geometry.type === 'Polygon') {
      coordinates.forEach(ring => {
        const vertices = [];
        ring.forEach(point => {
          if (Array.isArray(point) && point.length === 2 && !isNaN(point[0]) && !isNaN(point[1])) {
            const [lon, lat] = point;
            const vector = convertCoordinatesToVector3(lon, lat);
            vertices.push(vector);
          } else {
            console.error('Invalid point:', point);
          }
        });

        if (vertices.length > 0) {
          const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
          const line = new THREE.Line(geometry, material);
          scene.add(line);
        }
      });
    } else if (feature.geometry.type === 'MultiPolygon') {
      coordinates.forEach(polygon => {
        polygon.forEach(ring => {
          const vertices = [];
          ring.forEach(point => {
            if (Array.isArray(point) && point.length === 2 && !isNaN(point[0]) && !isNaN(point[1])) {
              const [lon, lat] = point;
              const vector = convertCoordinatesToVector3(lon, lat);
              vertices.push(vector);
            } else {
              console.error('Invalid point:', point);
            }
          });

          if (vertices.length > 0) {
            const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
            const line = new THREE.Line(geometry, material);
            scene.add(line);
          }
        });
      });
    } else {
      console.error('Unsupported geometry type:', feature.geometry.type);
    }
  });
}

// Load GeoJSON data for countries
fetch('data/ne_10m_admin_0_countries.json') // Replace with the correct path to your GeoJSON file
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('GeoJSON data loaded:', data);
    addGeoJsonToGlobe(data, 0x00ccff, 0.75); // Light blue color for continents
  })
  .catch(error => console.error('Error loading GeoJSON data:', error));

// Load GeoJSON data for time zones
fetch('data/ne_10m_time_zones.json') // Replace with the correct path to your GeoJSON file
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('GeoJSON data loaded:', data);
    addGeoJsonToGlobe(data, 0x023BCA, 1); // Dark blue color for time zones with 70% opacity
  })
  .catch(error => console.error('Error loading GeoJSON data:', error));
