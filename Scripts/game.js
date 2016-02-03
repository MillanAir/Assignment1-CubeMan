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
var head, torso, arm, hand, lLeg, rLeg, lShoe, rShoe;
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
    plane.position.y = -2;
    plane.position.z = 0;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    //Add a Head to the Scene
    cubeGeometry = new BoxGeometry(2, 2, 2);
    cubeMaterial = new LambertMaterial({ color: 0xffd299 });
    head = new Mesh(cubeGeometry, cubeMaterial);
    head.castShadow = true;
    head.position.x = 0;
    head.position.y = 12;
    head.position.z = 0;
    scene.add(head);
    console.log("Added Head Primitive to scene...");
    //Add a Torso to the Scene
    cubeGeometry = new BoxGeometry(2.5, 7, 4);
    cubeMaterial = new LambertMaterial({ color: 0x4fc7ea });
    torso = new Mesh(cubeGeometry, cubeMaterial);
    torso.castShadow = true;
    torso.position.x = 0;
    torso.position.y = 7.5;
    torso.position.z = 0;
    scene.add(torso);
    console.log("Added Torso Primitive to scene...");
    //Add a Arms to the Scene
    cubeGeometry = new BoxGeometry(1, 1, 10);
    cubeMaterial = new LambertMaterial({ color: 0x4fc7ea });
    arm = new Mesh(cubeGeometry, cubeMaterial);
    arm.castShadow = true;
    arm.position.x = 0;
    arm.position.y = 10.45;
    arm.position.z = 0;
    scene.add(arm);
    console.log("Added Arms Primitive to scene...");
    //Add a Hands to the Scene
    cubeGeometry = new BoxGeometry(0.5, 0.8, 11.8);
    cubeMaterial = new LambertMaterial({ color: 0xffd299 });
    hand = new Mesh(cubeGeometry, cubeMaterial);
    hand.castShadow = true;
    hand.position.x = 0;
    hand.position.y = 10.45;
    hand.position.z = 0;
    scene.add(hand);
    console.log("Added Hands Primitive to scene...");
    //Add a Left Leg to the Scene
    cubeGeometry = new BoxGeometry(1.5, 4, 1.5);
    cubeMaterial = new LambertMaterial({ color: 0x005067 });
    lLeg = new Mesh(cubeGeometry, cubeMaterial);
    lLeg.castShadow = true;
    lLeg.position.x = 0;
    lLeg.position.y = 2;
    lLeg.position.z = -1.2;
    scene.add(lLeg);
    //Add a Right Leg to the Scene
    cubeGeometry = new BoxGeometry(1.5, 4, 1.5);
    cubeMaterial = new LambertMaterial({ color: 0x005067 });
    rLeg = new Mesh(cubeGeometry, cubeMaterial);
    rLeg.castShadow = true;
    rLeg.position.x = 0;
    rLeg.position.y = 2;
    rLeg.position.z = 1.2;
    scene.add(rLeg);
    console.log("Added Legs Primitive to scene...");
    //Add a Left Shoe to the Scene
    cubeGeometry = new BoxGeometry(2, 0.7, 1.5);
    cubeMaterial = new LambertMaterial({ color: 0x4f59ea });
    lShoe = new Mesh(cubeGeometry, cubeMaterial);
    lShoe.castShadow = true;
    lShoe.position.x = 0.2;
    lShoe.position.y = 0.08;
    lShoe.position.z = -1.2;
    scene.add(lShoe);
    //Add a Right Shoe to the Scene
    cubeGeometry = new BoxGeometry(2, 0.7, 1.5);
    cubeMaterial = new LambertMaterial({ color: 0x4f59ea });
    rShoe = new Mesh(cubeGeometry, cubeMaterial);
    rShoe.castShadow = true;
    rShoe.position.x = 0.2;
    rShoe.position.y = 0.08;
    rShoe.position.z = 1.2;
    scene.add(rShoe);
    console.log("Added Shoes Primitive to scene...");
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
    head.rotation.y += control.rotationSpeed;
    torso.rotation.y += control.rotationSpeed;
    arm.rotation.y += control.rotationSpeed;
    hand.rotation.y += control.rotationSpeed;
    //lLeg.rotation.y += control.rotationSpeed;
    //lLeg.rotation.z += control.rotationSpeed;
    // rLeg.rotation.y += control.rotationSpeed;
    // lShoe.rotation.y += control.rotationSpeed;
    // rShoe.rotation.y += control.rotationSpeed;
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