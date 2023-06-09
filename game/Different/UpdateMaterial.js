import * as THREE from "three";
import { bannerNameArray } from "../game.js";

var texture1 = new THREE.TextureLoader().load('../static/texture/banner.jpg');
texture1.flipY = false;
texture1.minFilter = THREE.LinearFilter;
var videBannerTexture = new THREE.TextureLoader().load('../static/texture/videoBanner.png');
videBannerTexture.flipY = false;
videBannerTexture.minFilter = THREE.LinearFilter;

let glassColor = new THREE.Color(0x575757);
const wallGlassMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5, color: glassColor });
const banner1_material1 = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide });
const banner1_material2 = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide });
const banner1_material3 = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide });
const banner1_material4 = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide });


const UpdateMaterial = (object) => {

    let type;
    switch (object.material.name) {
        /*-----------------hoardings-------------------*/
        case 'T1_standy_1.001':
            object.material = banner1_material1;
            bannerNameArray.push(object.name);
            break;
        case 'T2_standy_1.001':
            object.material = banner1_material2;
            bannerNameArray.push(object.name);
            break;
        case 'T3_standy_1.001':
            object.material = banner1_material3;
            bannerNameArray.push(object.name);
            break;
        case 'T4_standy_1.001':
            object.material = banner1_material4;
            bannerNameArray.push(object.name);
            break;
        /*-----------------video-------------------*/
        case 'T1_S1.001':
            object.material.map = videBannerTexture;
            break;
        case 'theater_screen.002':
            object.material.map = videBannerTexture;
            break;
        case 'T3_S1.001':
            object.material.map = videBannerTexture;
            break;
        case 'T4_S1.001':
            object.material.map = videBannerTexture;
            break;


        default:
            break;
    }



}

export { UpdateMaterial }