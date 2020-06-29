
import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';
import {OBJLoader} from 'https://unpkg.com/three@0.118.3/examples/jsm/loaders/OBJLoader.js';
import {OrbitControls} from 'https://unpkg.com/three@0.118.3/examples/jsm/controls/OrbitControls.js';

export default function() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var controls = new OrbitControls(camera, renderer.domElement);
    var loader = new OBJLoader();


    var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    var calculator_body = new THREE.Mesh(new THREE.BufferGeometry(), material);
    scene.add(calculator_body);
    
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.x = 1;
    directionalLight.position.z = 1;
    scene.add( directionalLight );
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
    
    loader.load(
        'models/calculator.obj',
        function(obj) {
            calculator_body.geometry = obj.children[0].geometry;
            
            calculator_body.scale.x = 1;
            calculator_body.scale.y = 1;
            calculator_body.scale.z = 1;
            
            calculator_body.rotation.x = 3.14159226/2;
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
}
