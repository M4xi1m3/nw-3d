
import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';
import {OBJLoader} from 'https://unpkg.com/three@0.118.3/examples/jsm/loaders/OBJLoader.js';
import {OrbitControls} from 'https://unpkg.com/three@0.118.3/examples/jsm/controls/OrbitControls.js';
import Stats from 'https://unpkg.com/three@0.118.3/examples/jsm/libs/stats.module.js';

const KEY_Z = 0.95;
const KEY_Z_PUSH = 0.85;

var container = document.createElement('div');
document.body.appendChild(container);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

container.appendChild(renderer.domElement);

var stats = new Stats();
container.appendChild(stats.dom);
stats.showPanel(1);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableKeys = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.maxDistance  = 30;
var obj_loader = new OBJLoader();
var tex_loader = new THREE.TextureLoader();
var cub_loader = new THREE.CubeTextureLoader();

var calculator = new THREE.Group();
var keyboard = new THREE.Group();

calculator.add(keyboard);

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var keyHeldDown = null;

var scene_map = cub_loader.load([
    'textures/sky/3.png',
    'textures/sky/1.png',
    'textures/sky/2.png',
    'textures/sky/4.png',
    'textures/sky/5.png',
    'textures/sky/6.png'
]);

scene.background = scene_map;

// console.log(document.getElementById('canvas'));
var screen_texture = new THREE.CanvasTexture(document.getElementById('canvas'));
screen_texture.minFilter = THREE.LinearFilter;
screen_texture.magFilter = THREE.LinearFilter;

function populate_keyboard(data, obj) {
    var init_geometry = new THREE.BufferGeometry();

    for(var i in data) {
        var key = data[i];
        
        var texture = tex_loader.load("textures/omega/button-" + key[0] + ".png");
        
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        // texture.anisotropy = 16;
        
        var temp_obj = new THREE.Mesh(init_geometry, new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: texture
        }));
        
        temp_obj.position.copy(key[3]);
        
        temp_obj.userData = {
            modelId: key[1],
            dataKey: key[2]
        };
        
        temp_obj.rotation.x = 3.14159226/2;
        
        temp_obj.castShadow = true;
        temp_obj.receiveShadow = false;
        
        keyboard.add(temp_obj);
    }
}

function load_keyboard_model(keyboard, obj) {
    for (var i in keyboard.children) {
        keyboard.children[i].geometry = obj.children[keyboard.children[i].userData.modelId].geometry;
    }
}


populate_keyboard([
    ["cross", 3, "cross",      new THREE.Vector3(0.85, -6.425, KEY_Z)],
    ["ok",    2, 4,            new THREE.Vector3(5.25, -6.975, KEY_Z)],
    ["back",  2, 5,            new THREE.Vector3(6.35, -6.975, KEY_Z)],
    ["home",  1, 6,            new THREE.Vector3(3.5,  -6.575, KEY_Z)],
    ["power", 1, "power",      new THREE.Vector3(3.5,  -7.575, KEY_Z)],
    
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
    
    
    ["seven",             1, 30, new THREE.Vector3(0.85, -11.450, KEY_Z)],
    ["eight",             1, 31, new THREE.Vector3(2.2,  -11.450, KEY_Z)],
    ["nine",              1, 32, new THREE.Vector3(3.55, -11.450, KEY_Z)],
    ["left-parenthesis",  1, 33, new THREE.Vector3(4.9,  -11.450, KEY_Z)],
    ["right-parenthesis", 1, 34, new THREE.Vector3(6.25, -11.450, KEY_Z)],
    
    ["four",     1, 36, new THREE.Vector3(0.85, -12.450, KEY_Z)],
    ["five",     1, 37, new THREE.Vector3(2.2,  -12.450, KEY_Z)],
    ["six",      1, 38, new THREE.Vector3(3.55, -12.450, KEY_Z)],
    ["multiply", 1, 39, new THREE.Vector3(4.9,  -12.450, KEY_Z)],
    ["divide",   1, 40, new THREE.Vector3(6.25, -12.450, KEY_Z)],
    
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
var body_texture = tex_loader.load("textures/omega/body.png");
body_texture.minFilter = THREE.LinearFilter;
body_texture.magFilter = THREE.LinearFilter;

var calculator_body = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: body_texture
}));
calculator.add(calculator_body);

calculator_body.castShadow = false;
calculator_body.receiveShadow = true;
var calculator_screen = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: new THREE.Color(1, 1, 1),
    emissiveMap: screen_texture
}));

calculator_screen.castShadow = false;
calculator_screen.receiveShadow = true;
calculator.add(calculator_screen);
var calculator_screen_protection = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({
	transparent: true,
	opacity: 0.15,
	depthWrite: true,
	
	color: 0xFFFFFF,
	emissive: 0x000000,
	roughness: 0,
	metalness: 0.5,
	
	envMap: scene_map,
	envMapIntensity: 10.0,
}));

