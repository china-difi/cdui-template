本项目从`cdui-js-template`模板 https://github.com/china-difi/mui-template/archive/refs/heads/main.zip 下载构建。

> 本项目依赖`cdui-js`，要更新`cdui-js`请在项目根目录下执行命令`pnpm update --recursive`
> 响应式编程请参考`cdui-js`项目 https://github.com/china-difi/cdui-js 相关文档。


# 开始

* 先安装`nodejs`，版本最好大于 22
* 执行`npm i -g pnpm`命令安装`pnpm`
* 当前面项目的主目录下执行命令`pnpm i`安装依赖
* 启动开发环境`npm run dev`
* 构建命令：`npm run build[:环境]`
* `SSR`构建：`npm run ssr[:环境]`，然后执行执行`dist/ssr/server.js`渲染页面或启动服务（参数：--root www根目录, --mode: 渲染模式 "jenkins" | "server"，--port: 侦听端口，server mode时有效）

> 可根据`pnpm`规范在根目录下的`package.json`文件中的`scripts`处配置相应的命令以便在根目录下执行，后述的命令特指在相应子项目下执行的命令。


# 目录结构

本项目使用`pnpm`进行多子项目管理，可根据需要添加子项目或命令，相关问题请参阅`pnpm`文档。

<pre>
├─ .vscode        // vscode 项目文件
├─ dist           // 构建生成目录
├─ packages       // pnpm 项目包目录
│   ├─ admin      // 管理者后台主目录
│   │   └─ ...    // 除不支持 ssr 服务端渲染外，与 www 基本一致
│   └─ www        // 网站主目录
│       ├─ css        // css 规范及构建目录
│       ├─ icons      // 图标文件目录
│       ├─ mock       // 模拟数据目录
│       ├─ public     // 静态文件目录
│       ├─ src        // 源码目录
│       │   ├─ CandlestickChart     // K 线图组件目录
│       │   ├─ api                  // api 服务接口目录
│       │   ├─ components           // 组件目录
│       │   ├─ css                  // css 文件目录
│       │   ├─ i18n                 // 国际化多语言配置目录
│       │   ├─ lib                  // 基础功能库目录
│       │   ├─ pages                // 页面目录
│       │   ├─ types                // 基础类型目录
│       │   ├─ http-interceptor.ts  // http 拦截器
│       │   └─ main.tsx             // 应用入口文件
│       ├─ ssr                      // 服务端渲染目录
│       │   ├─ build.js             // 构建后处理（构建命令自动调用）
│       │   ├─ i18n.ts              // 国际化语言配置
│       │   ├─ render.ts            // 服务端渲染（需根据业务修改 pages 以控制需要渲染的页面）
│       │   └─ server.ts            // 服务端渲染服务（按每一种语言开启一个线程的方式执行 render.ts 进行并发渲染）
│       ├─ env.xxx                  // 相应环境的环境配置文件
│       ├─ index.html               // 网页入口文件
│       ├─ vite.config.ts           // vite 构建配置
│       └─ vite.ssr.config.ts       // vite 服务端渲染构建配置
├─ pnpm-workspace.yaml  // pnpm 多项目管理配置文件
└─ tsconfig.json        // typescript 配置文件
</pre>


# 样式规范及构建

从`UI`设计开始需严格遵循样式规范设计及编写代码，除特殊情况外不允许出现样式规范之外的设计及代码，通用样式由`UI`维护，前端根据`UI`维护的`css.md`文件执行`npm run css`命令同步更新样式。

以`www`项目为例，其`www/css`目录下有两个文件：

1. build.ts  css 样式构建脚本文件，负责根据当前目录下的`css.md`文件内容自动更新 css 样式
2. css.md  css 样式规范配置文件（由`UI`维护）

成功构建后会替换项目目录下的样式文件`www/src/css/atomic.css`。

根据`css.md`文件内容大致可以生成以下几类：

