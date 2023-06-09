import * as THREE from 'three';
import { fogGUI } from './common/CommonFunction.js';

const sceneM = (gui) => {
    let scene = new THREE.Scene();
    // const cubeTextureLoader = new THREE.CubeTextureLoader()
    // cubeTextureLoader.generateMipmaps = false;
    // cubeTextureLoader.minFilter = THREE.LinearFilter;
    // cubeTextureLoader.magFilter = THREE.LinearFilter;
    // cubeTextureLoader.needsUpdate = true;
    // const environmentMap = cubeTextureLoader.load([
    //     '../static/texture/cube/px.png',
    //     '../static/texture/cube/nx.png',
    //     '../static/texture/cube/py.png',
    //     '../static/texture/cube/ny.png',
    //     '../static/texture/cube/pz.png',
    //     '../static/texture/cube/nz.png' 
    // ])

    // scene.background = environmentMap  
    // scene.background = new THREE.Color('blue')
    scene.fog = new THREE.Fog(0xffffff, 164.2, 705);
    // gui.add(scene.fog, 'near', 0, 1000, 0.1)
    // gui.add(scene.fog, 'far', 0, 1000, 0.1)
    return scene;
}

export { sceneM }