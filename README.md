# new_cesium_project

## 安装项目

```
npm install
```

### 编译与项目热启动

```
npm run serve
```

### 编译与项目打包

```
npm run build
```

## 项目目录

```
new_cesium_project
├─ 📁public
│  ├─ 📁images
│  ├─ 📁libs				//	webCLient Cesium离线包
│  ├─ 📄favicon.ico
│  └─ 📄index.html			//	项目页面入口，在此处通过script标签引入Cesium
├─ 📁src
│  ├─ 📁assets				//	项目中用到的所有图标文件，下载自iconfont
│  │  ├─ 📁icon
│  ├─ 📁common				// echarts表通用的一些样式等
│  │  └─ 📁echart
│  │     ├─ 📄index.vue
│  │     └─ 📄theme.json
│  ├─ 📁components			// 页面中的组件
│  │  ├─ 📁EchartTable
│  │  │  ├─ 📄chart.vue
│  │  │  └─ 📄index.vue
│  │  ├─ 📁MenuPanel		// 菜单展开项依赖的公共组件
│  │  │  ├─ 📄ControlPanel.vue
│  │  │  ├─ 📄MenuInfoPanel.vue
│  │  │  └─ 📄TipTool.vue	// 菜单展开项提示框
│  │  ├─ 📁ToolBox			// 菜单对应的组件
│  │  │  ├─ 📄GeneralizedAnalysisTools.vue
│  │  │  ├─ 📄LightEffectsTools.vue
│  │  │  ├─ 📄MesureTools.vue
│  │  │  ├─ 📄ModelAnalysisTools.vue
│  │  │  └─ 📄VisualizationTools.vue
│  │  ├─ 📄AlertInfo.vue
│  │  ├─ 📄BaseChart.vue
│  │  ├─ 📄CarInfo.vue
│  │  ├─ 📄CctvShow.vue
│  │  ├─ 📄CesiumInit.vue	// 在此处初始化Cesium，并将viewer绑定到window上
│  │  ├─ 📄EnergyInfo.vue
│  │  ├─ 📄LayerShift.vue	// 图层切换组件
│  │  ├─ 📄MarkerInit.vue
│  │  ├─ 📄PieChart.vue
│  │  ├─ 📄PositionReset.vue	// 模型位置重置组件
│  │  ├─ 📄RateChart.vue
│  │  └─ 📄ToolsMenu.vue
│  ├─ 📁request					// 封装的axios，请求echarts表格中的数据，数据源自apifox mock
│  │  ├─ 📄api.js
│  │  └─ 📄request.js
│  ├─ 📁router
│  │  └─ 📄index.js
│  ├─ 📁store					// vuex
│  │  └─ 📄index.js
│  ├─ 📁utils
│  │  ├─ 📄drawTrackLine.js
│  │  ├─ 📄index.js
│  │  └─ 📄measureToolConfig.js
│  ├─ 📁views
│  │  ├─ 📄CctvPage.vue
│  │  ├─ 📄center.vue
│  │  ├─ 📄centerBottom.vue
│  │  ├─ 📄centerLeft1.vue
│  │  ├─ 📄centerRight1.vue
│  │  └─ 📄IndexPanel.vue		// 页面布局盒子
│  ├─ 📄App.vue					// 根组件
│  └─ 📄main.js					// 项目入口文件
├─ 📄.gitignore
├─ 📄babel.config.js
├─ 📄jsconfig.json
├─ 📄package-lock.json
├─ 📄package.json
├─ 📄README.md
└─ 📄vue.config.js
```
