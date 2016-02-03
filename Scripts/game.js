// MAIN GAME FILE
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var scene;
var renderer;
var camera;
var cubeGeometry;
var planeGeometry;
var sphereGeometry;
var cubeMaterial;
var planeMaterial;
var sphereMaterial;
var axes;
var cube;
var plane;
var sphere;
var spotLight;
var pointLight;
var control;
var gui;
var stats;
var step = 0;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    // Green = y, Blue = x, Red = z
    axes = new AxisHelper(20);
    axes.position.x = -13;
    axes.position.y = 0;
    axes.position.z = -13;
    scene.add(axes);
    //Add a Plane to the Scene
    planeGeometry = new PlaneGeometry(30, 30);
    planeMaterial = new LambertMaterial({ color: 0xFFFFFF });
    plane = new Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    //Add a Head to the Scene
    cubeGeometry = new BoxGeometry(2, 2, 2);
    cubeMaterial = new LambertMaterial({ color: 0xff0000 });
    cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 12;
    cube.position.z = 0;
    scene.add(cube);
    console.log("Added Head Primitive to scene...");
    //Add a Torso to the Scene
    cubeGeometry = new BoxGeometry(2.5, 7, 4);
    cubeMaterial = new LambertMaterial({ color: 0xff0000 });
    cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 7.5;
    cube.position.z = 0;
    scene.add(cube);
    console.log("Added Torso Primitive to scene...");
    //Add a Arms to the Scene
    cubeGeometry = new BoxGeometry(1, 1, 10);
    cubeMaterial = new LambertMaterial({ color: 0xff0000 });
    cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 10.45;
    cube.position.z = 0;
    scene.add(cube);
    console.log("Added Arms Primitive to scene...");
    //Add a Left Leg to the Scene
    cubeGeometry = new BoxGeometry(1.5, 4, 1.5);
    cubeMaterial = new LambertMaterial({ color: 0xff0000 });
    cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 2;
    cube.position.z = -1.2;
    scene.add(cube);
    //Add a Right Leg to the Scene
    cubeGeometry = new BoxGeometry(1.5, 4, 1.5);
    cubeMaterial = new LambertMaterial({ color: 0xff0000 });
    cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 2;
    cube.position.z = 1.2;
    scene.add(cube);
    console.log("Added Legs Primitive to scene...");
    //Add a Sphere to the Scene
    sphereGeometry = new SphereGeometry(4, 20, 20);
    sphereMaterial = new LambertMaterial({ color: 0x7777ff });
    sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    //scene.add(sphere);
    //console.log("Added Sphere Primitive to scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added Spot Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control(0.02, 0.03);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeed', 0, 0.5);
    gui.add(controlObject, 'bouncingSpeed', 0, 0.5);
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    //animate cube
    //cube.rotation.x += control.rotationSpeed;
    cube.rotation.y += control.rotationSpeed;
    //cube.rotation.z += control.rotationSpeed;
    //bounce the ball
    step += control.bouncingSpeed;
    sphere.position.x = 20 + (10 * (Math.cos(step)));
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map