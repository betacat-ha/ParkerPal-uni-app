## 智泊无忧

### 技术栈
uni-app、vue3、uview-plus、ooomap

### 部署

```bash
# 构建测试环境
pnpm build:h5
pnpm build:mp-weixin

# 构建生产环境
pnpm build:h5-prod
pnpm build:mp-weixin-prod
```

### 代码提交
```bash
pnpm run eslint # eslint校验
pnpm cz
```

### 更新uniapp版本

更新uniapp相关依赖到最新正式版
```bash
npx @dcloudio/uvm@latest
```

### 注意事项
1. 如果项目中不需要压缩图片，可以移除`vite-plugin-imagemin`插件后再初始化，以避免由于网路问题造成初始化报错的情况
2. 微信小程序开发者工具中内置的打包分析不准确，本项目使用了`rollup-plugin-visualizer`来分析小程序包体积，默认不开启，有需要的移除相关注释即可
3. 自动构建处理本地图片资源，使用了`vite-plugin-clean-build`和`vite-plugin-replace-image-url`这两个插件，默认不开启相关功能，如果需要使用再`build/vite/plugins/index.ts`文件中移除相关注释即可
4. 使用`vite-plugin-replace-image-url`插件，想要图片自动替换生效，需要在项目中使用绝对路径引入图片资源，如下示例所示。

    示例一：style中的图片使用
    ```
    <template>
      <view :style="`background-image: url('${bgImg}')`">
        ...
      </view>
    </template>
    <script setup lang="ts">
    import bgImg from '@/static/images/bg_img.png';
    </script>
    ```

    示例二：js中的图片使用

    ```
    <script setup lang="ts">
    import walletIcon from '@/static/images/icon_wallet.png';
    const menuList = [
      {
        name: 'wallet',
        title: '钱包',
        icon: walletIcon,
      },
      ...
    ];
    </script>
    ```

    示例二：css中的图片使用
    ```
    <style lang="scss">
    .icon {
      background-image: url('@/static/images/icon.png')
    }
    </style>
    ```
5. 本项目中`permission.ts`中的拦截代码在小程序中的`tab`切换中无效，下面是官方给出的回复及解决方案。

> 拦截uni.switchTab本身没有问题。但是在微信小程序端点击tabbar的底层逻辑并不是触发uni.switchTab。所以误认为拦截无效，此类场景的解决方案是在tabbar页面的页面生命周期onShow中处理。
6. 本项目使用了easycom自动导入，公共组件请遵循组件同名目录，eg:card/card.index。
