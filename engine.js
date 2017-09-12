function Engine(width, height)
{
    this.renderer = Engine.Renderer(width, height, 0x00aaff);
    this.camera = Engine.Camera(width, height);
    this.scene = new THREE.Scene();
    this.timer = 0.0;
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
    camera.position.z = 20;
    return camera;
};

Engine.prototype.AddLight = function(pos)
{
    var light = new THREE.PointLight(0xffffff, 1);
    light.position.set(pos.x, pos.y, pos.z);
    this.scene.add(light);
};

Engine.prototype.UpdateCamera = function()
{
    this.timer += 0.005;
    var t = this.timer;
    this.camera.position.x = 50.0 * Math.cos(t);
    this.camera.position.y = 50.0 * Math.sin(t);
    this.camera.up = new THREE.Vector3(0.0, 0.0, 1.0);
    this.camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
};

Engine.prototype.Render = function()
{
    this.renderer.render(this.scene, this.camera); 
};

