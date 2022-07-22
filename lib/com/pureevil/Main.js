import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as PureEvil from './PureEvil';
import {ForestScene} from '../../examples/forests/ForestScene';
// import { TreeShaderScene } from '../../examples/shaders/TreeShaderScene';


function init() {
    const scene = new ForestScene();
    // const scene = new TreeShaderScene()
    scene.init();

    const controls = new OrbitControls(scene.camera, scene.renderer.domElement);
    controls.minDistance = 0.5;
    controls.maxDistance = 1200;
    scene.showGUI();
    const layersFolder = scene.gui.addFolder("Layers");
    const gui_layers = {
        'toggle voronoi': function() {
            scene.camera.layers.toggle(7);
        }
    }

    // const treeFolder = scene.gui.addFolder("Trees");
    // treeFolder.add(scene, 'pineCount', 0, 500)
    // treeFolder.add(scene, 'deciduousCount', 0, 500)
    layersFolder.add(gui_layers, 'toggle voronoi')
    scene.camera.layers.toggle(7);
    scene.gui.close();
}


init();