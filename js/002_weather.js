console.log("002_weather.js loaded");

// Your OpenWeatherMap API key
const apiKey = '0674e48afb8b0d7e9957924b0ff9e042';

async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function addWeatherPoint(city) {
  const data = await fetchWeatherData(city);
  if (data) {
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const temperature = data.main.temp;

    const radius = 5;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    const pointGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const point = new THREE.Mesh(pointGeometry, pointMaterial);

    point.position.set(x, y, z);
    scene.add(point);
  }
}

// Add weather points for some example cities
addWeatherPoint('Barcelona');
addWeatherPoint('Paris');
addWeatherPoint('London');
addWeatherPoint('Los Angeles');
