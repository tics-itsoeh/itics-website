import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function initModel3d(containerId: string, canvasId: string) {
  const container = document.getElementById(containerId);
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

  if (!container || !canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

  function getResponsiveSettings() {
    const w = window.innerWidth;
    if (w < 640) {
      return { cameraY: 1.25, cameraZ: 6.54, lookAtY: 0.6, targetSize: 6, modelYOffset: -0.35, planeY: -1.4 };
    }
    if (w < 1024) {
      return { cameraY: 1.4, cameraZ: 5.0, lookAtY: 0.55, targetSize: 5.0, modelYOffset: -0.45, planeY: -1.45 };
    }
    return { cameraY: 1.5, cameraZ: 6.0, lookAtY: 0.5, targetSize: 4.0, modelYOffset: -0.5, planeY: -1.5 };
  }

  let settings = getResponsiveSettings();
  camera.position.set(0, settings.cameraY, settings.cameraZ);
  camera.lookAt(0, settings.lookAtY, 0);

  let model3dModel: THREE.Group | null = null;
  let modelCenter: THREE.Vector3 | null = null;
  let modelMaxDim = 1;
  let modelBaseY = 0;
  let rafId = 0;

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  function resize() {
    if (!container || !renderer) return;
    settings = getResponsiveSettings();
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.set(0, settings.cameraY, settings.cameraZ);
    camera.lookAt(0, settings.lookAtY, 0);
    camera.updateProjectionMatrix();

    if (model3dModel && modelCenter) {
      const scale = settings.targetSize / modelMaxDim;
      model3dModel.scale.set(scale, scale, scale);
      model3dModel.position.x = -modelCenter.x * scale;
      model3dModel.position.y = -modelCenter.y * scale + settings.modelYOffset;
      modelBaseY = model3dModel.position.y;
      model3dModel.position.z = -modelCenter.z * scale;
      plane.position.y = settings.planeY;
    }
  }
  resize();
  window.addEventListener('resize', resize);

  // Soft formal lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(5, 8, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.bias = -0.001;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xedf2f7, 1.0);
  fillLight.position.set(-5, 3, -5);
  scene.add(fillLight);

  const loader = new GLTFLoader();
  // Generic filename for easier maintenance and future model swaps.
  const modelUrl = '/model/model3d.glb';
  
  async function loadModel() {
    let urlToLoad = modelUrl;
    let objectUrl: string | null = null;
    
    // Attempt to cache the model using the browser's Cache API
    if ('caches' in window) {
      try {
        const cacheName = 'nexus-models-v1';
        const cache = await caches.open(cacheName);
        let response = await cache.match(modelUrl);
        
        if (!response) {
          response = await fetch(modelUrl);
          if (response.ok) {
            await cache.put(modelUrl, response.clone());
          }
        }
        
        if (response && response.ok) {
          const blob = await response.blob();
          objectUrl = URL.createObjectURL(blob);
          urlToLoad = objectUrl;
        }
      } catch (e) {
        console.warn('Cache API fell back to network fetch:', e);
      }
    }
    
    loader.load(
      urlToLoad,
      (gltf) => {
        model3dModel = gltf.scene;
        
        const box = new THREE.Box3().setFromObject(model3dModel);
        modelCenter = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        modelMaxDim = Math.max(size.x, size.y, size.z);
        const scale = settings.targetSize / modelMaxDim;
        model3dModel.scale.set(scale, scale, scale);
        
        model3dModel.position.x = -modelCenter.x * scale;
        model3dModel.position.y = -modelCenter.y * scale + settings.modelYOffset;
        modelBaseY = model3dModel.position.y;
        model3dModel.position.z = -modelCenter.z * scale;
        
        model3dModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        scene.add(model3dModel);
        
        // Clean up ObjectURL if we created one
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      },
      undefined,
      (error) => {
        console.error('Error loading model3d.glb:', error);
      }
    );
  }

  loadModel();

  let mx = 0, my = 0, tRotY = 0, tRotX = 0;
  
  // Create a subtle shadow plane
  const planeGeo = new THREE.PlaneGeometry(10, 10);
  const planeMat = new THREE.ShadowMaterial({ opacity: 0.1 });
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = settings.planeY;
  plane.receiveShadow = true;
  scene.add(plane);

  container.addEventListener('mousemove', e => {
    const r = container.getBoundingClientRect();
    const nextMx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const nextMy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    // Reduce motion range by ~50% and clamp to prevent extreme rotations.
    mx = clamp(nextMx, -0.5, 0.5);
    my = clamp(nextMy, -0.5, 0.5);
  });

  container.addEventListener('mouseleave', () => {
    mx = 0;
    my = 0;
  });

  const startTime = performance.now();

  function animate() {
    rafId = requestAnimationFrame(animate);
    const t = (performance.now() - startTime) / 1000;

    if (model3dModel) {
      // Keep idle motion relative to base Y to avoid cumulative drift.
      model3dModel.position.y = modelBaseY + Math.sin(t * 1.5) * 0.001;
      
      // Mouse follow rotation with easing
      tRotY += (mx * 0.25 - tRotY) * 0.05;
      tRotX += (-my * 0.1 - tRotX) * 0.05;
      
      model3dModel.rotation.y = tRotY + Math.sin(t * 0.5) * 0.05;
      model3dModel.rotation.x = tRotX;
    }

    renderer.render(scene, camera);
  }

  animate();

  // Prevent stale animation loops if Astro re-runs scripts after navigation.
  window.addEventListener('pagehide', () => cancelAnimationFrame(rafId), { once: true });
}
