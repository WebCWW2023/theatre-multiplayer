const socket = io();
var socketName;
/*-----------------canvas-------------------*/
import * as THREE from "three";
import * as DAT from "../cdn/newadded/dat.js";
import { GLTFLoader } from "../cdn/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "../cdn/jsm/loaders/fbx_lib/FBXLoader.js";
import { DRACOLoader } from "../cdn/jsm/loaders/DRACOLoader.js";

import { Water } from "../cdn/newadded/Water.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "../cdn/jsm/renderers/CSS2DRenderer.js";
import { ambientLightM, directionalLightM, hemisphereLightM } from "./Light.js";
import { resizeM } from "./Resize.js";
import { sceneM } from "./Scene.js";
import { remoteUser, startBasicCall, startVoice } from "./voice/voice.js";
import { changeAnimation } from "./animation/ChangeAnimation.js";
import { UpdateMaterial } from "./Different/UpdateMaterial.js";
import { CharAnimation, JumpAnimation } from "./animation/CharAnimation.js";
import { ChangeView } from "./common/ChangeView.js";
import { addObjectToArray, UpdateMesh } from "./Different/UpdateMesh.js";
import {
  characterMeshPosition,
  teleportNameArray,
} from "./Different/ObjectPosition.js";
import { FullScreenM } from "./common/FullScreen.js";
import { Stats } from "../cdn/newadded/stats.js";
import { addBanner } from "./updateTexture/UpdateTexture.js";
import { positionGUI, rotationGUI, scaleGUI } from "./common/CommonFunction.js";
import { createHeart } from "./common/CreateHeart.js";
import { saveFile } from "./common/screenshot.js";
import { cloudM } from "./Different/Cloud.js";
import { Water1M } from "./Different/WaterSphere.js";
import { Sitting } from "./Different/Sitting.js";
import { VideoPlay, addVideoTexture } from "./Different/VideoPlay.js";

/*----------------- gui -------------------*/
var gui;
// gui = new DAT.GUI();
var lightGui = false;
var statsGui = false;
// gui.close();
/*-----------------url-------------------*/
let url_str = window.location.href;
let url = new URL(url_str);
let search_params = url.searchParams;
var avtarId = search_params.get("id");
var avtarName = search_params.get("name");
var isadmin = search_params.get("isadmin");
var roomName = search_params.get("room");
// var sceneid = search_params.get("scene");
var selectedBannername;

/*-----------------window-------------------*/
var globalUrl = "https://digimetaverse.live/";
let notFound = "../static/texture/banner.jpg";
var strDownloadMime = "image/octet-stream";
const isMobile = /Mobi/.test(navigator.userAgent);
var canvas,
  renderer,
  labelRenderer,
  scene,
  mainModel,
  keyboard = new THREEx.KeyboardState(),
  sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  modelMixer = [],
  modelAction,
  water1,
  water1Object,
  fishObject1,
  fishObject2,
  fishObject3,
  fishObject4,
  fishObject5,
  fishObject6,
  fishObject7,
  stats,
  manager,
  loader,
  textureLoader,
  resources,
  loadedCount = 0,
  totalCount,
  cloudsToUpdate = [],
  envmap1,
  envmap2,
  envmap3,
  envmap4,
  envmap5;
/*-----------------avtar-------------------*/
var walkspeed = 14.0;
var walkspeedSlow = 14.0;
var walkspeedFast = 20.0;
var walkRotateSpeed = 1.0;
var avtarViewCount = 0;
var isSpeed = false;
var avtarAnimation = "Idle";

var characterMeshRotation = {},
  characterMeshScale = {
    x: 0.5,
    y: 0.5,
    z: 0.5,
  },
  characterPosition = {
    x: 0,
    y: -1.2,
    z: 0,
  },
  avtarlabelPosition = {

    x: 0,
    y: 0.7,
    z: 0,
  },
  avtarlabelPositionOther = {
    x: 0,
    y: 0.9,
    z: 0,
  },
  characterScale = {
    x: 1,
    y: 1,
    z: 1,
  },
  chracterCameraPosition = {
    x: 0,
    y: 0.6,
    z: 5.5,
  },
  characterYWalkingPosition = 1.2;

var animationsArray = {};
var isAnimationFirstTime = false;
var isFirstTimeLoaded = true;
var characherMixerArray = {};
var isPlayerFirsttimeLoaded = true;
var sittingMeshArray = [];
var videoMeshArray = [];
var loadingManager;
/*-----------------raycaster-------------------*/
var objectArray = [];
var playersPeer = {};
var playersPeerData = {};
var playersPeerToggle = {};

let rayDownTarget = new THREE.Vector3(0, -Math.PI, 0);
rayDownTarget.normalize();
let rayForwardTargetVector = new THREE.Vector3(0, 0, 1);
let rayBackwordTargetVector = new THREE.Vector3(0, 0, -Math.PI);
let rayRightTargetVector = new THREE.Vector3(-1, 0, 0);
let rayLeftTargetVector = new THREE.Vector3(0, 0, 1);

var cameraRaycasterForward,
  cameraRaycasterBackward,
  cameraRaycasterLeft,
  cameraRaycasterRight,
  cameraRaycasterDown,
  forwardIntersectedObjects,
  backwardIntersectedObjects,
  leftIntersectedObjects,
  rightIntersectedObjects,
  downIntersectedObjects,
  enableForward = true,
  enableBackward = true,
  enableRight = true,
  enableLeft = true,
  colliderDistanceFB = 2.0,
  colliderDistanceLR = 2.0,
  arrowHelper;
/*-----------------camera-------------------*/
var mouse = new THREE.Vector2();
/*-----------------animate-------------------*/
var clock = new THREE.Clock(),
  previousTime = 0;
let flagV = new THREE.Vector3();

/*-----------------group-------------------*/
var playerGroup = new THREE.Group();
playerGroup.name = "playerGroup";
var cityGroup = new THREE.Group();
cityGroup.name = "cityGroup";
var lightGroup = new THREE.Group();
lightGroup.name = "lightGroup";
var helperGroup = new THREE.Group();
helperGroup.name = "helperGroup";
var demoGroup = new THREE.Group();
demoGroup.name = "demoGroup";
var iframeGroup = new THREE.Group();
iframeGroup.name = "iframeGroup";
var heartsGroup = new THREE.Group();
heartsGroup.name = "heartsGroup";
var cloudNormalSpriteGroup = new THREE.Group();
cloudNormalSpriteGroup.name = "cloudNormalSpriteGroup";
/*-----------------texure-------------------*/
var bannerNameArray = [];
var bannerMeshArray = [];
var mouseRaycaster = new THREE.Raycaster();
/*-----------------joystick-------------------*/
var joystickX = 0,
  joystickY = 0;
var isJoystickTouched = false;
/*-----------------dom-------------------*/
var textureUpdate = document.querySelector(".textureUpdate");
var textureUpdateForm = document.querySelector(".textureUpdateForm");
var bannerImage = document.querySelector(".bannerImage");

var loadingScreenContainer = document.querySelector(".loadingScreenContainer");
var joystick = document.getElementById("joystick");
var stick = document.getElementById("stick");
var booster_button = document.querySelector(".booster_button");

var screenButtonToggle = document.querySelector(".screenButtonToggle");
var screenButtonBottom = document.querySelector(".screenButtonBottom");

var callButton = document.querySelector(".callButton");
var selfMute = document.querySelector(".selfMute");
var fullScreen = document.querySelector(".fullScreen");

var shortcutB = document.querySelector(".shortcutB");
var viewB = document.querySelector(".viewB");
var raiseB = document.querySelector(".raiseB");
var shakeB = document.querySelector(".shakeB");
var createEmoji = document.querySelector(".createEmoji");
var screenshot = document.querySelector(".screenshot");
var screenButtonsEmoji = document.querySelector(".screenButtonsEmoji");

const smallMap = document.querySelector(".smallMap");
const smallAvtar = document.querySelector(".smallAvtar");
const newPlayerJoin = document.querySelector(".newPlayerJoin");

var shorcutKeyScreen = document.querySelector(".shorcutKeyScreen");
var loadingCount = document.querySelector(".loadingCount");
var videoDiv = document.getElementById("ytVideo1");

