# 行间笔记：写作与部署

本站基于 [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly)，保留上游 MIT 许可证。第一版站名为“行间笔记”，作者显示名暂用 faguomarry。

## 本地使用

安装 Node.js 24 与 pnpm 11，然后在仓库根目录运行：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

开发预览地址默认是 http://localhost:4321。全文搜索索引由生产构建生成，验证搜索请用 `pnpm build` 后的 `pnpm preview`。

搜索使用 Pagefind，并为中文补充标题与正文的子串匹配。中文索引在构建时生成；草稿不进入生产索引，加密文章正文也不进入公开的中文索引。

## 写一篇文章

网站的 `/writing/` 提供完整的 Markdown 写作与发布指南，以及可下载模板。快捷创建：`pnpm new-post pde/my-note "偏微分方程" "文章标题"`，默认草稿；写完改为 `draft: false`，运行 `pnpm publish-post pde/my-note.md` 可完成检查、单篇提交和推送。公式可以直接点击复制不含 `$` 的 LaTeX 源码。

运行 `pnpm new-post my-note`，或把 `templates/math-note.md` / `templates/language-note.md` 复制到 `src/content/posts/` 下。子文件夹用于整理源文件，文章归属由 `category` 决定。

```yaml
title: '文章标题'
published: 2026-10-10
description: '一两句话概括内容'
category: '微分几何'
tags: ['流形', '学习笔记']
draft: false
series: '流形笔记'
seriesOrder: 1
```

日期请填写实际写作日期；`draft: true` 不在正式构建中发布。`series` 用于连续笔记，`seriesOrder` 表示阅读顺序；`pinned: true` 可置顶。

当前栏目名称：微分几何、实分析、泛函分析、偏微分方程、流体力学、N–S 方程组、Euler 方程组、英语学习、西语学习、闲谈记录。要修改栏目名称，同时更新文章的 `category` 和 `src/config/studyConfig.ts`。

行内公式用 `$...$`，独立公式用 `$$...$$`。先列清符号、假设、定义域与初边值条件，再写推导，最后记下检查和参考资料。首批“起步笔记”是栏目示例，可直接修改或删除。

## 个人信息与外观

- 站名、描述、网址与主题色：`src/config/siteConfig.ts`。
- 作者、头像、GitHub 链接：`src/config/profileConfig.ts`。
- 首页横幅：`src/config/backgroundWallpaper.ts`。
- 栏目与导航：`src/config/studyConfig.ts`、`src/config/navBarConfig.ts`。
- 关于页面：`src/content/spec/about.md`。

当前头像和横幅为本站 SVG 图形。替换图片时推荐使用自己的文件名。评论默认关闭；若使用 Giscus，需要先在自己的仓库启用 Discussions，并将真实 repoId/categoryId 填入 `src/config/commentConfig.ts` 后启用。

## GitHub Pages

站点网址已配置为 https://faguomarry-ux.github.io，用户主页仓库的 `base` 保持 `/`。

1. 在 GitHub 仓库 Settings → Pages → Build and deployment，将 Source 设为 **GitHub Actions**。
2. 提交并推送到 `master` 或 `main`，触发 `.github/workflows/deploy.yml`。
3. 等待 Actions 中构建与部署任务通过，再访问站点。

本地验证：`pnpm check`、`pnpm type-check`、`pnpm build`。部署日志与 Pages 地址以 GitHub 返回的结果为准。

第一版未填写个人邮箱、评论服务或统计 ID。开启功能前请使用自己的配置。
