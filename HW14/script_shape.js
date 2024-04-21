// Define the scene
  var scene = new THREE.Scene();

// Define the camera
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Create the renderer
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

// Set the background color to white
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);

// Create OrbitControls
  var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Set initial position for controls
  controls.target.set(0, 0, 0);

// Enable damping (smooth panning and zooming)
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

// Enable zoom
  controls.enableZoom = true;

// Enable rotation
  controls.enableRotate = true;  //can't figure out why this isn't working

// Enable panning
  controls.enablePan = true;

// Create the blue cube
  var geometryBlue = new THREE.BoxGeometry();
  var materialBlue = new THREE.MeshBasicMaterial({ color: "#66E6D9" });
  var cubeBlue = new THREE.Mesh(geometryBlue, materialBlue);
  scene.add(cubeBlue);

// Position of the blue cube
  cubeBlue.position.set(-50, 50, 0);
  cubeBlue.scale.set(20, 20, 20);

// Create the purple cube
  var geometryPurple = new THREE.BoxGeometry();
  var materialPurple = new THREE.MeshBasicMaterial({ color: "#9933FF" }); // Purple color
  var cubePurple = new THREE.Mesh(geometryPurple, materialPurple);
  scene.add(cubePurple);

// Position of the purple cube
  cubePurple.position.set(50, -50, 0);
  cubePurple.scale.set(30, 30, 30);

// Create the maroon cube
  var geometryMaroon = new THREE.BoxGeometry();
  var materialMaroon = new THREE.MeshBasicMaterial({ color: "#800000" }); // Purple color
  var cubeMaroon = new THREE.Mesh(geometryMaroon, materialMaroon);
  scene.add(cubeMaroon);

// Position of the maroon cube
  cubeMaroon.position.set(100, 50, 0);
  cubeMaroon.scale.set(15, 15, 15);

// Create the yellow cube
  var geometryYellow = new THREE.BoxGeometry();
  var materialYellow = new THREE.MeshBasicMaterial({ color: "#FFFF00" }); // Yellow color
  var cubeYellow = new THREE.Mesh(geometryYellow, materialYellow);
  scene.add(cubeYellow);

// Position of the yellow cube
  cubeYellow.position.set(-50, -50, 0);
  cubeYellow.scale.set(15, 15, 15);

// Adjust camera position to focus on the cubes
  camera.position.set(0, 0, 120); 

// Define the animation function for the cubes
  function animateCubes() {
    requestAnimationFrame(animateCubes);

// Update controls
  controls.update();

// Update cube animations
  cubeBlue.rotation.x += 0.025;
  cubeBlue.rotation.y += 0.025;
  cubePurple.rotation.x += 0.025;
  cubePurple.rotation.y += 0.025;
  cubeMaroon.rotation.x -= 0.025;
  cubeMaroon.rotation.y -= 0.025;
  cubeYellow.rotation.x -= 0.025;
  cubeYellow.rotation.y -= 0.025;


// Render the scene
  renderer.render(scene, camera);
  }

// Start the animation
  animateCubes();

// Create a OBJLoader
  var loader = new THREE.OBJLoader();

// Load the model
  loader.load(
    'models/male02.obj',

// onLoad callback
  function (object) {

// Set the position, rotation, and scale of the model as desired
  object.position.set(0, 0, 0);
  object.rotation.set(0, 0, 0);
  object.scale.set(.25, .25, .25);

// Add the model to the scene
  scene.add(object);
  },

);