<table>
  <tr>
    <td>css类型</td>
    <td>备注</td>
  </tr>
  <tr>
    <td>外边距</td>
    <td>
      <ul>
        <li>.margin-XXS|.margin-XS|.margin-S|.margin|.margin-L|.margin-XL|.margin-XXL 共7档</li>
        <li>.margin-l 左外边距，共7档，如：.margin-l-L</li>
        <li>.margin-t 顶外边距，共7档，如：.margin-t-L</li>
        <li>.margin-r 右外边距，共7档，如：.margin-r-L</li>
        <li>.margin-b 底外边距，共7档，如：.margin-b-L</li>
        <li>.margin-x 左右外边距，共7档，如：.margin-x-L</li>
        <li>.margin-y 上下外边距，共7档，如：.margin-y-L</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>内边距</td>
    <td>
      <ul>
        <li>.padding-XXS|.padding-XS|.padding-S|.padding|.padding-L|.padding-XL|.padding-XXL 共7档</li>
        <li>.padding-l 左内边距，共7档，如：.padding-l-L</li>
        <li>.padding-t 顶内边距，共7档，如：.padding-t-L</li>
        <li>.padding-r 右内边距，共7档，如：.padding-r-L</li>
        <li>.padding-b 底内边距，共7档，如：.padding-b-L</li>
        <li>.padding-x 左右内边距，共7档，如：.padding-x-L</li>
        <li>.padding-y 上下内边距，共7档，如：.padding-y-L</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>边框宽度</td>
    <td>
      <ul>
        <li>.border 普通边框</li>
        <li>.border-bold 加粗边框</li>
        <li>.border-bolder 再加粗边框</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>边框颜色</td>
    <td>
      <ul>
        <li>.border-c-XXL|.border-c-XL|.border-c-L|.border-c|.border-c-D|.border-c-XD|.border-c-XXD 基础边框颜色，共7档</li>
        <li>.border-c-primary|.border-c-secondary|.border-c-error|.border-c-warn|.border-c-info|.border-c-disabled 特殊边框颜色</li>
        <li>.border-c-active|.border-c-primary-active 按下时边框颜色</li>
        <li>.border-c-focus|.border-c-primary-focus 焦点边框颜色</li>
        <li>.border-c-hover|.border-c-primary-hover 鼠标划过时边框颜色</li>
        <li>.border-c-selected|.border-c-primary-selected 选中时边框颜色</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>边框样式</td>
    <td>
      <ul>
        <li>.border-s-dashed 虚线边框样式</li>
        <li>.border-s-dotted 点虚线边框样式</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>圆角边框</td>
    <td>
      <ul>
        <li>.round-XXS|.round-XS|.round-S|.round|.round-L|.round-XL|.round-XXL 共7档</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>背景颜色</td>
    <td>
      <ul>
        <li>.bg-c-XXL|.bg-c-XL|.bg-c-L|.bg-c|.bg-c-D|.bg-c-XD|.bg-c-XXD 基础背景颜色，共7档</li>
        <li>.bg-c-primary|.bg-c-secondary|.bg-c-error|.bg-c-warn|.bg-c-info|.bg-c-disabled 特殊背景颜色</li>
        <li>.bg-c-active|.bg-c-primary-active 按下时背景颜色</li>
        <li>.bg-c-focus|.bg-c-primary-focus 焦点背景颜色</li>
        <li>.bg-c-hover|.bg-c-primary-hover 鼠标划过时背景颜色</li>
        <li>.bg-c-selected|.bg-c-primary-selected 选中时背景颜色</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>字体颜色</td>
    <td>
      <ul>
        <li>.color-XXL|.color-XL|.color-L|.color|.color-D|.color-XD|.color-XXD 基础字体颜色，共7档</li>
        <li>.color-primary|.color-secondary|.color-error|.color-warn|.color-info|.color-disabled 特殊字体颜色</li>
        <li>.color-active|.color-primary-active 按下时字体颜色</li>
        <li>.color-focus|.color-primary-focus 焦点字体颜色</li>
        <li>.color-hover|.color-primary-hover 鼠标划过时字体颜色</li>
        <li>.color-selected|.color-primary-selected 选中时字体颜色</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>字体大小</td>
    <td>
      <ul>
        <li>.font-s-XXS|.font-s-XS|.font-s-S|.font-s|.font-s-L|.font-s-XL|.font-s-XXL 共7档</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>字体粗细</td>
    <td>
      <ul>
        <li>.font-lighter 加细字体</li>
        <li>.font-bold 加粗字体</li>
        <li>.font-bolder 再加粗字体</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>图标颜色</td>
    <td>
      <ul>
        <li>.icon-c-XXL|.icon-c-XL|.icon-c-L|.icon-c|.icon-c-D|.icon-c-XD|.icon-c-XXD 基础图标颜色，共7档</li>
        <li>.icon-c-primary|.icon-c-secondary|.icon-c-error|.icon-c-warn|.icon-c-info|.icon-c-disabled 特殊图标颜色</li>
        <li>.icon-c-active|.icon-c-primary-active 按下时图标颜色</li>
        <li>.icon-c-focus|.icon-c-primary-focus 焦点图标颜色</li>
        <li>.icon-c-hover|.icon-c-primary-hover 鼠标划过时图标颜色</li>
        <li>.icon-c-selected|.icon-c-primary-selected 选中时图标颜色</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>图标大小</td>
    <td>
      <ul>
        <li>.icon-s-XXS|.icon-s-XS|.icon-s-S|.icon-s|.icon-s-L|.icon-s-XL|.icon-s-XXL 共7档</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>按钮 Button</td>
    <td>
      <ul>
        <li>.button 普通按钮</li>
        <li>.button-primary 主色按钮</li>
      </ul>
    </td>
  </tr>
</table>

> 组件样式标准待补充
> UI 项目中还有一些标准的原子样式，可参考相应源码，此处略

当`css.md`文件更新后，前端相应负责人在`UI`修改了`css.md`后需执行此命令同步更新相应样式。

非特殊情况，开发者必须使用通用样式中定义的`class`编写程序，开发者无需关注通用样式的响应工及换肤问题，统一由`UI`进行管理。


## 自适应及换肤原理

