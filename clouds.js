// Setting up renderer and hooking it up to the web page view.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x00aaff);
document.body.appendChild(renderer.domElement);

// Setting up main scene, camera and light.
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(20, 20, 20);
scene.add(light);

// Setting up material for parts.
var shader = CloudShader;
var material = new THREE.ShaderMaterial( 
    { 
        transparent: true,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
    });

var cloud = new Cloud(new THREE.Vector2(20, 20), material); 
var cloud2 = new Cloud(new THREE.Vector2(20, 20), material); 
 
cloud.mesh.position.x += 20.0;

scene.add(cloud.mesh); 
scene.add(cloud2.mesh);

function render() 
{ 
    requestAnimationFrame(render); 
    cloud.LookAt(camera);
    cloud2.LookAt(camera);
    renderer.render(scene, camera); 
    controls.update();
} 

render();