const htmlEvents = () => {
  fullScreen.style.display = "flex";
  callButton.style.display = "none";
  selfMute.style.display = "flex";
  shorcutKeyScreen.style.display = "flex";
 screenButtonToggle.addEventListener("click", () => {
    if (screenButtonBottom.style.display !== "flex") {
      screenButtonBottom.style.display = "flex";
      screenButtonToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      screenButtonBottom.style.display = "none";
      screenButtonsEmoji.style.display = "none";
      screenButtonToggle.innerHTML =
        '<i class="fas fa-angle-double-right"></i>';
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.code === "KeyH") {
      shorcutKeyScreen.style.display = "flex";
    }
    if (e.code === "KeyV") {
      if (avtarViewCount === 3) {
        avtarViewCount = 0;
      }
      ChangeView(playersPeer[socketName], avtarViewCount);
      avtarViewCount++;
    }
    if (e.code === "KeyL") {
      let emojiname = "heart";
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      async function createHeartLoop() {
        for (let i = 0; i < 25; i++) {
          createHeart(
            emojiname,
            heartsGroup,
            playersPeer[socketName].children[0].position
          );
          await delay(100); // Wait for one second
        }
      }
      createHeartLoop();

      socket.emit("createEmoji", {
        emojiname: "heart",
        roomName: roomName,
        playerPosition: playersPeer[socketName].children[0].position,
      });
    }
    if (e.code === "KeyC") {
      var imgData;
      try {
        var strMime = "image/jpeg";
        imgData = renderer.domElement.toDataURL(strMime);
        saveFile(imgData.replace(strMime, strDownloadMime), "worldbeyond.jpg");
      } catch (e) {
        return;
      }
    }
    if (
      e.code === "ArrowUp" ||
      e.code === "ArrowDown" ||
      e.code === "ArrowLeft" ||
      e.code === "ArrowRight" ||
      e.code === "KeyW" ||
      e.code === "KeyA" ||
      e.code === "KeyS" ||
      e.code === "KeyD"
    ) {
      updatePlayerLocally("Idle");
      updatePlayerGloally("Idle");
    }
    if (e.code === "Digit1") {
      updatePlayerLocally("Hand_Raise");
      updatePlayerGloally("Hand_Raise");
    }
    if (e.code === "Digit2") {
      updatePlayerLocally("Hand_Shake");
      updatePlayerGloally("Hand_Shake");
    }
  });

  screenshot.addEventListener("click", (e) => {
    var imgData;
    try {
      var strMime = "image/jpeg";
      imgData = renderer.domElement.toDataURL(strMime);
      saveFile(imgData.replace(strMime, strDownloadMime), "worldbeyond.jpg");
    } catch (e) {
      return;
    }
  });
  callButton.addEventListener("click", (e) => {
   
  });
  shortcutB.addEventListener("click", (e) => {
    shorcutKeyScreen.style.display = "flex";
  });

  viewB.addEventListener("click", (e) => {
    if (avtarViewCount === 3) {
      avtarViewCount = 0;
    }
    ChangeView(playersPeer[socketName], avtarViewCount);
    avtarViewCount++;
  });
  raiseB.addEventListener("click", (e) => {
    updatePlayerLocally("Hand_Raise");
    updatePlayerGloally("Hand_Raise");
  });
  shakeB.addEventListener("click", (e) => {
    updatePlayerLocally("Hand_Shake");
    updatePlayerGloally("Hand_Shake");
  });
  createEmoji.addEventListener("click", (e) => {
    if (screenButtonsEmoji.style.display == "flex") {
      screenButtonsEmoji.style.display = "none";
    } else {
      screenButtonsEmoji.style.display = "flex";
      const emojiButtons = document.querySelectorAll(".emojiButton");
      let emojiname;
      emojiButtons.forEach((button) => {
        button.addEventListener("click", () => {
          emojiname = button.getAttribute("title");
          if (emojiname) {
            const delay = (ms) => {
              return new Promise((resolve) => setTimeout(resolve, ms));
            };
            async function createHeartLoop() {
              for (let i = 0; i < 25; i++) {
                createHeart(
                  emojiname,
                  heartsGroup,
                  playersPeer[socketName].children[0].position
                );
                await delay(100);
              }
            }
            createHeartLoop();
            socket.emit("createEmoji", {
              emojiname: emojiname,
              roomName: roomName,
              playerPosition: playersPeer[socketName].children[0].position,
            });
          }
        });
      });
    }
  });

  /*-----------------fullscreen-------------------*/
  FullScreenM(fullScreen);
};
const loadAni = () => {
  /*-----------------load animations-------------------*/
  if (!isAnimationFirstTime) {
    const aniLoader = new FBXLoader(loadingManager);
    CharAnimation("Idle", aniLoader, animationsArray);
    CharAnimation("Walking", aniLoader, animationsArray);
    CharAnimation("Running", aniLoader, animationsArray);
    CharAnimation("Hand_Raise", aniLoader, animationsArray);
    CharAnimation("Hand_Shake", aniLoader, animationsArray);
    CharAnimation("Sitting", aniLoader, animationsArray);
    CharAnimation("SittingF", aniLoader, animationsArray);
    isAnimationFirstTime = true;
  }
};
/*-----------------socket-------------------*/
socket.on("connect", () => {
  socketName = avtarName;
  /*-----------------add player-------------------*/
  socket.emit("addPlayer", {
    socket_id: socket.id,
    socketName2: socketName,
    position: characterMeshPosition,
    rotation: characterMeshRotation,
    color1: Math.random(),
    color2: Math.random() * 0.2 + 0.05,
    avtarId: avtarId,
    avtarName: avtarName,
    roomName: roomName,
    voiceId: null,
  });
});
const init = () => {
  /*-----------------loadingManager-------------------*/
  loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
      loadingScreenContainer.style.display = "none";

      if (isMobile) {
        smallMap.style.display = "none";
        smallAvtar.style.display = "none";
        joystick.style.display = "block";
        booster_button.style.display = "block";
      }
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
      const progressRatio = itemsLoaded / itemsTotal;
      loadingCount.innerHTML = Math.floor(progressRatio * 100) + "%";
      if (progressRatio === 1) {
        Object.keys(playersPeer).map(
          (key) => (playersPeer[key].visible = true)
        );
        loadingCount.style.display = "none";
      }
    }
  );
  /*-----------------load animations-------------------*/
  loadAni();
  /*-----------------canvas-------------------*/
  canvas = document.querySelector("#canvas_floor");
  // const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);
  /*-----------------Renderer-------------------*/
  renderer = new THREE.WebGLRenderer({
    canvas,
    powerPreference: "low-power",
    antialias: true,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.enabled = isMobile ? true : true;

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  document.body.appendChild(labelRenderer.domElement);
  stats = Stats();
  statsGui && document.body.appendChild(stats.dom);
  /*-----------------Scene-------------------*/
  scene = sceneM(gui);

  /*-----------------light-------------------*/
  ambientLightM(gui, lightGroup, 0.1, 0xe7e8fd, lightGui);
  directionalLightM(
    gui,
    lightGroup,
    helperGroup,
    15.9,
    55.2,
    -8.4,
    0,
    0,
    0,
    1.0,
    0xffffff,
    lightGui
  );
  hemisphereLightM(gui, lightGroup, 1, 0xc7dbf5, 0x8888aa, lightGui);
  /*-----------------mainModel okg-------------------*/
  manager = new THREE.LoadingManager();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("../static/draco/");
  loader = new GLTFLoader(manager);
  loader.setDRACOLoader(dracoLoader);

  textureLoader = new THREE.TextureLoader(manager);
  resources = [
    { type: "model", url: "../static/models/glb/2/Theater_01.glb" },
    { type: "model", url: "../static/models/glb/2/Theater_02.glb" },
    { type: "model", url: "../static/models/glb/2/Theater_03.glb" },
    { type: "model", url: "../static/models/glb/2/Theater_04.glb" },
    { type: "model", url: "../static/models/glb/2/Theater_05.glb" },
    { type: "model", url: "../static/models/glb/fish.glb" },
  ];
  loadedCount = 0;
  totalCount = resources.length;
  loadNextResource();

  function loadNextResource() {
    if (resources.length === 0) {
      envmap1 = new THREE.TextureLoader().load("../static/texture/env/0/1.jpg");
      envmap2 = new THREE.TextureLoader().load("../static/texture/env/0/2.jpg");
      envmap3 = new THREE.TextureLoader().load("../static/texture/env/0/3.jpg");
      envmap4 = new THREE.TextureLoader().load("../static/texture/env/0/4.jpg");
      envmap5 = new THREE.TextureLoader().load("../static/texture/env/0/5.jpg");
      envmap1.mapping = THREE.EquirectangularReflectionMapping;
      envmap2.mapping = THREE.EquirectangularReflectionMapping;
      envmap3.mapping = THREE.EquirectangularReflectionMapping;
      envmap4.mapping = THREE.EquirectangularReflectionMapping;
      envmap5.mapping = THREE.EquirectangularReflectionMapping;
      envmap1.encoding = THREE.sRGBEncoding;
      envmap2.encoding = THREE.sRGBEncoding;
      envmap3.encoding = THREE.sRGBEncoding;
      envmap4.encoding = THREE.sRGBEncoding;
      envmap5.encoding = THREE.sRGBEncoding;
      scene.background = envmap1;
      /*-----------------probe-------------------*/
      // let lightProbe = new THREE.LightProbe();
      // lightProbe.copy(LightProbeGenerator.fromCubeTexture(envmap1.mapping));
      // lightProbe.intensity = 3.0;
      // lightGui && gui.add(lightProbe, 'intensity', 0, 10, 0.1)
      // lightGroup.add(lightProbe);
      /*-----------------water-------------------*/
      // Water1M(gui, cityGroup, water1);
      const waterGeometry = new THREE.CircleGeometry(10, 32);
      water1 = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load(
          "../../static/texture/water1.jpg",
          function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          }
        ),
        waterColor: 0x0056ad,
        distortionScale: 10,
      });
      water1.rotation.x = -Math.PI / 2;
      water1.rotation.z = 11;
      water1.position.set(-0.1, 1.0, 145.1);
      water1.scale.set(7, 7, 1);
      water1.name = "water1";
      water1.visible = false;
      cityGroup.add(water1);
      /*-----------------cloud-------------------*/
      cloudM(cloudNormalSpriteGroup, cloudsToUpdate, cityGroup);
      /*-----------------UpdateMesh-------------------*/
      UpdateMesh(gui);
      /*-----------------fish-------------------*/
      water1Object = scene.getObjectByName("water1");
      fishObject1 = scene.getObjectByName("fish1");
      fishObject2 = scene.getObjectByName("fish2");
      fishObject3 = scene.getObjectByName("fish3");
      fishObject4 = scene.getObjectByName("fish4");
      fishObject5 = scene.getObjectByName("fish5");
      fishObject6 = scene.getObjectByName("fish6");
      fishObject7 = scene.getObjectByName("fish7");
      var fish1Alpha = new THREE.TextureLoader().load(
        "../static/texture/fish/Fish_01_alpha.jpg"
      );
      var fish2Alpha = new THREE.TextureLoader().load(
        "../static/texture/fish/Fish_02_alpha.jpg"
      );
      var fish3Alpha = new THREE.TextureLoader().load(
        "../static/texture/fish/Fish_03_alpha.jpg"
      );
      var fish4Alpha = new THREE.TextureLoader().load(
        "../static/texture/fish/Fish_04_alpha.jpg"
      );
      let fish1Mesh = fishObject1.getObjectByName("Plane003");
      fish1Mesh.material.alphaMap = fish1Alpha;
      fish1Mesh.material.transparent = true;
      fish1Mesh.material.opacity = 1;
      let fish2Mesh = fishObject1.getObjectByName("Plane001");
      fish2Mesh.material.alphaMap = fish2Alpha;
      fish2Mesh.material.transparent = true;
      fish2Mesh.material.opacity = 1;
      let fish3Mesh = fishObject1.getObjectByName("Plane002");
      fish3Mesh.material.alphaMap = fish3Alpha;
      fish3Mesh.material.transparent = true;
      fish3Mesh.material.opacity = 1;
      let fish4Mesh = fishObject1.getObjectByName("Plane");
      fish4Mesh.material.alphaMap = fish4Alpha;
      fish4Mesh.material.transparent = true;
      fish4Mesh.material.opacity = 1;
      /*-----------------banner-------------------*/
      if (isFirstTimeLoaded) {
        bannerMeshArray = bannerNameArray.map((item) =>
          scene.getObjectByName(item)
        );
        addBanner();
		   startVoice();
        isFirstTimeLoaded = false;
      }
    }

    const resource = resources.shift();
    if (resource && resource.type === "model") {
      loader.load(resource.url, (gltf) => {
        gltf.scene.traverse((n) => {
          if (n.isMesh) {
            n.castShadow = true;
            n.receiveShadow = true;
            n.material.transparent = false;
            n.material.depthWrite = true;
            n.material.metalness = 0.6;
            n.material.roughness = 0.6;
            UpdateMaterial(n);
            addObjectToArray(n);
            Sitting(n);
            VideoPlay(n);
          }
        });
        if (loadedCount === 5) {
          const model = gltf.scene;
          const fishAnimations = gltf.animations;
          const loadFish = (x, y, z, count) => {
            const clone = model.clone();
            clone.visible = false;
            clone.name = "fish" + count;
            clone.position.set(x, y, z);
            cityGroup.add(clone);
            const mixer = new THREE.AnimationMixer(clone);
            for (let i = 0; i < fishAnimations.length; i++) {
              let action = mixer.clipAction(fishAnimations[i]);
              action.play();
            }
            modelMixer.push(mixer);
          };
          loadFish(-0.2, 6.6, 92.1, 1);
          loadFish(34.7, 10.7, 118.9, 2);
          loadFish(-25.4, 10.7, 118.9, 3);
          loadFish(-36.2, 6.1, 151.8, 4);
          loadFish(-34.4, 17.9, 141.8, 5);
          loadFish(16.1, 7.9, 91.8, 6);
          loadFish(43.6, 7.9, 151.8, 7);
        } else {
          /*-----------------add to scene-------------------*/
          // gltf.scene.scale.set(0.5, 0.5, 0.5);
          gltf.scene.name = "theater" + loadedCount;
          cityGroup.add(gltf.scene);
        }
        loadedCount++;
        loadNextResource();
      });
    } else if (resource && resource.type === "texture") {
      textureLoader.load(resource.url, (texture) => {
        loadedCount++;
        loadNextResource();
      });
    }
  }

  /*-----------------mousemove events-------------------*/

  window.addEventListener("click", (e) => {
    if (playersPeer[socketName]) {
      mouse.x = (e.clientX / sizes.width) * 2 - 1;
      mouse.y = -(e.clientY / sizes.height) * 2 + 1;
      mouseRaycaster.setFromCamera(
        mouse,
        playersPeer[socketName].children[0].children[2]
      );
      const textureUpdateRayCaster =
        mouseRaycaster.intersectObjects(bannerMeshArray);
      if (textureUpdateRayCaster.length > 0) {
        const changeTexture = (name) => {
          if (textureUpdateRayCaster[0].object.name === `${name}`) {
            textureUpdate.style.display = "block";
            selectedBannername = name;
            isadmin != "true" && (textureUpdateForm.style.display = "none");
            var textureImg = new Image();
            textureImg.src = `${globalUrl}/assets/images/texture/${roomName}/${textureUpdateRayCaster[0].object.name}.jpeg`;
            textureImg.onerror = function () {
              bannerImage.setAttribute("src", notFound);
            };
            textureImg.onload = function () {
              bannerImage.setAttribute("src", textureImg.src);
            };
          }
        };
        for (let index = 0; index < bannerMeshArray.length; index++) {
          changeTexture(bannerMeshArray[index].name, index + 1);
        }
      }
      /*-----------------okv video play-------------------*/
      const videoRayCaster = mouseRaycaster.intersectObjects(videoMeshArray);
      if (videoRayCaster.length > 0) {
        switch (videoRayCaster[0].object.name) {
          case "Mesh1632":
            addVideoTexture("Mesh1632", "../../static/video/Panipat.mp4");
            break;
          case "Mesh1678":
            addVideoTexture("Mesh1678", "../../static/video/Transformer.mp4");
            break;
          case "Mesh1635":
            addVideoTexture("Mesh1635", "../../static/video/The Flash.mp4");
            break;
          case "Mesh1633":
            addVideoTexture("Mesh1633", "../../static/video/Fast X.mp4");
            break;
          default:
            alert("try again");
            break;
        }
      }
      /*-----------------sitting-------------------*/
      const sittingRayCaster =
        mouseRaycaster.intersectObjects(sittingMeshArray);
      if (sittingRayCaster.length > 0) {
        const sittingM = (playersPeerData, x, y, z, xr, yr, zr) => {
          // ChangeView(playersPeer[socketName], 0);
          playersPeerData[socketName] = {
            socketName2: socketName,
            position: { x, y, z },
            rotation: new THREE.Euler(xr, yr, zr, "XYZ"),
          };
          setTimeout(() => {
            updatePlayerLocally("Sitting");
            updatePlayerGloally("Sitting");
            delete playersPeerData[socketName];
          }, 100);
        };
        const sittingM2 = (playersPeerData, x, y, z, xr, yr, zr) => {
          // ChangeView(playersPeer[socketName], 0);
          (x = x - 1.1), (y = y - 0.43), (z = z - 0.6);
          playersPeerData[socketName] = {
            socketName2: socketName,
            position: { x, y, z },
            rotation: new THREE.Euler(xr, yr, zr, "XYZ"),
          };
          setTimeout(() => {
            updatePlayerLocally("Sitting");
            updatePlayerGloally("Sitting");
            delete playersPeerData[socketName];
          }, 100);
        };
        switch (sittingRayCaster[0].object.name) {
          // =======================Pyramid Teater===========================

          //-------------------------------1--------------------------------
          case "T4_C04":
            sittingM(playersPeerData, 143.67, 10.2, -8.6, 0, 1.95, 0);
            break;

          case "T4_C02":
            sittingM(playersPeerData, 143.67, 10.2, -5, 0, 1.75, 0);
            break;

          case "T4_C03":
            sittingM(playersPeerData, 143.67, 10.2, -1.4, 0, 1.65, 0);
            break;

          case "T4_C05":
            sittingM(playersPeerData, 143.67, 10.2, 2.3, 0, 1.55, 0);
            break;

          case "T4_C06":
            sittingM(playersPeerData, 143.67, 10.2, 5.95, 0, 1.45, 0);
            break;

          case "T4_C07":
            sittingM(playersPeerData, 143.67, 10.2, 9.65, 0, 1.35, 0);
            break;

          //-----------------------------2-----------------------------------
          case "T4_C08":
            sittingM(playersPeerData, 148.8, 10.2, -6.75, 0, 1.75, 0);
            break;

          case "T4_C09":
            sittingM(playersPeerData, 148.85, 10.2, -3.2, 0, 1.65, 0);
            break;

          case "T4_C10":
            sittingM(playersPeerData, 148.8, 10.2, 4.2, 0, 1.55, 0);
            break;

          case "T4_C16":
            sittingM(playersPeerData, 148.8, 10.2, 7.8, 0, 1.45, 0);
            break;

          //-----------------------------3-----------------------------------

          case "T4_C15":
            sittingM(playersPeerData, 154.1, 10.2, -6.75, 0, 1.75, 0);
            break;

          case "T4_C13":
            sittingM(playersPeerData, 154.15, 10.2, -3.2, 0, 1.65, 0);
            break;

          case "T4_C11":
            sittingM(playersPeerData, 154.2, 10.2, 4.2, 0, 1.55, 0);
            break;

          case "T4_C14":
            sittingM(playersPeerData, 154.1, 10.2, 7.8, 0, 1.45, 0);
            break;

          //-----------------------------4-----------------------------------
          case "T4_C17":
            sittingM(playersPeerData, 159.35, 10.2, -6.8, 0, 1.75, 0);
            break;

          case "T4_C12":
            sittingM(playersPeerData, 159.35, 10.2, -3.2, 0, 1.65, 0);
            break;

          case "T4_C22":
            sittingM(playersPeerData, 159.35, 10.2, 4.2, 0, 1.55, 0);
            break;

          case "T4_C19":
            sittingM(playersPeerData, 159.35, 10.2, 7.8, 0, 1.45, 0);
            break;

          //-------------------------------5--------------------------------
          case "T4_C01":
            sittingM(playersPeerData, 164.65, 10.2, -8.6, 0, 1.85, 0);
            break;

          case "T4_C23":
            sittingM(playersPeerData, 164.65, 10.2, -5, 0, 1.75, 0);
            break;

          case "T4_C20":
            sittingM(playersPeerData, 164.65, 10.2, -1.4, 0, 1.65, 0);
            break;

          case "T4_C24":
            sittingM(playersPeerData, 164.65, 10.2, 2.3, 0, 1.55, 0);
            break;

          case "T4_C21":
            sittingM(playersPeerData, 164.65, 10.2, 5.95, 0, 1.45, 0);
            break;

          case "T4_C18":
            sittingM(playersPeerData, 164.65, 10.2, 9.65, 0, 1.35, 0);
            break;

          // ======================= Inside Cave Teater ===========================

          // -------------------------------1---------------------------------
          case "T3_C13":
            sittingM(playersPeerData, 5, 9.85, -143.8 - 0.4, 0, 0.5, 0);
            break;

          case "T3_C06":
            sittingM(playersPeerData, 2.2, 9.85, -143.3 - 0.4, 0, 0.3, 0);
            break;

          case "T3_C12":
            sittingM(playersPeerData, -0.7, 9.85, -143.3 - 0.4, 0, 0.15, 0);
            break;

          case "T3_C14":
            sittingM(playersPeerData, -6, 9.85, -143.25 - 0.4, 0, -0.15, 0);
            break;

          case "T3_C15":
            sittingM(playersPeerData, -8.8, 9.85, -143.1 - 0.4, 0, -0.2, 0);
            break;

          case "T3_C16":
            sittingM(playersPeerData, -11.4, 9.85, -143.55 - 0.4, 0, -0.5, 0);
            break;
          // -------------------------------2---------------------------------
          case "T3_C10":
            sittingM(playersPeerData, 5, 9.85, -139.9 - 0.4, 0, 0.5, 0);
            break;

          case "T3_C05":
            sittingM(playersPeerData, 2.2, 9.85, -139.4 - 0.4, 0, 0.3, 0);
            break;

          case "T3_C11":
            sittingM(playersPeerData, -0.6, 9.85, -139.33 - 0.4, 0, 0.15, 0);
            break;

          case "T3_C18":
            sittingM(playersPeerData, -6, 9.85, -139.25 - 0.4, 0, -0.15, 0);
            break;

          case "T3_C01":
            sittingM(playersPeerData, -8.8, 9.85, -139.2 - 0.4, 0, -0.2, 0);
            break;

          case "T3_C17":
            sittingM(playersPeerData, -11.4, 9.85, -139.65 - 0.4, 0, -0.5, 0);
            break;

          // -------------------------------3---------------------------------
          case "T3_C08":
            sittingM(playersPeerData, 5, 9.85, -136 - 0.4, 0, 0.5, 0);
            break;

          case "T3_C04":
            sittingM(playersPeerData, 2.3, 9.85, -135.5 - 0.4, 0, 0.3, 0);
            break;

          case "T3_C09":
            sittingM(playersPeerData, -0.5, 9.85, -135.43 - 0.4, 0, 0.15, 0);
            break;

          case "T3_C20":
            sittingM(playersPeerData, -6, 9.85, -135.4 - 0.4, 0, -0.15, 0);
            break;

          case "T3_C02":
            sittingM(playersPeerData, -8.8, 9.85, -135.3 - 0.4, 0, -0.2, 0);
            break;

          case "T3_C19":
            sittingM(playersPeerData, -11.4, 9.85, -135.75 - 0.4, 0, -0.5, 0);
            break;
          // ------------------------------4---------------------------------
          case "T3_C24":
            sittingM(playersPeerData, 5, 9.85, -132.1 - 0.4, 0, 0.5, 0);
            break;

          case "T3_C23":
            sittingM(playersPeerData, 2.3, 9.85, -131.6 - 0.4, 0, 0.3, 0);
            break;

          case "T3_C07":
            sittingM(playersPeerData, -0.5, 9.85, -131.53 - 0.4, 0, 0.15, 0);
            break;

          case "T3_C21":
            sittingM(playersPeerData, -6, 9.85, -131.5 - 0.4, 0, -0.15, 0);
            break;

          case "T3_C03":
            sittingM(playersPeerData, -8.8, 9.85, -131.4 - 0.4, 0, -0.2, 0);
            break;

          case "T3_C22":
            sittingM(playersPeerData, -11.4, 9.85, -131.85 - 0.4, 0, -0.5, 0);
            break;

          // ======================= Galaxy Teater ===========================

          // -------------------------------1---------------------------------
          case "t1_c26":
            sittingM2(playersPeerData, -154.6, 12.52, -7.3, 0, 1.9, 0);
            break;

          case "t1_c30":
            sittingM2(playersPeerData, -154.6, 12.52, -4.08, 0, 1.7, 0);
            break;

          case "t1_c21":
            sittingM2(playersPeerData, -154.6, 12.52, 4, 0, 1.3, 0);
            break;

          case "t1_c25":
            sittingM2(playersPeerData, -154.6, 12.52, 7.2, 0, 1.15, 0);
            break;
          // -------------------------------2---------------------------------
          case "t1_c12":
            sittingM2(playersPeerData, -151.1, 12.52, -9.0, 0, 1.9, 0);
            break;

          case "t1_c07":
            sittingM2(playersPeerData, -151.1, 12.52, -5.8, 0, 1.75, 0);
            break;

          case "t1_c06":
            sittingM2(playersPeerData, -151.1, 12.52, -2.3, 0, 1.67, 0);
            break;

          case "t1_c04":
            sittingM2(playersPeerData, -151.1, 12.52, 2.1, 0, 1.5, 0);
            break;

          case "t1_c05":
            sittingM2(playersPeerData, -151.1, 12.52, 5.5, 0, 1.3, 0);
            break;

          case "t1_c27":
            sittingM2(playersPeerData, -151.1, 12.52, 8.8, 0, 1.15, 0);
            break;

          // -------------------------------3---------------------------------
          case "t1_c17":
            sittingM2(playersPeerData, -147.75, 12.52, -7.4, 0, 1.9, 0);
            break;

          case "t1_c08":
            sittingM2(playersPeerData, -147.75, 12.52, -4.0, 0, 1.7, 0);
            break;

          case "t1_c29":
            sittingM2(playersPeerData, -147.75, 12.52, 3.9, 0, 1.3, 0);
            break;

          case "t1_c23":
            sittingM2(playersPeerData, -147.75, 12.52, 7.2, 0, 1.15, 0);
            break;

          // -------------------------------4---------------------------------
          case "t1_c22":
            sittingM2(playersPeerData, -144.25, 12.52, -9.0, 0, 1.9, 0);
            break;

          case "t1_c15":
            sittingM2(playersPeerData, -144.2, 12.52, -5.65, 0, 1.75, 0);
            break;

          case "t1_c10":
            sittingM2(playersPeerData, -144.2, 12.52, -2.4, 0, 1.67, 0);
            break;

          case "t1_c31":
            sittingM2(playersPeerData, -144.2, 12.52, 2.1, 0, 1.5, 0);
            break;

          case "t1_c28":
            sittingM2(playersPeerData, -144.2, 12.52, 5.5, 0, 1.3, 0);
            break;

          case "t1_c24":
            sittingM2(playersPeerData, -144.2, 12.52, 8.8, 0, 1.15, 0);
            break;

          // -------------------------------5---------------------------------
          case "t1_c18":
            sittingM2(playersPeerData, -141.2, 12.52, -7.45, 0, 1.7, 0);
            break;

          case "t1_c02":
            sittingM2(playersPeerData, -141.2, 12.52, -3.8, 0, 1.65, 0);
            break;

          case "t1_c16":
            sittingM2(playersPeerData, -141.2, 12.52, 0.15, 0, 1.65, 0);
            break;

          case "t1_c13":
            sittingM2(playersPeerData, -141.2, 12.52, 3.57, 0, 1.5, 0);
            break;

          case "t1_c19":
            sittingM2(playersPeerData, -141.2, 12.52, 7.82, 0, 1.3, 0);
            break;

          // -------------------------------6---------------------------------
          case "t1_c20":
            sittingM2(playersPeerData, -137.74, 12.52, -6.8, 0, 1.7, 0);
            break;

          case "t1_c11":
            sittingM2(playersPeerData, -137.7, 12.52, -1.45, 0, 1.65, 0);
            break;

          case "t1_c09":
            sittingM2(playersPeerData, -137.7, 12.52, 1.8, 0, 1.5, 0);
            break;

          case "t1_c14":
            sittingM2(playersPeerData, -137.7, 12.52, 5.25, 0, 1.35, 0);
            break;

          // -------------------------------7---------------------------------
          case "t1_c03":
            sittingM2(playersPeerData, -134.2, 12.52, -3.8, 0, 1.7, 0);
            break;

          case "t1_c01":
            sittingM2(playersPeerData, -134.2, 12.52, 3.45, 0, 1.5, 0);
            break;

          //=============================Under Water Theater==============================
          case "t2_c051":
            sittingM(playersPeerData, -20.8, 2.4, 167, 0, 3.8, 0);
            break;

          case "t2_c049":
            sittingM(playersPeerData, -18.5, 2.4, 164.7, 0, 3.8, 0);
            break;

          case "t2_c050":
            sittingM(playersPeerData, -15.7, 2.4, 163.88, 0, 3.8, 0);
            break;

          case "t2_c18":
            sittingM(playersPeerData, 1.4, 2.4, 160.05, 0, 3.2, 0);
            break;

          case "t2_c16":
            sittingM(playersPeerData, 3.85, 2.4, 159.1, 0, 3.2, 0);
            break;

          case "t2_c17":
            sittingM(playersPeerData, 7, 2.4, 159.8, 0, 3.0, 0);
            break;

          case "t2_c27":
            sittingM(playersPeerData, 22.5, 2.4, 164, 0, 2.7, 0);
            break;

          case "t2_c25":
            sittingM(playersPeerData, 25.5, 2.4, 165.1, 0, 2.4, 0);
            break;

          case "t2_c26":
            sittingM(playersPeerData, 27.5, 2.4, 167.4, 0, 2.3, 0);
            break;

          case "t2_c048":
            sittingM(playersPeerData, -12.5, 2.4, 151.75, 0, 3.5, 0);
            break;

          case "t2_c046":
            sittingM(playersPeerData, -9.7, 2.4, 150.7, 0, 3.4, 0);
            break;

          case "t2_c047":
            sittingM(playersPeerData, -6.3, 2.4, 150.85, 0, 3.3, 0);
            break;

          case "t2_c21":
            sittingM(playersPeerData, 12, 2.4, 147.7, 0, 3, 0);
            break;

          case "t2_c19":
            sittingM(playersPeerData, 15, 2.4, 147.45, 0, 2.9, 0);
            break;

          case "t2_c20":
            sittingM(playersPeerData, 18.3, 2.4, 148.4, 0, 2.8, 0);
            break;

          case "t2_c033":
            sittingM(playersPeerData, 29.5, 2.4, 140.4, 0, 2.8, 0);
            break;

          case "t2_c031":
            sittingM(playersPeerData, 32.4, 2.4, 141.3, 0, 2.65, 0);
            break;

          case "t2_c032":
            sittingM(playersPeerData, 34.75, 2.4, 143.15, 0, 2.55, 0);
            break;

          case "t2_c045":
            sittingM(playersPeerData, -24.5, 2.4, 141.5, 0, 3.8, 0);
            break;

          case "t2_c043":
            sittingM(playersPeerData, -22.7, 2.4, 139.22, 0, 3.6, 0);
            break;

          case "t2_c044":
            sittingM(playersPeerData, -20, 2.4, 137.65, 0, 3.5, 0);
            break;

          case "t2_c042":
            sittingM(playersPeerData, -12.5, 2.4, 129.8, 0, 3.4, 0);
            break;

          case "t2_c040":
            sittingM(playersPeerData, -9.8, 2.4, 129.1, 0, 3.4, 0);
            break;

          case "t2_c041":
            sittingM(playersPeerData, -6.6, 2.4, 129.45, 0, 3.35, 0);
            break;

          case "t2_c036":
            sittingM(playersPeerData, 12, 2.4, 125.4, 0, 3, 0);
            break;

          case "t2_c034":
            sittingM(playersPeerData, 15.1, 2.4, 125.3, 0, 3, 0);
            break;

          case "t2_c035":
            sittingM(playersPeerData, 18, 2.4, 126.45, 0, 2.9, 0);
            break;

          case "t2_c054":
            sittingM(playersPeerData, -1.7, 2.4, 113.75, 0, 3.25, 0);
            break;

          case "t2_c052":
            sittingM(playersPeerData, 1.2, 2.4, 113.1, 0, 3.2, 0);
            break;

          case "t2_c053":
            sittingM(playersPeerData, 4.2, 2.4, 113.6, 0, 3.15, 0);
            break;
          //=============================exterior==============================
          case "P_C14":
            sittingM(playersPeerData, 27.05, 2.3, -40.6, 0, 4.8, 0);
            break;

          case "P_C05":
            sittingM(playersPeerData, 28.38, 2.3, -37.7, 0, 4.8, 0);
            break;

          case "P_C04":
            sittingM(playersPeerData, 29.85, 2.3, -34.7, 0, 5, 0);
            break;

          case "P_C10":
            sittingM(playersPeerData, 24.4, 2.3, -39.3, 0, 4.8, 0);
            break;

          case "P_C09":
            sittingM(playersPeerData, 25.75, 2.3, -36.4, 0, 4.9, 0);
            break;

          case "P_C08":
            sittingM(playersPeerData, 27.1, 2.3, -33.4, 0, 5, 0);
            break;
          // ----------------------------------------------------------------
          case "P_C11":
            sittingM(playersPeerData, 33.6, 2.3, -30.45, 0, 5.4, 0);
            break;

          case "P_C01":
            sittingM(playersPeerData, 35.9, 2.3, -28.15, 0, 5.4, 0);
            break;

          case "P_C16":
            sittingM(playersPeerData, 38.4, 2.3, -25.7, 0, 5.65, 0);
            break;

          case "P_C13":
            sittingM(playersPeerData, 31.48, 2.3, -28.45, 0, 5.4, 0);
            break;

          case "P_C12":
            sittingM(playersPeerData, 33.9, 2.3, -26.05, 0, 5.5, 0);
            break;

          case "P_C17":
            sittingM(playersPeerData, 36.35, 2.3, -23.55, 0, 5.6, 0);
            break;

          // ----------------------------------------------------------------
          case "P_C03":
            sittingM(playersPeerData, 42.9, 2.3, -23.4, 0, 6, 0);
            break;

          case "P_C02":
            sittingM(playersPeerData, 45.8, 2.3, -22, 0, 6, 0);
            break;

          case "P_C18":
            sittingM(playersPeerData, 48.98, 2.3, -20.55, 0, 6.1, 0);
            break;

          case "P_C07":
            sittingM(playersPeerData, 41.6, 2.3, -20.8, 0, 5.9, 0);
            break;

          case "P_C06":
            sittingM(playersPeerData, 44.5, 2.3, -19.4, 0, 6, 0);
            break;

          case "P_C15":
            sittingM(playersPeerData, 47.75, 2.3, -17.9, 0, 6.1, 0);
            break;

          // -----------------------------Front exterior chair-----------------------------------
          case "P_H_C03":
            sittingM(playersPeerData, 45.6, 2.63, -40.8, 0, -4, 0);
            break;

          case "P_H_C02":
            sittingM(playersPeerData, 47.3, 2.63, -39.2, 0, -4, 0);
            break;

          case "P_H_C01":
            sittingM(playersPeerData, 49, 2.63, -37.4, 0, -4, 0);
            break;
        }
      }
    }
  });

  !isMobile &&
    window.addEventListener("dblclick", (e) => {
      mouse.x = (e.clientX / sizes.width) * 2 - 1;
      mouse.y = -(e.clientY / sizes.height) * 2 + 1;
      mouseRaycaster.setFromCamera(
        mouse,
        playersPeer[socketName].children[0].children[2]
      );
      let intersects = mouseRaycaster.intersectObjects(objectArray);
      if (
        intersects.length > 0 &&
        teleportNameArray.includes(intersects[0].object.name)
      ) {
        let playerNewPosition = {
          x: intersects[0].point.x,
          y: intersects[0].point.y + characterYWalkingPosition,
          z: intersects[0].point.z,
        };
        playersPeer[socketName].children[0].position.copy(playerNewPosition);
        updatePlayerGloally("Idle");
      }
    });
  let lastTouchTime = 0;
  isMobile &&
    window.addEventListener(
      "touchstart",
      function (event) {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastTouchTime;
        if (timeDiff < 300) {
          mouseRaycaster.setFromCamera(
            mouse,
            playersPeer[socketName].children[0].children[2]
          );
          let intersects = mouseRaycaster.intersectObjects(objectArray);
          if (
            intersects.length > 0 &&
            teleportNameArray.includes(intersects[0].object.name)
          ) {
            let playerNewPosition = {
              x: intersects[0].point.x,
              y: intersects[0].point.y + characterYWalkingPosition,
              z: intersects[0].point.z,
            };
            playersPeer[socketName].children[0].position.copy(playerNewPosition);
            updatePlayerGloally("Idle");
          }
        }
        lastTouchTime = currentTime;
      },
      { passive: false }
    );

  /*-----------------add player-------------------*/

  socket.on("addPlayer", function (players) {
    const addClient = (data) => {
      if (!isFirstTimeLoaded && data.avtarName !== avtarName) {
        newPlayerJoin.style.display = "block";
        newPlayerJoin.innerHTML = data.avtarName.toUpperCase() + " has joined";
        setTimeout(function () {
          newPlayerJoin.style.display = "none";
        }, 2000);
      }
      let fbxLoader = new FBXLoader(loadingManager);
      fbxLoader.load(
        `../static/models/avtar/${data.avtarId}.fbx`,
        (characterFbx) => {
          characterFbx.traverse((n) => {
            if (n.isMesh) {
              n.material.shininess = 0;
            }
          });
          let characterMesh = new THREE.Mesh(
            new THREE.BoxGeometry(
              characterMeshScale.x,
              characterMeshScale.y,
              characterMeshScale.z
            ),
            new THREE.MeshStandardMaterial({
              transparent: true,
              opacity: 0,
            })
          );
          characterMesh.name = data.socketName2;

          characterMesh.position.copy(data.position);
          if (
            Object.keys(data.rotation).length &&
            data.socketName2 !== socketName
          ) {
            characterMesh.rotation.copy(data.rotation);
          } else {
            characterMesh.rotation.set(0, 0, 0);
          }
          let characterHeadName = document.createElement("div");
          characterHeadName.className = "avtarLabel";
          characterHeadName.textContent = data.avtarName;
          let avtarLabel2 = new CSS2DObject(characterHeadName);
          if (data.socketName2 !== socketName) {
            avtarLabel2.position.copy(avtarlabelPositionOther);
          } else {
            avtarLabel2.position.copy(avtarlabelPosition);
          }
          avtarLabel2.name = "avtarlabel" + data.socketName2;
          characterMesh.add(avtarLabel2);

          /*-----------------characterFbx-------------------*/
          characterFbx.rotateY(Math.PI);
          characterFbx.name = "person" + socketName;
          characterFbx.scale.copy(characterScale);
          characterFbx.position.copy(characterPosition);
          characterMesh.add(characterFbx);

          /*-----------------ani-------------------*/
          let cm = new THREE.AnimationMixer(characterFbx);
          characherMixerArray[data.socketName2] = cm;
          if (data.animationName && data.animationName === "Sitting") {
            let a = characherMixerArray[data.socketName2];
            changeAnimation(a, animationsArray, data.animationName, false);
          } else if (
            data.animationName &&
            data.animationName === "SittingF"
          ) {
            let a = characherMixerArray[data.socketName2];
            changeAnimation(a, animationsArray, data.animationName, false);
          } else {
            let a = characherMixerArray[data.socketName2];
            changeAnimation(a, animationsArray, "Idle", false);
          }

          let playerGroup = new THREE.Group();
          playerGroup.name = data.avtarName;
          if (data.socketName2 !== socketName) {
            objectArray.push(characterMesh);
          } else {
            let camera = new THREE.PerspectiveCamera(
              35,
              window.innerWidth / window.innerHeight,
              1,
              500
            );
            camera.position.copy(chracterCameraPosition);
            characterMesh.add(camera);
          }

          playerGroup.add(characterMesh);
          playerGroup.socketName2 = data.socketName2;
          scene.add(playerGroup);

          playersPeer[data.socketName2] = playerGroup;
        }
      );
    };
    Object.keys(players).map((playerKey) => {
      if (!Object.keys(playersPeer).includes(playerKey)) {
        addClient(players[playerKey]);
      }
    });
  });

  /*-----------------removePlayer-------------------*/

  socket.on("removePlayer", function (data) {
    let r = scene.getObjectByName("avtarlabel" + data.socketName2);
    playersPeer[data.socketName2] &&
      playersPeer[data.socketName2].children[0].remove(r);
    scene.remove(playersPeer[data.socketName2]);
    delete playersPeer[data.socketName2];
    delete playersPeerData[data.socketName2];
    delete playersPeerToggle[data.socketName2];
    objectArray = objectArray.filter((item) => item.name !== data.socketName2);
  });


  /*-----------------oka updatePlayer-------------------*/
  socket.on("updatePlayer", function (data) {
    let a = characherMixerArray[data.socketName2];
    if (playersPeerToggle[data.socketName2] == undefined) {
      playersPeerToggle[data.socketName2] = {};
      playersPeerToggle[data.socketName2].idle = true;
      playersPeerToggle[data.socketName2].walking = true;
      playersPeerToggle[data.socketName2].running = true;
    } else {
      if (data.animation === "Idle" && playersPeerToggle[data.socketName2].idle) {
        changeAnimation(a, animationsArray, "Idle", false);
        playersPeerToggle[data.socketName2].idle = false;
        playersPeerToggle[data.socketName2].walking = true;
        playersPeerToggle[data.socketName2].running = true;
      } else if (
        data.animation === "Walking" &&
        playersPeerToggle[data.socketName2].walking
      ) {
        changeAnimation(a, animationsArray, "Walking", false);
        playersPeerToggle[data.socketName2].idle = true;
        playersPeerToggle[data.socketName2].walking = false;
        playersPeerToggle[data.socketName2].running = true;
      } else if (
        data.animation === "Running" &&
        playersPeerToggle[data.socketName2].running
      ) {
        changeAnimation(a, animationsArray, "Running", false);
        playersPeerToggle[data.socketName2].idle = true;
        playersPeerToggle[data.socketName2].walking = true;
        playersPeerToggle[data.socketName2].running = false;
      } else if (data.animation === "Sitting") {
        changeAnimation(a, animationsArray, "Sitting", false);
      } else if (data.animation === "Hand_Raise") {
        changeAnimation(a, animationsArray, "Hand_Raise", true);
      } else if (data.animation === "Hand_Shake") {
        changeAnimation(a, animationsArray, "Hand_Shake", true);
      }
    }

    playersPeerData[data.socketName2] = data;
    if (playersPeer[socketName] && playersPeer[socketName].children[0]) {
      let distance = playersPeer[socketName].children[0].position.distanceTo(
        playersPeer[data.socketName2].children[0].position
      );
      if (Object.keys(remoteUser).length) {
        if (distance < 8) {
          remoteUser[data.voiceId].play();
        } else {
          remoteUser[data.voiceId].stop();
        }
      }
    }
  });

  socket.on("createEmoji", (data) => {
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async function createHeartLoop() {
      for (let i = 0; i < 25; i++) {
        createHeart(data.emojiname, heartsGroup, data.playerPosition);
        await delay(100); // Wait for one second
      }
    }
    createHeartLoop();
  });
  // oks
  scene.add(cityGroup);
  scene.add(lightGroup);
  scene.add(heartsGroup);
  scene.add(cloudNormalSpriteGroup);
  // scene.add(demoGroup)
  // scene.add(helperGroup)

  /*-----------------resize-------------------*/
  window.addEventListener("resize", function () {
    resizeM(playersPeer, renderer, labelRenderer, socketName);

  });
  // console.clear();
};