在项目的`index.html`文件中，有一段脚本会自动根据当前窗口自动根据窗口宽度的临界值生成一系统的`class`，比如默认临界值为`[1920, 1280, 1024, 800, 640, 480]`，则脚本代码会给每个临界值生成`4`个`classs`，以`1920`为例：

|class|备注|
|----|----|
|.lt-1920|当前页面宽度小于1920像素|
|.le-1920|当前页面宽度小于等于1920像素|
|.gt-1920|当前页面宽度大于1920像素|
|.ge-1920|当前页面宽度大于等于1920像素|

比如某`div`样式在页面宽度小于`800`像素时生效:

```css
.lt-800 div {
  ...
}
```

换肤也是类似的，由开发人员在更换皮肤时生成相应的`class`即可，比如切换为`黑暗`模板，写端人员需要`body`节点增加名为`dark`的`class`，`UI`设计或开发者即可使用这个`class`实现换肤。

## `UI`设计人员的自适应及换肤配置

根据`css.md`文档规范，`#`开头表示样式大类，在样式大类下可增加`class`前缀实现自适应及换肤。比如以下`css.md`配置表示在页面宽度小于等于`800`时`.margin`从`16px`自适应为`14px`，背景色在`dark`模式下变为`#1E252A`。

```md

# margin 外边距

.margin: 16px;

+ .le-800 

.margin: 14px;

# background-color 背景颜色

.bg-c: #f0f0f0;

+ .dark

.bg-c: #1E252A;
```


## 开发者自定义自适应及换肤实现

特殊场景开发者可使用相应的`class`写`css`代码来控制自适应或换肤。


# 图标

本项目图标以目录的形式组织`svg`图标文件，可随意定义子目录，但最后生成的图标名与图标文件名一致，比如图标文件`logo.svg`，无论放到哪个目录下，最终`Icon`组件的`name`都使用`logo`来指定`logo.svg`图标。

以`www`项目为例，`icons`目录为图标文件目录，`icons/build.ts`为图标构建脚本，可根据需要修改此构建脚本生成图标文件。

默认情况下，构建脚本会把`svg`图标直接生成到`index.html`文件中，如果有按需加载的图标，可修改`icons/build.ts`构建脚本使用`saveIconsModule`方法生成图标模块文件，然后在代码中使用按需加载的方式按需创建相应图标。

构建图标命令为`npm run icons`，前端相应负责人在图标目录发生变化后需同步修改`icons/build.ts`构建脚本并执行此命令以同步更新图标。


# 国际化

项目目录下的`src/i18n`目录为轩际化配置目录，其下的子目录`languages`为不同语言的配置文件目录，每种语言按照替换创建一个相应语言的配置文件，如简体中文的文件名为`zh-CN.json`，如有必要，可以在`src/i18n/index.ts`中输出相应的子模块多语言配置。

业务代码中通过`import`引入`src/i18n/index.ts`模块即可像对象一样使用相应的多语言配置数据。写错时`IDE`会自动提醒。

```typescript
import { Menu } from '../../i18n';

// 按照对象属性的方式使用多语言配置，IDE 自动提醒
const Market = Menu.Market;
```


# API与模拟数据

项目目录下的`src/api`子目录为后台`API`调用目录，所有后台接口的调用与前后端数据转换代码必需放在此目录中。

当环境变量中配置了`VITE_API_MOCK`时，则启用模拟数据支持。项目目录下的`mock`子目录为模拟数据配置目录，其中`mock-data`目录下的文件即要模拟`API`接口数据。其规则与`api`接口路径一致，比如`api`接口路径为`api/my/settings`，则相应的模拟数据文件为`mock-data/my/settings.josn`，如果不一致，则模拟数据不会生效。

增加或禁用模拟数据需修改`src/mock/index.ts`文件：

```typescript
const modules = import.meta.glob([
  // 修改这里的引入路径以增加或禁用相应的模拟数据
  './mock-data/*.json'
], {
  eager: false, // 使用懒加载，这样每个 JSON 文件会成为一个单独的 chunk
  import: 'default', // 导入默认导出（JSON 文件默认导出的就是整个对象）
});
```


# 服务端渲染

项目目录下的`ssr`子目录为服务端渲染目录，`vite.ssr.config.ts`文件为服务端渲染构建配置文件。

`ssr/i18n.ts`为国际化支持的语言集合，可根据需要修改。
`ssr/server.ts`文件为服务端渲染的服务程序，默认可根据参数设置为一次构建或启动`http`构建服务，默认一种语言开启一个渲染线程，可根据需要自行修改。
`ssr/render.ts`为实际的渲染代码，服务程序给每一种语言创建一个`render.ts`线程进行渲染，其中可配置`pages`属性以定制需要渲染的页面。

执行命令`npm run ssr[:环境]`构建服务端渲染代码，执行前记得先执行`npm run build[:环境]`先构建相应项目。
构建成功后，默认会在根目录下生成`dist/ssr`子目录。

以`build`的方式执行`dist/ssr/server.js`（需先执行命令`npm i`安装依赖包），成功则在`dist/www/ssr`生成服务端渲染页面。

