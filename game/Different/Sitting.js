import * as THREE from "three";
import { scene, sittingMeshArray } from "../game.js";

const Sitting = (object) => {
  switch (object.material.name) {
    case "sofa":
      sittingMeshArray.push(object);
      break;
    case "chair_02":
      sittingMeshArray.push(object);
      break;
    case "Material #2100455334":
      sittingMeshArray.push(object);
      break;
    case "01 - Default":
      sittingMeshArray.push(object);
      break;
    case "sofa.001":
      sittingMeshArray.push(object);
      break;
    case "chair_02.001":
      sittingMeshArray.push(object);
      break;
    case "vray_theater_chair_01.003":
      sittingMeshArray.push(object);
      break;
    case "vray_theater_chair_03":
      sittingMeshArray.push(object);
      break;
    default:
      break;
  }
};
export { Sitting, sittingMeshArray };
