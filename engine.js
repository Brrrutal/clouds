function Engine(width, height)
{
    this.renderer = Engine.Renderer(width, height, 0x00aaff);
    this.camera = Engine.Camera(width, height);
    this.scene = new THREE.Scene();
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
};

Engine.Renderer = function(width, height, color)
{
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(color);
    renderer.sortObjects = false;
    return renderer;
};

Engine.Camera = function(width, height)
{
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;
    return camera;
};

Engine.prototype.AddLight = function(position)
{
    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(position.x, position.y, position.z);
    this.scene.add(light);
};

Engine.prototype.Render = function()
{
    this.renderer.render(this.scene, this.camera); 
    this.controls.update();
};

