import { Router } from 'director';
import Detector from './detector';
import tutorial from './canvases/tutorial';

const container = document.getElementById('three');

if (Detector.webgl) {
  const routes = {
    '/tutorial': () => {
      tutorial(container);
    },
  };

  Router(routes).init();
} else {
  const warning = Detector.getWebGLErrorMessage();
  container.appendChild(warning);
}
