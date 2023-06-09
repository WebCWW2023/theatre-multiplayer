import * as THREE from "three";
import { scene, videoMeshArray, } from "../game.js";

const VideoPlay = (object) => {
    switch (object.material.name) {
        case 'T1_S1.001':
            videoMeshArray.push(object);
            break;
        case 'theater_screen.002':
            videoMeshArray.push(object);
            break;
        case 'T3_S1.001':
            videoMeshArray.push(object);
            break;
        case 'T4_S1.001':
            videoMeshArray.push(object);
            break;
        default:
            break;
    }
}

let previousVideoMesh;
let videoDiv = document.getElementById('ytVideo1');
const addVideoTexture = (objectName, path) => {  
    let videoScreen = scene.getObjectByName(objectName);
    console.log('videoScreen:',videoScreen )
    if (previousVideoMesh === objectName) {
        if (videoDiv.paused) {
            videoDiv.play();
        } else {
            videoDiv.pause();
        }
    }
    else {
        previousVideoMesh = objectName
        videoDiv.pause();
        videoDiv.src = path;
        videoDiv.currentTime = 0;
        videoDiv.play();
        let videoTexture = new THREE.VideoTexture(videoDiv);
        videoTexture.flipY = false;
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoScreen.material.map = videoTexture;
        videoScreen.material.needsUpdate = true;
    }
}
export { VideoPlay, videoMeshArray, addVideoTexture }