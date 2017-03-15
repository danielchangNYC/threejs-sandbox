import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';

let scene, camera, renderer;
let geometry, material, cube;

const tutorial = container => {
  init(container);
};

const animate = () => {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.05;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};

const init = container => {
  scene = new Scene();
  console.log(container);
  camera = new PerspectiveCamera(
    75,
    container.innerWidth / container.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;

  geometry = new BoxGeometry(1, 1, 1);
  material = new MeshBasicMaterial({ color: 0x00ff00 });
  cube = new Mesh(geometry, material);
  scene.add(cube);

  renderer = new WebGLRenderer();
  renderer.setSize(container.innerWidth, container.innerHeight);

  const currentChild = container.childNodes[0];
  container.replaceChild(renderer.domElement, currentChild);

  animate();
};

export default tutorial;
