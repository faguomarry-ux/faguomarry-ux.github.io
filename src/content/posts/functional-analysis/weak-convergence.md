---
title: '泛函分析起步：用测试来理解弱收敛'
published: 2026-10-10
description: '以 ℓ² 的标准基为例，理解弱收敛为什么比范数收敛更宽松。'
category: '泛函分析'
tags: ['起步笔记', 'Hilbert 空间', '弱收敛']
series: '函数空间笔记'
seriesOrder: 1
---

> 起步笔记：用一个无限维例子辨认收敛方式。

## 定义中的测试

Banach 空间 $X$ 中，$x_n\rightharpoonup x$ 表示对每个连续线性泛函 $\ell\in X^*$，都有 $\ell(x_n)\to\ell(x)$。范数收敛蕴含弱收敛，因为

$$
|\ell(x_n)-\ell(x)|\le\|\ell\|\,\|x_n-x\|.
$$

## 标准基的例子

取实 Hilbert 空间 $\ell^2$ 的标准基 $e_n$。对任意 $y=(y_k)\in\ell^2$，有 $\langle e_n,y\rangle=y_n\to0$。由 Riesz 表示定理，每个连续线性泛函都可用内积表示，因此 $e_n\rightharpoonup0$。

另一方面，$\|e_n\|_{\ell^2}=1$，所以它不在范数意义下收敛到零。

## 与 PDE 的联系

能量估计常先给出函数序列的范数界。弱紧性可以帮助提取子列，但把极限送入非线性项通常还需要额外的强收敛或紧性信息。

下一步：整理反身性、有界序列与弱收敛子列之间的关系，并注明各定理所需的空间条件。
