function Engine(width, height)
{
    this.renderer = Engine.Renderer(width, height, 0x00aaff);
    this.camera = Engine.Camera(width, height);
    this.scene = new THREE.Scene();
    this.cameraTimer = 0.0;
    this.lightTimer = 0.0;
};

Engine.Renderer = function(width, height, color)
{
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(color);
    renderer.sortObjects = true;
    return renderer;
};

Engine.Camera = function(width, height)
{
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    return camera;
};

Engine.prototype.AddLight = function(pos)
{
    this.light = new THREE.Object3D();
    this.light.position.set(pos.x, pos.y, pos.z);
};

Engine.prototype.UpdateCamera = function()
{
    this.cameraTimer += 0.001;
    var t = this.cameraTimer;
    this.camera.position.x = 50.0 * Math.cos(t);
    this.camera.position.y = 50.0 * Math.sin(t);
    this.camera.up = new THREE.Vector3(0.0, 0.0, 1.0);
    this.camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
};

Engine.prototype.UpdateLight = function()
{
    this.lightTimer += 0.05;
    var t = this.lightTimer;
    this.light.position.x = 100.0 * Math.cos(t);
    this.light.position.y = 100.0 * Math.sin(t);
    this.light.position.z = 50.0;
};

Engine.prototype.Render = function()
{
    this.renderer.render(this.scene, this.camera); 
};

