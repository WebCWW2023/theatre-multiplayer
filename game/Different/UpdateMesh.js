import * as THREE from "three";
import { positionGUI, scaleGUI } from "../common/CommonFunction.js";
import { objectArray, scene } from "../game.js";


const UpdateMesh = (gui) => {

    let glassObjectsNames = ['cage_fglass', 'Plane124', 'Plane125', 'Line009', 'Line008', 'Plane122', 'Plane123','screen_back_wall'];
    glassObjectsNames.map(item => {
        let glassObject = scene.getObjectByName(item);
        glassObject.material = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
        });
    });
    // TODO add all mesh name to elumenate
    // let statuesNames = ['statue_005', 'statue_02', 'unicorn_body004', 'unicorn_body005', 'statue_018', 'statue_017', 'lady_statue002', 'lady_statue003'];
    // statuesNames.map(item => {
    //     let statuesNames = scene.getObjectByName(item);
    //     statuesNames.material = new THREE.MeshPhongMaterial({
    //         flatShading: false,
    //         shininess: 100,
    //         color: 0x6db2d9,
    //         emissive: 0x6db2d9,
    //         specular: 0x70758f,
    //     });
    // });
    let transparentObjectNames = ['Plane',];
    transparentObjectNames.map(item => {
        let transparentObject = scene.getObjectByName(item);
        transparentObject.material = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
        })
    });
    // let underWaterDomeGlass = scene.getObjectByName('glass10');
    // underWaterDomeGlass.material.transparent = true;
    // underWaterDomeGlass.material.opacity = 0;
    // underWaterDomeGlass.material.depthTest = true;
    // underWaterDomeGlass.material.depthWrite = false;
    let glassDome = scene.getObjectByName('Shape004');
    glassDome.material.transparent = true;
    glassDome.material.opacity = 0;
    glassDome.material.depthTest = true;
    glassDome.material.depthWrite = false;
    /*-----------------alpha-------------------*/
    // var shop1_alpha = new THREE.TextureLoader().load('../../static/texture/shop1_alpha.png');
    // let shop1 = hall.scene.getObjectByName('Shop_03_011');
    // shop1.material.alphaMap = shop1_alpha;
    // shop1.material.transparent = true;
    // shop1.material.opacity = 1;
}

const addObjectToArray = (object) => {
    switch (object.material.name) {
        case '01':
            break;
        case 'vray_Material.016':
            break;
        default:
            objectArray.push(object);
            break;
    }
}
export { UpdateMesh, addObjectToArray }
