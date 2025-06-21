// Armchair模型交互功能
window.onArmchairLoaded = function(model) {
    console.log("Armchair模型已加载，添加交互功能");
    
    // 添加旋转动画
    model.rotation.y = 0;
    setInterval(() => {
        model.rotation.y += 0.01;
    }, 50);
    
    // 添加点击事件
    model.traverse(child => {
        if (child.isMesh) {
            child.userData.originalColor = child.material.color.clone();
            child.addEventListener('click', event => {
                // 高亮显示点击部位
                child.material.color.set(0xff0000);
                setTimeout(() => {
                    child.material.color.copy(child.userData.originalColor);
                }, 500);
                
                // 显示部件信息
                showPartInfo(child.name);
            });
        }
    });
};

// 显示部件信息
function showPartInfo(partName) {
    const infoPanel = document.createElement('div');
    infoPanel.id = 'part-info';
    infoPanel.style.position = 'fixed';
    infoPanel.style.top = '10px';
    infoPanel.style.right = '10px';
    infoPanel.style.background = 'rgba(0,0,0,0.7)';
    infoPanel.style.color = 'white';
    infoPanel.style.padding = '15px';
    infoPanel.style.borderRadius = '5px';
    infoPanel.style.zIndex = '1000';
    
    const partInfo = getPartInfo(partName);
    infoPanel.innerHTML = `
        <h3>${partInfo.name}</h3>
        <p>${partInfo.description}</p>
        <p>材质: ${partInfo.material}</p>
    `;
    
    document.body.appendChild(infoPanel);
    
    // 5秒后自动移除
    setTimeout(() => {
        if (document.contains(infoPanel)) {
            document.body.removeChild(infoPanel);
        }
    }, 5000);
}

// 部件信息数据库
function getPartInfo(partName) {
    const parts = {
        'Seat': {
            name: '座椅',
            description: '人体工学设计，提供舒适坐感',
            material: '高级织物'
        },
        'Back': {
            name: '靠背',
            description: '符合人体脊椎曲线的支撑设计',
            material: '弹性海绵+织物'
        },
        'Armrest': {
            name: '扶手',
            description: '可调节高度的多功能扶手',
            material: '工程塑料+软质PU'
        },
        'Leg': {
            name: '椅腿',
            description: '五爪式稳固支撑结构',
            material: '铝合金'
        },
        'default': {
            name: partName || '部件',
            description: '椅子重要组成部分',
            material: '多种复合材料'
        }
    };
    
    return parts[partName] || parts.default;
}
