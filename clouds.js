var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x00aaff );
document.body.appendChild( renderer.domElement );

var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 20, 20, 20 );
scene.add( light );
 
var geometry = new THREE.PlaneGeometry( 20, 20 );
var geometry2 = new THREE.PlaneGeometry( 20, 20 );
var material = new THREE.MeshPhongMaterial( 
    { 
        transparent: true,
        //color: 0xccffee, 
        //specular: 0x009933, 
        emissive: 0x888888,
        shininess: 10, 
        shading: THREE.SmoothShading,
        map: THREE.ImageUtils.loadTexture("maps/00_000.png"),
        normalMap: THREE.ImageUtils.loadTexture(
                "maps/normalmap_beethovennormalmap.jpg" ),
    });

var cube = new THREE.Mesh( geometry, material ); 
var cube2 = new THREE.Mesh( geometry2, material );

scene.add( cube ); 
scene.add( cube2 );
camera.position.z = 50;

function render() 
{ 
    requestAnimationFrame( render ); 
    light.position.x -= 0.2;
    light.position.y -= 0.1;
    cube2.position.z += 0.01;
    cube2.position.x += 0.01;
    renderer.render( scene, camera ); 
} 

render();