calculator_screen_protection.castShadow = false;
calculator_screen_protection.receiveShadow = true;
calculator.add(calculator_screen_protection);

scene.add(calculator);

// Lights
var targetObject = new THREE.Object3D();
targetObject.position.set(-0, -16, -0);
scene.add(targetObject);
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.95 );
directionalLight.position.set(10, 0, 10);
directionalLight.target = targetObject;
directionalLight.castShadow = true;
directionalLight.shadow.camera.right    =  5;
directionalLight.shadow.camera.left     = -5;
directionalLight.shadow.camera.top      =  5;
directionalLight.shadow.camera.bottom   = -5;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.bias = 0.0001;

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

var Module;
(function () {
    var mainCanvas = document.getElementById('canvas');
    // var secondaryCanvasContext = document.getElementById('secondary-canvas').getContext('2d');
    var epsilonLanguage = document.documentElement.lang || window.navigator.language.split('-')[0];
    Module = {
        canvas: mainCanvas,
        arguments: ['--language', epsilonLanguage],
        onDisplayRefresh: function() {
            screen_texture.needsUpdate = true;
            // animate();
        },
        doNotCaptureKeyboard: true,
        env: {
            "SDL_HINT_EMSCRIPTEN_KEYBOARD_ELEMENT": "#canvas"
        }
    }
    
    Epsilon(Module);
}());


function animate() {
    requestAnimationFrame(animate);
    
    controls.update();
    
    renderer.render(scene, camera);
    
    stats.update();
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
/*
document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
*/
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('touchstart', onDocumentMouseDown, false);

function onDocumentMouseDown( event ) {

event.preventDefault();

    if ("touches" in event) {
        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
    }

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    camera.updateMatrixWorld();
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(keyboard.children);

    if (intersects.length >= 1 && keyHeldDown == null) {
        keyHeldDown = intersects[0].object;

        if (keyHeldDown.userData.dataKey != "cross") {

            if (keyHeldDown.userData.dataKey != "power") {
                Module._IonSimulatorKeyboardKeyUp(keyHeldDown.userData.dataKey);
            } else {
                if (calculator_screen.material.emissive.r == 0) {
                    calculator_screen.material.emissive = new THREE.Color(1, 1, 1);
                } else {
                    calculator_screen.material.emissive = new THREE.Color(0, 0, 0);
                }
                console.log(calculator_screen);
            }
            
            keyHeldDown.position.setZ(KEY_Z_PUSH);
            Module._IonSimulatorKeyboardKeyDown(keyHeldDown.userData.dataKey);
        } else {
            if (intersects[0].point.y >= -7.124) {
                // up
                keyHeldDown.rotation.x = 31 * 3.14159226/64;
                keyHeldDown.position.setZ(KEY_Z - 0.05);
                Module._IonSimulatorKeyboardKeyDown(1);
            } else if (intersects[0].point.y <= -7.724) {
                // down
                keyHeldDown.rotation.x = 33 * 3.14159226/64;
                keyHeldDown.position.setZ(KEY_Z + 0.05);
                Module._IonSimulatorKeyboardKeyDown(2);
            } else if (intersects[0].point.x >= 2.15) {
                // right
                keyHeldDown.rotation.z = -1 * 3.14159226/64;
                keyHeldDown.position.setZ(KEY_Z + 0.05);
                Module._IonSimulatorKeyboardKeyDown(3);
            } else if (intersects[0].point.x <= 1.55) {
                // left
                keyHeldDown.rotation.z = 1 * 3.14159226/64;
                keyHeldDown.position.setZ(KEY_Z - 0.05);
                Module._IonSimulatorKeyboardKeyDown(0);
            }
        }
    }
}

document.addEventListener('mouseup', onDocumentMouseUp, false);
document.addEventListener('touchend', onDocumentMouseUp, false);

function onDocumentMouseUp( event ) {

    event.preventDefault();

    if (keyHeldDown != null) {
        if (keyHeldDown.userData.dataKey != "cross") {
        keyHeldDown.position.setZ(KEY_Z);
            if (keyHeldDown.userData.dataKey != "power") {
                Module._IonSimulatorKeyboardKeyUp(keyHeldDown.userData.dataKey);
            }
        } else {
            keyHeldDown.rotation.x = 3.14159226/2;
            keyHeldDown.rotation.y = 0;
            keyHeldDown.rotation.z = 0;
            keyHeldDown.position.setZ(KEY_Z);
            Module._IonSimulatorKeyboardKeyUp(0);
            Module._IonSimulatorKeyboardKeyUp(1);
            Module._IonSimulatorKeyboardKeyUp(2);
            Module._IonSimulatorKeyboardKeyUp(3);
        }

        keyHeldDown = null;
    }
}

animate();