/*-----------------oka updatePlayerLocally-------------------*/
const updatePlayerLocally = (animation) => {
  let a = characherMixerArray[socketName];
  if (playersPeerToggle[socketName] == undefined) {
    playersPeerToggle[socketName] = {};
    playersPeerToggle[socketName].idle = true;
    playersPeerToggle[socketName].walking = true;
    playersPeerToggle[socketName].running = true;
  } else {
    if (animation === "Idle" && playersPeerToggle[socketName].idle) {
      changeAnimation(a, animationsArray, "Idle", false);
      playersPeerToggle[socketName].idle = false;
      playersPeerToggle[socketName].walking = true;
      playersPeerToggle[socketName].running = true;
    } else if (
      animation === "Walking" &&
      playersPeerToggle[socketName].walking
    ) {
      changeAnimation(a, animationsArray, "Walking", false);
      playersPeerToggle[socketName].idle = true;
      playersPeerToggle[socketName].walking = false;
      playersPeerToggle[socketName].running = true;
    } else if (
      animation === "Running" &&
      playersPeerToggle[socketName].running
    ) {
      changeAnimation(a, animationsArray, "Running", false);
      playersPeerToggle[socketName].idle = true;
      playersPeerToggle[socketName].walking = true;
      playersPeerToggle[socketName].running = false;
    } else if (animation === "Sitting") {
      changeAnimation(a, animationsArray, "Sitting", false);
    } else if (animation === "Hand_Raise") {
      changeAnimation(a, animationsArray, "Hand_Raise", true);
    } else if (animation === "Hand_Shake") {
      changeAnimation(a, animationsArray, "Hand_Shake", true);
    }
  }
};

