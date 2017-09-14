function Particle(size, offset, color)
{
    this.meshes = []

    this.size = size;

    var particleXZ = Particle.Build(size, color, 1);
    particleXZ.position.x += offset.x;
    particleXZ.position.y += offset.y;
    particleXZ.rotation.y = Math.PI * 0.5;
    this.meshes.push(particleXZ)

    var particle = Particle.Build(size, color, 1);
    particle.position.x += offset.x;
    particle.position.y += offset.y;
    this.meshes.push(particle)

    /*
    this.mesh3 = Particle.Build(size, color, 2);
    this.mesh3.position.x += offset.x;
    this.mesh3.position.y += offset.y;
    this.mesh3.rotation.x = Math.PI * 0.5;
    */
};

Particle.Build = function(size, color, orientation)
{
    // Setting up material.
    var shader = CloudShader;

    var shaderUniforms = 
        {
            intensity: {type: 'f', value: color},
            lightPosition: {type: 'v3', value: new THREE.Vector3(0, 0, 0) },
            normalMap: {type: 't', value: null}
        };

    var material = new THREE.ShaderMaterial( 
        { 
            transparent: true,
            uniforms: shaderUniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader
        });

    // instantiate a loader
    var loader = new THREE.TextureLoader();

    var normalImage = loader.load("maps/sphere.jpg");
    material.uniforms.normalMap.value = normalImage;

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
        particle.meshes.forEach(function(mesh)
        {
            scene.add(mesh); 
        });
    });
};

Cloud.prototype.LookAt = function(camera)
{
    this.particles.forEach(function(particle)
    { particle.LookAt(camera); });
};

Cloud.prototype.UpdateMaterial = function(lightPos)
{
    this.particles.forEach(function(particle)
    {
        particle.meshes.forEach(function(mesh)
        {
            mesh.material.uniforms.lightPosition.value = lightPos;
            mesh.material.needsUpdate = true;
        });
    });
};


