# GitHub Pages 部署指南

## 步骤1：创建GitHub仓库
1. 访问 [GitHub 创建仓库页面](https://github.com/new)
2. 填写仓库名称：`traditional-architecture`
3. 选择仓库可见性：Public（公开）
4. **不要**初始化README.md文件
5. 点击"Create repository"按钮

## 步骤2：添加远程仓库
```bash
git remote add origin https://github.com/您的用户名/traditional-architecture.git
```

## 步骤3：推送代码到GitHub
```bash
git push -u origin main
```

## 步骤4：启用GitHub Pages
1. 进入仓库的"Settings"
2. 左侧菜单选择"Pages"
3. 在"Build and deployment"部分：
   - Source：选择"Deploy from a branch"
   - Branch：选择"main"分支，文件夹选择"/ (root)"
4. 点击"Save"按钮

## 步骤5：访问您的网站
部署完成后（约1-2分钟），访问：
```
https://您的用户名.github.io/traditional-architecture
```

## 注意事项
1. 确保所有文件已提交：
   ```bash
   git status
   ```
2. 首次推送可能需要GitHub账号验证
3. 如果遇到推送错误，尝试：
   ```bash
   git push -f origin main
   ```

## 项目结构说明
```
├── index.html            # 主入口文件
├── public/               # 公共资源
│   ├── css/              # 样式表
│   ├── js/               # JavaScript脚本
│   └── models/           # 3D模型文件
└── test.html             # 测试页面
```

## 技术支持
如遇部署问题，参考：
- [GitHub Pages官方文档](https://pages.github.com/)
- [GitHub Pages故障排查](https://docs.github.com/pages/getting-started-with-github-pages/troubleshooting-jekyll-build-errors-for-github-pages-sites)
