import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';
import Detector from './detector';

let scene, camera, renderer;
let geometry, material, mesh;

const init = () => {
  scene = new Scene();

  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;

  geometry = new BoxGeometry(1, 1, 1);
  material = new MeshBasicMaterial({ color: 0x00ff00 });
  mesh = new Mesh(geometry, material);
  scene.add(mesh);

  renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
};

const animate = () => {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.05;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
};

if (Detector.webgl) {
  init();
  animate();
} else {
  const warning = Detector.getWebGLErrorMessage();
  document.getElementById('container').appendChild(warning);
}