/*-----------------oka updatePlayerGloally-------------------*/
const updatePlayerGloally = (animation) => {
  socket.emit("updatePlayer", {
    socketName2: socketName,
    position: playersPeer[socketName].children[0].position,
    rotation: playersPeer[socketName].children[0].rotation,
    animation: animation,
    roomName: roomName,
  });
};

/*-----------------joystick-------------------*/

isMobile &&
  joystick.addEventListener("touchmove", function (event) {
    event.preventDefault();
    let x =
      event.touches[0].pageX - joystick.offsetLeft - stick.offsetWidth / 2;
    let y =
      event.touches[0].pageY - joystick.offsetTop - stick.offsetHeight / 2;

    if (x < 0) x = 0;
    if (x > joystick.offsetWidth - stick.offsetWidth)
      x = joystick.offsetWidth - stick.offsetWidth;
    if (y < 0) y = 0;
    if (y > joystick.offsetHeight - stick.offsetHeight)
      y = joystick.offsetHeight - stick.offsetHeight;

    stick.style.left = x + "px";
    stick.style.top = y + "px";
    isJoystickTouched = true;
    getJoystickPosition();
  });

isMobile &&
  joystick.addEventListener("touchend", function (event) {
    stick.style.left = "25px";
    stick.style.top = "25px";
    isJoystickTouched = false;
    updatePlayerLocally("Idle");
    socket.emit("updatePlayer", {
      socketName2: socketName,
      position: playersPeer[socketName].children[0].position,
      rotation: playersPeer[socketName].children[0].rotation,
      animation: "Idle",
      roomName: roomName,
    });
  });

