// 动画状态
let animationState = {
    playing: false,
    currentAnimation: null,
    animationMixer: null,
    clock: new THREE.Clock()
};

// 初始化动画控制
function initAnimations() {
    // 动画控制按钮
    document.getElementById('play-animation').addEventListener('click', playAnimation);
    document.getElementById('pause-animation').addEventListener('click', pauseAnimation);
    document.getElementById('reset-animation').addEventListener('click', resetAnimation);
}

// 播放动画
function playAnimation() {
    if (!animationState.playing && animationState.currentAnimation) {
        animationState.playing = true;
    }
}

// 暂停动画
function pauseAnimation() {
    animationState.playing = false;
}

// 重置动画
function resetAnimation() {
    animationState.playing = false;
    if (animationState.animationMixer) {
        animationState.animationMixer.stopAllAction();
        animationState.animationMixer.time = 0;
    }
}

// 加载蒙古包搭建动画
function loadMongolianYurtAnimation() {
    resetAnimation();
    
    // TODO: 实际动画加载逻辑
    // 这里使用简单旋转动画代替
    if (currentModel) {
        animationState.animationMixer = new THREE.AnimationMixer(currentModel);
        
        // 创建旋转动画
        const rotationAnimation = (model) => {
            return () => {
                model.rotation.y += 0.01;
            };
        };
        
        animationState.currentAnimation = rotationAnimation(currentModel);
    }
}

// 加载藏式碉房抗震动画
function loadTibetanHouseAnimation() {
    resetAnimation();
    
    // TODO: 实际动画加载逻辑
    // 这里使用震动动画代替
    if (currentModel) {
        animationState.animationMixer = new THREE.AnimationMixer(currentModel);
        
        // 创建震动动画
        const shakeAnimation = (model) => {
            let originalPosition = model.position.clone();
            let time = 0;
            
            return () => {
                time += 0.1;
                model.position.x = originalPosition.x + Math.sin(time * 10) * 0.1;
                model.position.z = originalPosition.z + Math.cos(time * 5) * 0.1;
            };
        };
        
        animationState.currentAnimation = shakeAnimation(currentModel);
    }
}

// 更新动画
function updateAnimations() {
    if (animationState.playing && animationState.currentAnimation) {
        animationState.currentAnimation();
    }
}

// 将更新函数添加到主动画循环
function addToAnimationLoop() {
    // 在主js的animate函数中添加
    const originalAnimate = window.animate;
    
    window.animate = function() {
        originalAnimate();
        updateAnimations();
    };
}

// 页面加载完成后初始化动画
window.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    addToAnimationLoop();
});

// 导出函数供模型切换使用
window.loadMongolianYurtAnimation = loadMongolianYurtAnimation;
window.loadTibetanHouseAnimation = loadTibetanHouseAnimation;
