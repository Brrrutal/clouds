//
// Setting up renderer and hooking it up to the web page view.
//

// Some input parameters.
var width = window.innerWidth; 
var height = window.innerWidth;

// Setup renderer.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0x00aaff);
renderer.sortObjects = true;

// Setup light
var light = new THREE.Object3D();
light.position.set(100.0, 100.0, 100.0);

// Setup camera.
var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 30;

// Setup scene.
var scene = new THREE.Scene();

// Animation timers.
var cameraTimer = 0.0;
var lightTimer = 0.0;

//var engine = new Engine(window.innerWidth, window.innerHeight);
//engine.AddLight();

// Attach renderer to the Web page element
document.body.appendChild(renderer.domElement);

var particleSize = new THREE.Vector2(10, 10);

var cloud = new Cloud();

var color = 0.0;
for (x = -20.0; x <= 20.0; x += 10.0)
{
    for (y = -20.0; y <= 20.0; y += 10.0)
    {
        cloud.AddParticle(new Particle(
                particleSize, new THREE.Vector2(x, y), color));
    }
    color += 0.2;
}

cloud.AddToScene(scene);

function UpdateCamera(t, camera)
{
    camera.position.x = 50.0 * Math.cos(t);
    camera.position.y = 50.0 * Math.sin(t);
    camera.up = new THREE.Vector3(0.0, 0.0, 1.0);
    camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
};

function UpdateLight(t, light)
{
    light.position.x = 100.0 * Math.cos(t);
    light.position.y = 100.0 * Math.sin(t);
    light.position.z = 50.0;
};

function animate()
{
    requestAnimationFrame(animate); 
    UpdateLight(lightTimer, light); lightTimer += 0.05;
    cloud.UpdateMaterial(light.getWorldPosition());
    UpdateCamera(cameraTimer, camera); cameraTimer += 0.01;

    renderer.render(scene, camera); 
}

animate();