function getJoystickPosition() {
  let x = parseInt(stick.style.left) - 25;
  let y = parseInt(stick.style.top) - 25;
  joystickX = x;
  joystickY = y;
}

/*-----------------animate-------------------*/
const animate = () => {
  let elapsedTime = clock.getElapsedTime();
  let deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  /*-----------------update player-------------------*/

  playersPeerData &&
    Object.keys(playersPeerData).map((item) => {
      playersPeer[item] &&
        playersPeer[item].children[0].position.copy(
          playersPeerData[item].position
        );
      playersPeer[item] &&
        playersPeer[item].children[0].rotation.copy(
          playersPeerData[item].rotation
        );
    });
  /*-----------------person animation-------------------*/
  if (characherMixerArray && Object.keys(characherMixerArray).length) {
    Object.keys(characherMixerArray).map((keys) => {
      characherMixerArray[keys].update(deltaTime);
    });
  }

  /*-----------------joystick-------------------*/
  if (isMobile && isJoystickTouched && playersPeer[socketName]) {
    booster_button.style.display = "block";
    if (joystickY < 0 && joystickX > -25 && joystickX < 25) {
      if (isSpeed) {
        booster_button.style.backgroundColor = "#f44336";
        enableForward &&
          playersPeer[socketName].children[0].translateZ(
            -walkspeedFast * deltaTime
          );
        collisionDetection("forward");
        updatePlayerLocally("Running");
        updatePlayerGloally("Running");
      } else {
        booster_button.style.backgroundColor = "#000000";
        enableForward &&
          playersPeer[socketName].children[0].translateZ(
            -walkspeed * deltaTime
          );
        collisionDetection("forward");
        updatePlayerLocally("Walking");
        updatePlayerGloally("Walking");
      }
      booster_button.addEventListener("touchstart", function (e) {
        isSpeed = true;
      });
      booster_button.addEventListener("touchend", function (e) {
        isSpeed = false;
      });
    } else if (joystickY > 0 && joystickX > -25 && joystickX < 25) {
      enableBackward &&
        playersPeer[socketName].children[0].translateZ(+walkspeed * deltaTime);
      collisionDetection("forward");
      updatePlayerLocally("Walking");
      updatePlayerGloally("Walking");
    } else if (joystickX < 0 && joystickY > -25 && joystickY < 25) {
      playersPeer[socketName].children[0].rotateY(
        +walkRotateSpeed * deltaTime
      );
      updatePlayerLocally("Walking");
      updatePlayerGloally("Walking");
    } else if (joystickX > 0 && joystickY > -25 && joystickY < 25) {
      playersPeer[socketName].children[0].rotateY(
        -walkRotateSpeed * deltaTime
      );
      updatePlayerLocally("Walking");
      updatePlayerGloally("Walking");
    }
  } else {
    booster_button.style.display = "none";
  }
  /*-----------------keyboard-------------------*/
  if (playersPeer[socketName]) {
    let x = playersPeer[socketName].children[0].position.x / 2;
    let z = playersPeer[socketName].children[0].position.z / 2;
    smallAvtar.style.left = 90 + x + "px";
    smallAvtar.style.top = 85 + z + "px";

    if (keyboard.pressed("shift")) {
      walkspeed = walkspeedFast;
      avtarAnimation = "Running";
    } else {
      walkspeed = walkspeedSlow;
      avtarAnimation = "Walking";
    }
    if (keyboard.pressed("up") || keyboard.pressed("w")) {
      enableForward &&
        playersPeer[socketName].children[0].translateZ(-walkspeed * deltaTime);
      collisionDetection("forward");
      updatePlayerLocally(avtarAnimation);
      updatePlayerGloally(avtarAnimation);
    }
    if (keyboard.pressed("down") || keyboard.pressed("s")) {
      enableBackward &&
        playersPeer[socketName].children[0].translateZ(+walkspeed * deltaTime);
      collisionDetection("backward");
      updatePlayerLocally(avtarAnimation);
      updatePlayerGloally(avtarAnimation);
    }
    if (keyboard.pressed("left") || keyboard.pressed("a")) {
      playersPeer[socketName].children[0].rotateY(
        +walkRotateSpeed * deltaTime
      );
      updatePlayerLocally(avtarAnimation);
      updatePlayerGloally(avtarAnimation);
    }
    if (keyboard.pressed("right") || keyboard.pressed("d")) {
      playersPeer[socketName].children[0].rotateY(
        -walkRotateSpeed * deltaTime
      );
      updatePlayerLocally(avtarAnimation);
      updatePlayerGloally(avtarAnimation);
    }
  }
  /*-----------------city-------------------*/
  if (water1) {
    water1.material.uniforms["time"].value += 0.4 / 60.0;
  }

  /*------------------------------------*/
  if (modelMixer) {
    modelMixer.forEach((mixer) => mixer.update(deltaTime));
  }
  /*------------------------------------*/
  playersPeer[socketName] &&
    playersPeer[socketName].children.length &&
    renderer.render(scene, playersPeer[socketName].children[0].children[2]);
  playersPeer[socketName] &&
    playersPeer[socketName].children.length &&
    labelRenderer.render(scene, playersPeer[socketName].children[0].children[2]);

  requestAnimationFrame(animate);
  stats.update();
};

