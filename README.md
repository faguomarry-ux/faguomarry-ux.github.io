# 行间笔记

关于数学、流体力学、语言学习与日常思考的个人博客，基于 [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly) 与 Astro 构建。

站点目标地址：https://faguomarry-ux.github.io

## 栏目

微分几何 · 实分析 · 泛函分析 · 偏微分方程 · 流体力学 · N–S 方程组 · Euler 方程组 · 英语学习 · 西语学习 · 闲谈记录。

## 开始使用

使用 Node.js 24、pnpm 11：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

新建文章：`pnpm new-post my-note`。文章位于 `src/content/posts/`，写作模板位于 `templates/`。

完整的写作、个人信息设置和 GitHub Pages 部署步骤见 [博客使用指南](docs/BLOG-GUIDE.md)。

验证命令：`pnpm check`、`pnpm type-check`、`pnpm build`。生产预览：`pnpm preview`。

## 致谢

保留 Firefly 上游 MIT 许可证与主题署名。第一版内容中标注的“起步笔记”为栏目示例，可按实际学习进度修改、扩充或删除。
