function Particle(size, offset, color)
{
    this.size = size;
    this.mesh = Particle.Build(size, color);
    this.mesh.position.x += offset.x;
    this.mesh.position.y += offset.y;
};

Particle.Build = function(size, color)
{
    // Setting up material.
    var shader = CloudShader;

    var uniforms = 
        {
            intensity: {type: 'f', value: color} 
        };

    var material = new THREE.ShaderMaterial( 
        { 
            transparent: true,
            uniforms: uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader
        });

    material.depthWrite = false;

    // Setting up scene geometry.
    var geometry = new THREE.PlaneGeometry(size.x, size.y);
    var mesh = new THREE.Mesh(geometry, material); 
    return mesh;
};

Particle.prototype.LookAt = function(camera)
{
    this.mesh.lookAt(camera.position);
};

////////////////////////////////////////////////////////////////////////////////
//
// Cloud class
// 
////////////////////////////////////////////////////////////////////////////////

function Cloud()
{
    this.particles = [];
};

Cloud.prototype.AddParticle = function(particle)
{
    this.particles.push(particle);
};

Cloud.prototype.AddToScene = function(scene)
{
    this.particles.forEach(function(particle)
    { scene.add(particle.mesh); });
};

Cloud.prototype.LookAt = function(camera)
{
    this.particles.forEach(function(particle)
    { particle.LookAt(camera); });
};


