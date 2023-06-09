import * as THREE from "three";
import { Water } from "../../cdn/newadded/Water.js";
import { scene } from "../game.js";
import { positionGUI, rotationGUI, scaleGUI } from "../common/CommonFunction.js";

const Water1M = (gui, cityGroup, water1) => {
    const waterGeometry = new THREE.CircleGeometry(10, 32);
    water1 = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('../../static/texture/water1.jpg', function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            waterColor: 0x001e0f,
            distortionScale: 3.7,
        }
    );
    water1.rotation.x = - Math.PI / 2;
    water1.rotation.z = 11;
    water1.position.set(-0.1, 1.2, 145.1);
    water1.scale.set(7, 7, 1);
    water1.name = 'water1';
    water1.visible = false;
    positionGUI(gui, water1, 'water')
    rotationGUI(gui, water1, 'water')
    scaleGUI(gui, water1, 'water')
    cityGroup.add(water1);
}
export { Water1M }