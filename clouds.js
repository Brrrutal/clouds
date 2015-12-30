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
 
// Setting up scene geometry.
var geometry = new THREE.PlaneGeometry(20, 20);
var geometry2 = new THREE.PlaneGeometry(20, 20);

var cube = new THREE.Mesh(geometry, material); 
var cube2 = new THREE.Mesh(geometry2, material);
cube2.position.x += 20.0;

scene.add( cube ); 
scene.add( cube2 );

function render() 
{ 
    requestAnimationFrame(render); 
    cube.lookAt(camera.position);
    cube2.lookAt(camera.position);
    renderer.render(scene, camera); 
    controls.update();
} 

render();

