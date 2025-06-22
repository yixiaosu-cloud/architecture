import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class ModelViewer {
  constructor(containerId) {
    // 初始化场景
    this.container = document.getElementById(containerId);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.container.offsetWidth/this.container.offsetHeight, 0.1, 1000);
    
    // 初始化渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.renderer.setClearColor(0xf3f4f6);
    this.container.appendChild(this.renderer.domElement);

    // 添加轨道控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // 基础光照设置
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(ambientLight, directionalLight);

    // 初始化相机位置
    this.camera.position.z = 5;
    this.animate();
  }

  async loadModel(url) {
    // 显示加载状态
    this.showLoading();
    
    try {
      const gltf = await new GLTFLoader().loadAsync(url);
      this.scene.add(gltf.scene);
      this.fitToContainer(gltf.scene);
    } catch (error) {
      this.showError('模型加载失败');
    } finally {
      this.hideLoading();
    }
  }

  // 其他工具方法...
}