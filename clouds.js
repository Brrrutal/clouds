// Setting up renderer and hooking it up to the web page view.
var engine = new Engine(window.innerWidth, window.innerHeight);
engine.AddLight(new THREE.Vector3(20, 20, 20));

document.body.appendChild(engine.renderer.domElement);

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

cloud.AddToScene(engine.scene);

function render() 
{ 
    requestAnimationFrame(render); 
    cloud.LookAt(engine.camera);
    engine.Render();
} 

render();

