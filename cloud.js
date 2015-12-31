function Cloud(size, material)
{
    this.size = size;
    this.mesh = Cloud.Build(size, material);
};

Cloud.Build = function(size, material)
{
    // Setting up scene geometry.
    var geometry = new THREE.PlaneGeometry(size.x, size.y);
    var mesh = new THREE.Mesh(geometry, material); 
    return mesh;
};

Cloud.prototype.LookAt = function(camera)
{
    this.mesh.lookAt(camera.position);
};

