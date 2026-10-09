# 用 Markdown 写下你的下一篇笔记

一篇文章就是一个 `.md` 文件。把文件放进仓库的 `src/content/posts/`，填写文章信息、写好正文并提交，GitHub Actions 就会自动构建和发布。

## 路径一：直接在 GitHub 上传

适合已经在 Typora、Obsidian 或其他编辑器中写好的文章，无需安装本地开发环境。

1. 下载 <a href="/templates/math-note.md" download>数学笔记模板</a> 或 <a href="/templates/language-note.md" download>语言学习模板</a>，改成自己的文件名，例如 `heat-energy-02.md`。
2. 修改文件顶部的标题、日期、简介、栏目和标签，在下面写正文。准备公开时，把 `draft: true` 改为 `draft: false`。
3. 打开 [GitHub 文章目录](https://github.com/faguomarry-ux/faguomarry-ux.github.io/tree/master/src/content/posts)，选择 **Add file → Upload files**，拖入 `.md` 文件，然后提交到 `master`。也可以选择 **Create new file** 在线粘贴 Markdown。
4. 到 [Actions](https://github.com/faguomarry-ux/faguomarry-ux.github.io/actions) 等待 **Deploy to GitHub Pages** 显示绿色，再打开文章。上传成功不等于部署完成。

已有文章可以在 GitHub 打开对应文件，点击铅笔修改并提交。建议使用英文小写文件名，用短横线连接单词；修改文件路径会改变文章网址。

## 路径二：本地创建、预览、发布

首次使用需安装 Node.js 24、pnpm，并配置好当前仓库的 GitHub 推送权限。在仓库根目录运行：

```sh
pnpm install --frozen-lockfile
pnpm new-post pde/heat-energy-02 "偏微分方程" "热方程的第二条能量估计"
pnpm dev
```

新文件位于 `src/content/posts/pde/heat-energy-02.md`，默认是草稿。打开文件完成写作；本地预览地址是 `http://localhost:4321/`。文件夹用于整理，栏目由 `category` 决定。

准备好后设置 `draft: false`，用一条命令检查、提交这篇文章并推送：

```sh
pnpm publish-post pde/heat-energy-02.md
```

命令会依次进行内容检查、类型检查和完整构建，通过后只提交指定的 Markdown 文件，再推送当前 `master` 或 `main` 分支。其他文件不会自动提交；若文章包含新增图片，请先把图片也提交到仓库。检查失败时不会创建提交。推送失败时本地提交仍在，解决连接或权限问题后运行 `git push` 即可。

只想检查而暂时不发布，可以运行 `pnpm publish-post pde/heat-energy-02.md --check-only`。

## 文章顶部怎么填

```yaml
---
title: '热方程的能量估计'
published: 2026-10-10
description: '从分部积分得到 L² 能量耗散。'
category: '偏微分方程'
tags: ['能量估计', '学习笔记']
draft: false
series: 'PDE 学习笔记'
seriesOrder: 2
---
```

日期填写实际写作日期，保持 `YYYY-MM-DD` 格式。`title` 和 `published` 必填；`series` 和 `seriesOrder` 是可选的系列信息。`draft: true` 可以本地预览，但不会出现在正式站点；草稿文件提交到公开仓库后，源码仍然公开。

当前栏目：微分几何、实分析、泛函分析、偏微分方程、流体力学、N–S 方程组、Euler 方程组、英语学习、西语学习、闲谈记录。请复制准确名称，使文章归入已有栏目。

## 正文、公式和图片

正文支持标题、列表、链接、引用和代码块。行内公式用 `$...$`，独立公式用 `$$...$$`：

```markdown
## 推导过程

考虑温度场 $u(x,t)$。

$$
\partial_t u - \Delta u = 0
$$

参考：[资料名称](https://example.com)

![示意图](/images/heat-note.png)
```

图片示例对应仓库的 `public/images/heat-note.png`，需要一起上传。公开文章中的行内公式和独立公式都可以点击复制 LaTeX 源码，键盘选中公式后按 Enter 或空格也可以；复制内容不包含 `$` 分隔符。

## 发布没出现时

先确认 `draft: false`、文件在 `src/content/posts/` 中且扩展名为 `.md`，再查看 Actions。顶部 YAML 的缩进、引号或日期错误可能导致构建失败。部署成功后刷新网页；如仍显示旧内容，可尝试强制刷新。不要把密码、令牌或私人信息写进公开的文章文件。
