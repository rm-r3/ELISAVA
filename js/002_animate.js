console.log("002_animate.js loaded");

function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Ensure controls is defined
  renderer.render(scene, camera);
}

window.onload = function() {
  animate();
};
