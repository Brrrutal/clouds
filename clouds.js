// Setting up renderer and hooking it up to the web page view.
var engine = new Engine(window.innerWidth, window.innerHeight);
engine.AddLight(new THREE.Vector3(20, 20, 20));

document.body.appendChild(engine.renderer.domElement);

// Setting up material for parts.
var shader = CloudShader;
var material = new THREE.ShaderMaterial( 
    { 
        transparent: true,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
    });

var particleSize = new THREE.Vector2(10, 10);

var cloud = new Cloud();

for (x = -50.0; x <= 50.0; x += 10.0)
    for (y = -50.0; y <= 50.0; y += 10.0)
    {
        cloud.AddParticle(new Particle(
                particleSize, new THREE.Vector2(x, y), material));
    }

cloud.AddToScene(engine.scene);

function render() 
{ 
    requestAnimationFrame(render); 
    cloud.LookAt(engine.camera);
    engine.Render();
} 

render();

