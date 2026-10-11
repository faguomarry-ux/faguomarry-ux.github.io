# 张量学习文章：静态部署与维护

文章源文件：`src/content/posts/fluid-mechanics/tensors.mdx`。
公开路由：`/posts/fluid-mechanics/tensors/`。

## GitHub Pages 可行性

这篇文章可以使用仓库现有的 GitHub Pages 工作流部署。`.github/workflows/deploy.yml` 在推送到 `main` 或 `master` 后执行 `pnpm build`，将 `dist` 上传为 Pages artifact，再部署。GitHub 仓库中的 MDX 源文件预览不会运行 Svelte；需要打开部署后的博客页面。

| 内容 | 构建后的形式 | 线上依赖 |
| --- | --- | --- |
| 七组问题、回答与计算步骤 | 静态 HTML | 无运行时服务 |
| 数学公式与矩阵 | 构建时生成的 KaTeX HTML 和字体样式 | 站点已有数学样式与字体 |
| 八张说明图 | `dist/images/fluid-mechanics/tensors/*.svg` | 站内静态图片 |
| 正应力与剪应力参考图 | 同目录的 `shear-and-normal-stresses.png` | 站内静态图片，图下注明作者与 CC BY-SA 4.0 |
| 基底旋转、截面受力、微团动画 | 静态 HTML + `/_astro/` 下的 Svelte 客户端脚本 | 浏览器 JavaScript |
| 高阶切片、逐项运算、本构缩并 | 静态 HTML + `/_astro/` 下的客户端脚本 | 浏览器 JavaScript |

交互组件使用 `client:visible`，滚动到组件附近后加载与绑定事件。动画由浏览器的 `requestAnimationFrame` 驱动，所有计算均在浏览器完成，不需要 Node、Python、API 或 ChatGPT 登录。Python 只是正文中的独立学习代码，不参与网页动画运行。

所有 SVG 都是普通站内文件，没有外链字体、脚本或远程图片依赖。SVG 以图片方式展示；交互动画中的 SVG 由组件生成。关闭 JavaScript 后，正文、公式、说明图和组件的初始静态画面仍可读，但滑块与播放按钮不能操作。SVG 本身不依赖 JavaScript。

当前为用户站点 `faguomarry-ux.github.io`，Astro 的 `base` 是 `/`，因此文章中的根路径资源可以直接使用。如果将来迁移到 `username.github.io/repository/` 这样的项目站点，需同步处理 `base` 和正文资源路径，不能照搬当前根路径。

## 发布前检查

```sh
pnpm check
pnpm type-check
pnpm build
node scripts/verify-tensor-assets.mjs
pnpm preview
```

资源检查脚本会核对七组原始问题、八张 SVG 是否完整复制到 `dist`、客户端脚本是否存在、公式是否出现渲染错误，以及是否误用 localhost、sandbox 或本机文件路径。它检查构建产物，不能代替 GitHub Actions 成功记录或线上实际访问。

浏览器验证覆盖：基底角度和主应力方向、截面法向与切向应力、微团播放及暂停、二至四阶切片切换、并矢与双重缩并逐项计算、黏度改变时的本构结果，以及窄屏显示。新增或更改组件后，应重新检查正文内的实际组件。

## 内容与图片来源

按照 `Downloads/张量定义解析.md` 中的七个问题顺序保留详细回答与计算，清理损坏的导出片段、修复公式分隔符和代码块，并统一约定。两张完整原 SVG 恢复为站内文件；其余矩阵、切片、微元图根据原文数学内容重新绘制，交互根据原文例子重建。

新增参考图 `shear-and-normal-stresses.png` 来自用户提供的附件，其作品为 Joseasorrentino 的 [Shear and normal stresses](https://commons.wikimedia.org/wiki/File:Shear_and_normal_stresses.png)（2018-10-13），按 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) 使用。保留附件内容，网页等比缩放；文章图注保留作者、来源、授权链接与副本说明。该图第一个指标表示面法向，与本文力方向在前的约定相反，正文已解释转置关系。后续若修改此图，应说明改动并遵守相同方式共享要求。

问题 7 的补充问答专门区分并矢、缩并和展平，包含不交换的矩阵乘法、不同缩并配对、Frobenius 内积、黏性耗散、四阶算子复合与 Mandel 剪切权重算例。

静态部署机制参考 [GitHub Pages 官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)、[Astro 静态资源说明](https://docs.astro.build/en/guides/imports/) 与 [Astro 客户端指令](https://docs.astro.build/en/reference/directives-reference/)。
