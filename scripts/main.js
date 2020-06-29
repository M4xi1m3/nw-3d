
import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';
import {OBJLoader} from 'https://unpkg.com/three@0.118.3/examples/jsm/loaders/OBJLoader.js';
import {OrbitControls} from 'https://unpkg.com/three@0.118.3/examples/jsm/controls/OrbitControls.js';

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var controls = new OrbitControls(camera, renderer.domElement);
var obj_loader = new OBJLoader();
var tex_loader = new THREE.TextureLoader();

var calculator_body = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({color: 0xffffff}));
scene.add(calculator_body);
var calculator_screen = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({
    map: tex_loader.load("https://threejsfundamentals.org/threejs/resources/images/wall.jpg")
}));
scene.add(calculator_screen);
var calculator_screen_protection = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshPhysicalMaterial({
	color: 0x000000,
	metalness: 0,
	roughness: 0,
	depthWrite: false,
	transparency: 0.9, 
	opacity: 1,
	transparent: true
}));
scene.add(calculator_screen_protection);

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.95 );
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight);
var light = new THREE.AmbientLight(0x505050); // soft white light
scene.add(light);

obj_loader.load(
    'models/calculator.obj',
    function(obj) {
        calculator_body.geometry = obj.children[0].geometry;
        calculator_screen.geometry = obj.children[5].geometry;
        calculator_screen_protection.geometry = obj.children[6].geometry;
        console.log(obj.children);
        
        calculator_body.rotation.x = 3.14159226/2;
        calculator_screen.rotation.x = 3.14159226/2;
        calculator_screen.position.set(1.15, -1.15, 0.8);
        calculator_screen_protection.rotation.x = 3.14159226/2;
        calculator_screen_protection.position.set(0.85, -0.85, 0.9);
    }
)

controls.target.set(4.1, -8, 0.5);
camera.position.set(4.1, -8, 15.5);
controls.update();

function animate() {
    requestAnimationFrame(animate);
    
    controls.update();
    
    renderer.render(scene, camera);
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

animate();
