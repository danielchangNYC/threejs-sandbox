import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';
import Detector from './detector';
import { Router } from 'director';

let scene, camera, renderer;
let geometry, material, mesh;
const container = document.getElementById('three');

const init = () => {
  scene = new Scene();

  camera = new PerspectiveCamera(
    75,
    container.innerWidth / container.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;

  geometry = new BoxGeometry(1, 1, 1);
  material = new MeshBasicMaterial({ color: 0x00ff00 });
  mesh = new Mesh(geometry, material);
  scene.add(mesh);

  renderer = new WebGLRenderer();
  renderer.setSize(container.innerWidth, container.innerHeight);
  const currentChild = container.childNodes[0];
  container.replaceChild(renderer.domElement, currentChild);
};

const animate = () => {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.05;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
};

if (Detector.webgl) {
  const routes = {
    '/tutorial': () => {
      console.log('tutorial');
    },
  };
  Router(routes).init();

  init();
  animate();
} else {
  const warning = Detector.getWebGLErrorMessage();
  container.appendChild(warning);
}
