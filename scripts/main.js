
import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';
import {OBJLoader} from 'https://unpkg.com/three@0.118.3/examples/jsm/loaders/OBJLoader.js';
import {OrbitControls} from 'https://unpkg.com/three@0.118.3/examples/jsm/controls/OrbitControls.js';

const KEY_Z = 0.95;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var controls = new OrbitControls(camera, renderer.domElement);
var obj_loader = new OBJLoader();
var tex_loader = new THREE.TextureLoader();

var calculator = new THREE.Group();
var keyboard = new THREE.Group();

calculator.add(keyboard);

function populate_keyboard(data, obj) {
    var init_geometry = new THREE.BufferGeometry();

    for(var i in data) {
        var key = data[i];
        
        var temp_obj = new THREE.Mesh(init_geometry, new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: tex_loader.load("textures/out/button-" + key[0] + ".png")
        }));
        
        temp_obj.position.copy(key[3]);
        
        temp_obj.userData = {
            modelId: key[1],
            dataKey: key[2]
        };
        
        temp_obj.rotation.x = 3.14159226/2;
        
        keyboard.add(temp_obj);
    }
}

function load_keyboard_model(keyboard, obj) {
    for (var i in keyboard.children) {
        keyboard.children[i].geometry = obj.children[keyboard.children[i].userData.modelId].geometry;
    }
}


populate_keyboard([
    ["cross", 3, [0, 1, 2, 3], new THREE.Vector3(0.85, -6.425, KEY_Z)],
    ["ok",    2, 4,            new THREE.Vector3(5.25, -6.975, KEY_Z)],
    ["back",  2, 5,            new THREE.Vector3(6.35, -6.975, KEY_Z)],
    ["home",  1, 6,            new THREE.Vector3(3.5,  -6.575, KEY_Z)],
    ["power", 1, 7,            new THREE.Vector3(3.5,  -7.575, KEY_Z)],
    
    ["shift",     4, 12, new THREE.Vector3(0.85, -8.75, KEY_Z)],
    ["alpha",     4, 13, new THREE.Vector3(1.95, -8.75, KEY_Z)],
    ["x",         4, 14, new THREE.Vector3(3.05, -8.75, KEY_Z)],
    ["var",       4, 15, new THREE.Vector3(4.15, -8.75, KEY_Z)],
    ["tool",      4, 16, new THREE.Vector3(5.25, -8.75, KEY_Z)],
    ["backspace", 4, 17, new THREE.Vector3(6.35, -8.75, KEY_Z)],
    
    ["e",     4, 18, new THREE.Vector3(0.85, -9.65, KEY_Z)],
    ["ln",    4, 19, new THREE.Vector3(1.95, -9.65, KEY_Z)],
    ["log",   4, 20, new THREE.Vector3(3.05, -9.65, KEY_Z)],
    ["i",     4, 21, new THREE.Vector3(4.15, -9.65, KEY_Z)],
    ["comma", 4, 22, new THREE.Vector3(5.25, -9.65, KEY_Z)],
    ["pow",   4, 23, new THREE.Vector3(6.35, -9.65, KEY_Z)],
    
    ["sin",    4, 24, new THREE.Vector3(0.85, -10.55, KEY_Z)],
    ["cos",    4, 25, new THREE.Vector3(1.95, -10.55, KEY_Z)],
    ["tan",    4, 26, new THREE.Vector3(3.05, -10.55, KEY_Z)],
    ["pi",     4, 27, new THREE.Vector3(4.15, -10.55, KEY_Z)],
    ["root",   4, 28, new THREE.Vector3(5.25, -10.55, KEY_Z)],
    ["square", 4, 29, new THREE.Vector3(6.35, -10.55, KEY_Z)],
    
    
    ["seven",             1, 36, new THREE.Vector3(0.85, -11.450, KEY_Z)],
    ["eight",             1, 37, new THREE.Vector3(2.2,  -11.450, KEY_Z)],
    ["nine",              1, 38, new THREE.Vector3(3.55, -11.450, KEY_Z)],
    ["left-parenthesis",  1, 39, new THREE.Vector3(4.9,  -11.450, KEY_Z)],
    ["right-parenthesis", 1, 40, new THREE.Vector3(6.25, -11.450, KEY_Z)],
    
    ["four",     1, 42, new THREE.Vector3(0.85, -12.450, KEY_Z)],
    ["five",     1, 43, new THREE.Vector3(2.2,  -12.450, KEY_Z)],
    ["six",      1, 44, new THREE.Vector3(3.55, -12.450, KEY_Z)],
    ["multiply", 1, 45, new THREE.Vector3(4.9,  -12.450, KEY_Z)],
    ["divide",   1, 46, new THREE.Vector3(6.25, -12.450, KEY_Z)],
    
    ["one",   1, 42, new THREE.Vector3(0.85, -13.450, KEY_Z)],
    ["two",   1, 43, new THREE.Vector3(2.2,  -13.450, KEY_Z)],
    ["three", 1, 44, new THREE.Vector3(3.55, -13.450, KEY_Z)],
    ["plus",  1, 45, new THREE.Vector3(4.9,  -13.450, KEY_Z)],
    ["minus", 1, 46, new THREE.Vector3(6.25, -13.450, KEY_Z)],
    
    ["zero",  1, 48, new THREE.Vector3(0.85, -14.450, KEY_Z)],
    ["dot",   1, 49, new THREE.Vector3(2.2,  -14.450, KEY_Z)],
    ["exp",   1, 50, new THREE.Vector3(3.55, -14.450, KEY_Z)],
    ["ans",   1, 51, new THREE.Vector3(4.9,  -14.450, KEY_Z)],
    ["exe",   1, 52, new THREE.Vector3(6.25, -14.450, KEY_Z)],
], keyboard);

// Calculator parts
var calculator_body = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: tex_loader.load("textures/out/body.png")
}));
calculator.add(calculator_body);
var calculator_button_zero = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: tex_loader.load("textures/out/button-zero.png")
}));
calculator.add(calculator_button_zero);
var calculator_screen = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({
    map: tex_loader.load("https://threejsfundamentals.org/threejs/resources/images/wall.jpg")
}));
calculator.add(calculator_screen);
var calculator_screen_protection = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshPhysicalMaterial({
	color: 0x000000,
	metalness: 0,
	roughness: 0,
	depthWrite: false,
	transparency: 0.9, 
	opacity: 1,
	transparent: true
}));
calculator.add(calculator_screen_protection);

scene.add(calculator);

// Lights
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.95 );
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight);
var light = new THREE.AmbientLight(0x505050); // soft white light
scene.add(light);

// Load things.
obj_loader.load(
    'models/calculator.obj',
    function(obj) {
        calculator_body.geometry = obj.children[0].geometry;
        calculator_screen.geometry = obj.children[5].geometry;
        calculator_screen_protection.geometry = obj.children[6].geometry;
        
        calculator_body.rotation.x = 3.14159226/2;
        calculator_screen.rotation.x = 3.14159226/2;
        calculator_screen_protection.rotation.x = 3.14159226/2;
        
        calculator_screen.position.set(1.15, -1.15, 0.8);
        calculator_screen_protection.position.set(0.85, -0.85, 0.9);
        
        
        load_keyboard_model(keyboard, obj);
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
