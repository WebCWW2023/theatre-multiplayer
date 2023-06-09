import * as THREE from 'three';

var spriteCloudTransparent = true;
var spriteCloudDepthWrite = false;
var spriteCloudDepthTest = true;
var spriteCloudOpacity = 0.8;
var spriteCloudBlending = THREE.NormalBlending;

const cloudM = (cloudNormalSpriteGroup,cloudsToUpdate,cityGroup) => {
    const cloud1Map = new THREE.TextureLoader().load('../../static/texture/cloud/1.png');
    const cloud2Map = new THREE.TextureLoader().load('../../static/texture/cloud/2.png');
    const cloud3Map = new THREE.TextureLoader().load('../../static/texture/cloud/3.png');
  

    const cloudG = new THREE.PlaneGeometry(30, 30);

    const cloud1M = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: cloud1Map,
        transparent: spriteCloudTransparent,
        opacity: spriteCloudOpacity,
        blending: spriteCloudBlending,
        depthWrite: spriteCloudDepthWrite,
        depthTest: spriteCloudDepthTest,

    });


    const cloud2M = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: cloud2Map,
        transparent: spriteCloudTransparent,
        opacity: spriteCloudOpacity,
        blending: spriteCloudBlending,
        depthWrite: spriteCloudDepthWrite,
        depthTest: spriteCloudDepthTest,

    });

    const cloud3M = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: cloud3Map,
        transparent: spriteCloudTransparent,
        opacity: spriteCloudOpacity,
        blending: spriteCloudBlending,
        depthWrite: spriteCloudDepthWrite,
        depthTest: spriteCloudDepthTest,

    });  
    const cloud1 = new THREE.Mesh(cloudG, cloud1M)
    const cloud2 = new THREE.Mesh(cloudG, cloud2M)
    const cloud3 = new THREE.Mesh(cloudG, cloud3M) 

    let cloudNormalArray = [
        cloud1,
        cloud2,
        cloud3, 
    ]
    cloudNormalArray.map((cloud) => {
        cloud.rotation.set(Math.PI * 0.5, 0, 0)
        cloud.scale.set(10, 10, 10)
        for (let i = 0; i < 10; i++) {
            let cloudMesh = cloud.clone();

            const angle = Math.random() * Math.PI * 2 // Random angle
            const radius = 100 + Math.random() * 100      // Random radius
            const x = Math.cos(angle) * radius        // Get the x position using cosinus
            const z = Math.sin(angle) * radius        // Get the z position using sinus
            cloudMesh.position.set(x, i * 3 * Math.random(), z)
            cloudsToUpdate.push(cloudMesh)
            cloudNormalSpriteGroup.add(cloudMesh)
        }

    })
    cloudNormalSpriteGroup.position.set(0, 10, 0)
    cityGroup.add(cloudNormalSpriteGroup)
}

export { cloudM }