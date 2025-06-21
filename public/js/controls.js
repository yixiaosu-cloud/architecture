// 初始化控件
function initControls() {
    // 模型切换按钮
    document.getElementById('mongolian-yurt').addEventListener('click', () => {
        loadModel('public/models/free_1972_datsun_240k_gt.glb');
        setupMongolianYurtParameters();
    });
    
    document.getElementById('tibetan-house').addEventListener('click', () => {
        loadModel('public/models/free_1972_datsun_240k_gt.glb');
        setupTibetanHouseParameters();
    });
    
    // 重置视图按钮
    document.getElementById('reset-view').addEventListener('click', resetView);
    
    // 参数调整滑块
    const slider = document.getElementById('param-slider');
    slider.addEventListener('input', handleParameterChange);
    
    // 默认加载蒙古包模型
    loadModel('public/models/free_1972_datsun_240k_gt.glb');
    setupMongolianYurtParameters();
}

// 重置视图
function resetView() {
    if (currentModel) {
        camera.position.set(0, 5, 10);
        controls.target.copy(currentModel.position);
        controls.update();
    }
}

// 蒙古包参数设置
function setupMongolianYurtParameters() {
    const slider = document.getElementById('param-slider');
    const label = document.querySelector('.slider-container label');
    slider.min = 3;
    slider.max = 8;
    slider.value = 5;
    slider.step = 1;
    if (label) {
        label.textContent = '包顶高度: ' + slider.value + '米';
    }
}

// 藏式碉房参数设置
function setupTibetanHouseParameters() {
    const slider = document.getElementById('param-slider');
    const label = document.querySelector('.slider-container label');
    slider.min = 1;
    slider.max = 3;
    slider.value = 2;
    slider.step = 0.1;
    if (label) {
        label.textContent = '墙体厚度: ' + slider.value + '米';
    }
}

// 处理参数变化
function handleParameterChange(event) {
    const value = parseFloat(event.target.value);
    const label = document.querySelector('.slider-container label');
    
    // 更新标签显示
    if (label) {
        if (document.getElementById('mongolian-yurt').classList.contains('active')) {
            label.textContent = '包顶高度: ' + value + '米';
        } else {
            label.textContent = '墙体厚度: ' + value + '米';
        }
    }
    
    // TODO: 实际参数影响模型逻辑
    console.log('参数调整为:', value);
}

// 页面加载完成后初始化控件
window.addEventListener('DOMContentLoaded', initControls);
