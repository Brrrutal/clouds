var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff );
document.body.appendChild( renderer.domElement );

var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 20, 20, 20 );
scene.add( light );
 
var geometry = new THREE.PlaneGeometry( 10, 10 );
var material = new THREE.MeshPhongMaterial( 
    { 
        color: 0xccffee, 
        specular: 0x009933, 
        shininess: 5, 
        shading: THREE.SmoothShading,
        map: THREE.ImageUtils.loadTexture("maps/white-pool-ball.png"),
        normalMap: THREE.ImageUtils.loadTexture(
                "maps/normal02.png" ),
    });

var cube = new THREE.Mesh( geometry, material ); 

scene.add( cube ); 
camera.position.z = 50;

function render() 
{ 
    requestAnimationFrame( render ); 
    light.position.x -= 0.5;
    light.position.y -= 0.2;
    renderer.render( scene, camera ); 
} 

render();

