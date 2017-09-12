function Particle(size, offset, color)
{
    this.size = size;
    this.mesh = Particle.Build(size, color);
    this.mesh.position.x += offset.x;
    this.mesh.position.y += offset.y;
    this.mesh.rotation.y = Math.PI * 0.5;
    this.mesh2 = Particle.Build(size, color);
    this.mesh2.position.x += offset.x;
    this.mesh2.position.y += offset.y;
    this.mesh3 = Particle.Build(size, color);
    this.mesh3.position.x += offset.x;
    this.mesh3.position.y += offset.y;
    this.mesh3.rotation.x = Math.PI * 0.5;
};

Particle.Build = function(size, color)
{
    // Setting up material.
    var shader = CloudShader;

    var uniforms = 
        {
            intensity: {type: 'f', value: color} 
        };

    var shaderUniforms = THREE.UniformsUtils.merge([
        THREE.UniformsLib['lights'],
        uniforms
    ]);

    var material = new THREE.ShaderMaterial( 
        { 
            transparent: true,
            lights: true,
            uniforms: shaderUniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader
        });

    material.depthWrite = false;
    material.side = THREE.DoubleSide;

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
    { 
        scene.add(particle.mesh); 
        scene.add(particle.mesh2); 
        scene.add(particle.mesh3); 
    });
};

Cloud.prototype.LookAt = function(camera)
{
    this.particles.forEach(function(particle)
    { particle.LookAt(camera); });
};

Cloud.prototype.UpdateMaterial = function()
{
    this.particles.forEach(function(particle)
    {
       particle.mesh.material.needsUpdate;
       particle.mesh2.material.needsUpdate;
       particle.mesh3.material.needsUpdate; 
    });
};


