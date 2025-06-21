// 全局变量
let scene, camera, renderer, controls;
let currentModel = null;

// 初始化场景
function init() {
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(document.getElementById('model-container').offsetWidth, 
                     document.getElementById('model-container').offsetHeight);
    document.getElementById('model-container').appendChild(renderer.domElement);
    
    // 添加轨道控制
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 15);
    scene.add(directionalLight);
    
    // 添加坐标轴辅助
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    
    // 添加网格地面
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);
    
    // 响应窗口大小变化
    window.addEventListener('resize', onWindowResize, false);
    
    // 开始动画循环
    animate();
}

// 窗口大小变化处理
function onWindowResize() {
    camera.aspect = document.getElementById('model-container').offsetWidth / 
                    document.getElementById('model-container').offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.getElementById('model-container').offsetWidth, 
                    document.getElementById('model-container').offsetHeight);
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// 加载模型函数
function loadModel(modelPath) {
    // 移除当前模型
    if (currentModel) {
        scene.remove(currentModel);
        currentModel = null;
    }
    
    // 创建完整URL用于调试
    // 修复GitHub Pages路径问题
    let fullUrl;
    
    // 本地开发环境
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        fullUrl = modelPath;
    } 
    // GitHub Pages环境
    else {
        const repoName = window.location.pathname.split('/')[1];
        fullUrl = `/${repoName}/${modelPath}`;
    }
    
    console.log('开始加载模型:', fullUrl);
    
    // 创建GLTF加载器
    const loader = new THREE.GLTFLoader();
    // 禁用CORS检查（仅用于开发）
    THREE.Cache.enabled = false;
    loader.setCrossOrigin('');

    // 加载模型
    loader.load(fullUrl, (gltf) => {
        console.log('模型加载成功:', fullUrl);
        currentModel = gltf.scene;
        scene.add(currentModel);
        
        // 调整相机位置以聚焦模型
        const bbox = new THREE.Box3().setFromObject(currentModel);
        const center = bbox.getCenter(new THREE.Vector3());
        const size = bbox.getSize(new THREE.Vector3());
        
        // 计算相机位置
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
        
        camera.position.set(center.x, center.y, center.z + cameraZ * 1.5);
        controls.target.copy(center);
        controls.update();
        
        // 触发动画加载
        if (modelPath.includes('mongolian')) {
            window.loadMongolianYurtAnimation();
        } else if (modelPath.includes('tibetan')) {
            window.loadTibetanHouseAnimation();
        }
}, undefined, (error) => {
    console.error('模型加载失败:', error);
    console.error('错误详情:', error);
    console.error('请求URL:', fullUrl);
    console.error('当前页面协议:', window.location.protocol);
    
    // 添加备用模型加载机制
    loadFallbackModel();
});
}

// 初始化应用
init();

// 导出函数供controls.js使用
window.loadModel = loadModel;

// 备用模型加载方案
function loadFallbackModel() {
    console.log('尝试加载备用模型');
    const backupModelUrl = 'https://raw.githubusercontent.com/yixiaosu-cloud/traditional-architecture/main/public/models/armchair.gltf';
    
    // 创建GLTF加载器
    const loader = new THREE.GLTFLoader();
    loader.setCrossOrigin('');
    
    loader.load(backupModelUrl, (gltf) => {
        console.log('备用模型加载成功');
        currentModel = gltf.scene;
        scene.add(currentModel);
        
        if (window.onArmchairLoaded) {
            window.onArmchairLoaded(currentModel);
        }
    }, undefined, (error) => {
        console.error('备用模型加载失败:', error);
        alert('模型加载失败，请检查网络连接');
    });
}