/*-----------------collisionDetection-------------------*/
const collisionDetection = (direction) => {
  /*-----------------ray collider-------------------*/
  if (playersPeer[socketName]) {
    let cubeMesh = playersPeer[socketName].children[0];
    let cubeMeshPosition = playersPeer[socketName].children[0].position;
    /*-----------------down-------------------*/
    cameraRaycasterDown = new THREE.Raycaster(cubeMeshPosition, rayDownTarget);
    /*-----------------forward-------------------*/
    let rayTargetForward = playersPeer[
      socketName
    ].children[0].children[1].getWorldDirection(
      new THREE.Vector3(rayForwardTargetVector)
    );
    rayTargetForward.normalize();
    cameraRaycasterForward = new THREE.Raycaster(
      cubeMeshPosition,
      rayTargetForward
    );
    /*-----------------backward-------------------*/
    let rayTargetBackward = playersPeer[
      socketName
    ].children[0].getWorldDirection(rayBackwordTargetVector);
    rayTargetBackward.normalize();
    cameraRaycasterBackward = new THREE.Raycaster(
      cubeMeshPosition,
      rayTargetBackward
    );

    /*-----------------left-------------------*/
    let rayTargetLeft = cubeMesh.getWorldDirection(rayLeftTargetVector);
    rayTargetLeft.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI * 0.5);
    rayTargetLeft.normalize();
    cameraRaycasterLeft = new THREE.Raycaster(cubeMeshPosition, rayTargetLeft);
    /*-----------------right-------------------*/
    let rayTargetRight = cubeMesh.getWorldDirection(rayRightTargetVector);
    rayTargetRight.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * 0.5);
    rayTargetRight.normalize();
    cameraRaycasterRight = new THREE.Raycaster(
      cubeMeshPosition,
      rayTargetRight
    );

    /*------------------------------------*/
    if (objectArray && objectArray.length) {
      forwardIntersectedObjects =
        cameraRaycasterForward.intersectObjects(objectArray);
      backwardIntersectedObjects =
        cameraRaycasterBackward.intersectObjects(objectArray);
      leftIntersectedObjects =
        cameraRaycasterLeft.intersectObjects(objectArray);
      rightIntersectedObjects =
        cameraRaycasterRight.intersectObjects(objectArray);
      downIntersectedObjects =
        cameraRaycasterDown.intersectObjects(objectArray);

      // if (leftIntersectedObjects && leftIntersectedObjects.length) {
      //   if (leftIntersectedObjects[0].distance < colliderDistanceLR) {
      //     enableRight = false;
      //   } else {
      //     enableRight = true;
      //   }
      // } else {
      //   enableRight = true;
      // }

      // if (rightIntersectedObjects && rightIntersectedObjects.length) {
      //   if (rightIntersectedObjects[0].distance < colliderDistanceLR) {
      //     enableLeft = false;
      //   } else {
      //     enableLeft = true;
      //   }
      // } else {
      //   enableLeft = true;
      // }

      if (downIntersectedObjects && downIntersectedObjects.length) {
        if (downIntersectedObjects[0].object.name === "Mesh661_1") {
          cityGroup.children.map(
            (theater) => theater.name != "theater1" && (theater.visible = false)
          );
          scene.background = envmap2;
          water1Object && (water1Object.visible = false);
        } else if (downIntersectedObjects[0].object.name === "Plane") {
          cityGroup.children.map(
            (theater) => theater.name != "theater2" && (theater.visible = false)
          );
          scene.background = envmap3;
          water1Object && (water1Object.visible = true);
          fishObject1 && (fishObject1.visible = true);
          fishObject2 && (fishObject2.visible = true);
          fishObject3 && (fishObject3.visible = true);
          fishObject4 && (fishObject4.visible = true);
          fishObject5 && (fishObject5.visible = true);
          fishObject6 && (fishObject6.visible = true);
          fishObject7 && (fishObject7.visible = true);

          /*------------------------------------*/
        } else if (downIntersectedObjects[0].object.name === "Mesh660_1") {
          cityGroup.children.map(
            (theater) => theater.name != "theater3" && (theater.visible = false)
          );
          scene.background = envmap4;
          water1Object && (water1Object.visible = false);
        } else if (downIntersectedObjects[0].object.name === "Mesh659_1") {
          cityGroup.children.map(
            (theater) => theater.name != "theater4" && (theater.visible = false)
          );
          scene.background = envmap5;
          water1Object && (water1Object.visible = false);
        } else if (
          downIntersectedObjects[0].object.name === "Rectangle004" ||
          downIntersectedObjects[0].object.name === "Cube" ||
          downIntersectedObjects[0].object.name === "Rectangle002" ||
          downIntersectedObjects[0].object.name === "Line007" ||
          downIntersectedObjects[0].object.name === "Mesh662_1"
        ) {
          cityGroup.children.map((theater) => (theater.visible = true));
          scene.background = envmap1;
          water1Object && (water1Object.visible = false);
          fishObject1 && (fishObject1.visible = false);
          fishObject2 && (fishObject2.visible = false);
          fishObject3 && (fishObject3.visible = false);
          fishObject4 && (fishObject4.visible = false);
          fishObject5 && (fishObject5.visible = false);
          fishObject6 && (fishObject6.visible = false);
          fishObject7 && (fishObject7.visible = false);
          videoDiv.pause();
        }
        if (downIntersectedObjects[0].object.name === "Plane119") {
          playersPeer[socketName].children[0].position.copy(characterMeshPosition);
        } else {
          playersPeer[socketName].children[0].position.y =
            downIntersectedObjects[0].point.y + characterYWalkingPosition;
        }
      }
      if (
        forwardIntersectedObjects &&
        forwardIntersectedObjects.length &&
        forwardIntersectedObjects[0].distance < colliderDistanceFB
      ) {
        enableForward = false;
        enableBackward = true;
      } else if (
        backwardIntersectedObjects &&
        backwardIntersectedObjects.length &&
        backwardIntersectedObjects[0].distance < colliderDistanceFB
      ) {
        enableBackward = false;
        enableForward = true;
      } else {
        enableBackward = true;
        enableForward = true;
      }
    }
  }
};

htmlEvents();
init();
animate();
startBasicCall();

export {
  socket,
  mainModel,
  isadmin,
  bannerNameArray,
  bannerMeshArray,
  selectedBannername,
  objectArray,
  scene,
  globalUrl,
  sittingMeshArray,
  videoMeshArray,
};
