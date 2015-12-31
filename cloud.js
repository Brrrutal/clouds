function Particle(size, offset, material)
{
    this.size = size;
    this.mesh = Particle.Build(size, material);
    this.mesh.position.x += offset.x;
    this.mesh.position.y += offset.y;
};

Particle.Build = function(size, material)
{
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


