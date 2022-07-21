import * as THREE from 'three';
import { Style } from '../model/Style';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';


export class Scene {

    constructor(width, height) {
        this._width = width || window.innerWidth;
        this._height = height || window.innerHeight;

        this._layers = {
                lot: 1,
           building: 2, 
               road: 3, 
             forest: 4,
              water: 5,
               land: 6,
             region: 7,
              field: 8
        }

        let minDistance = 0.5;
        let maxDistance = 1200;


        this.createScene();
        this.createClock();
        this.createCamera();
        this.createRenderer();
        this.createLights();
        // this.createControls(minDistance, maxDistance);

        // console.log(this.controls)
    }

    // Initialize views
    init() {
        // const forestView = new Forest(this, this.layers.forest).init(150, 160);

        this.animate();
    }


    createScene() {
        this._scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2( 0xffffff, 0.0005 );
        this.scene.background =  new THREE.Color( Style.colorBackground );
    }

    createCamera(type = "PerspectiveCamera", fov = 45, aspect = null, near = 1, far = 20000) {
        aspect = aspect || window.innerWidth / window.innerHeight;
        if(type == "PerspectiveCamera") { 
            this._camera = new THREE.PerspectiveCamera( fov, aspect, near, far);
        }

        Object.entries(this.layers).forEach(([name, layer]) => {
            this.camera.layers.enable(layer);
        });
        // this.camera.position.set( 0, 20, 200);
        this.camera.position.set( 0, 600, 200);
 
    }

    createRenderer() {
        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.gammaOutput = true;
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        document.body.prepend( this.renderer.domElement );
    }

    createLights() {
        this._ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(this.ambientLight);
      
        this._directionaLight = new THREE.DirectionalLight(0xffffff, 0.75);
        this.directionalLight.position.set(965, 768, 600);
        // this.dirLight.castShadow = true;

        var sz = window.innerWidth / 4;
        this.directionalLight.shadow.mapSize.set(window.innerWidth, window.innerHeight) ; // default
        this.directionalLight.shadow.camera.near = 0.5; // default
        this.directionalLight.shadow.camera.far = 1000; // default
        this.directionalLight.shadow.camera.left = sz;
        this.directionalLight.shadow.camera.bottom = sz;
        this.directionalLight.shadow.camera.right = -sz;
        this.directionalLight.shadow.camera.top = -sz;
        this.directionalLight.castShadow = true

        this.scene.add(this.directionalLight);
    }


    createClock() {
        this._clock = new THREE.Clock(); 
    }

    createControls(minDistance = 0.5, maxDistance = 1200) {
        this._controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = minDistance;
        this.controls.maxDistance = maxDistance;
    }

    animate() {
        requestAnimationFrame(()=>this.animate());
        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    showGUI() {
        this.gui = new GUI();

        const gui_layers = {}
        const lightFolder = this.gui.addFolder('Light')
        const width = window.innerWidth;
        const height = window.innerHeight;
        lightFolder.add(this.directionalLight.position, 'x', -width, width)
        lightFolder.add(this.directionalLight.position, 'y', -height, height)
        lightFolder.add(this.directionalLight.position, 'z', -width, width)
        lightFolder.addColor(this.directionalLight, 'color' )
        lightFolder.add(this.directionalLight, 'intensity', 0, 1)

        // for(var [key, layer] of Object.entries(this.layers)) {
        //     // gui_layers[`toggle ${key} layer`]
        //     layersFolder.add( gui_layers, `toggle ${key} layer`);

        // }
        // layersFolder.add( gui_layers, 'enable all' );
        // layersFolder.add( gui_layers, 'disable all' );
    }

    get controls() {
        return this._controls;
    }

    get layers() {

        return this._layers;
    }
    
    get scene() {
        return this._scene;
    }

    get renderer() {
        return this._renderer;
    }

    get camera() {
        return this._camera;
    }

    get clock() {
        return this._clock;
    }

    get directionalLight() {
        return this._directionaLight;
    }

    get ambientLight() {
        return this._ambientLight;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

}