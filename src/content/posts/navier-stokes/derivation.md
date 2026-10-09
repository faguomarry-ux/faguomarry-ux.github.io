---
title: 'N–S 方程组：从动量守恒到不可压缩模型'
published: 2026-10-10
description: '列清连续介质、牛顿流体、常密度与常黏度假设，再展开应力散度。'
category: 'N–S 方程组'
tags: ['起步笔记', '方程推导', '不可压缩流']
series: '从守恒律到流体方程'
seriesOrder: 2
pinned: true
---

> 起步笔记：这里推导常密度、常黏度的不可压缩牛顿流体模型。它不是一般可压缩情形的完整方程组。

## 符号与假设

$u$ 是速度，$p$ 是压力，$\rho>0$ 是常密度，$\mu>0$ 是常动力黏度，$f$ 是单位质量所受的体力。以下场量假设足够光滑，以便进行经典微分运算。

## 质量守恒

连续性方程为

$$
\partial_t\rho+\nabla\cdot(\rho u)=0.
$$

常密度条件下得到 $\nabla\cdot u=0$。

## 动量守恒与应力

Cauchy 动量方程为 $\rho D_tu=\nabla\cdot\sigma+\rho f$。对不可压缩牛顿流体，取

$$
\sigma=-pI+2\mu D(u),\qquad
D(u)=\frac{\nabla u+(\nabla u)^T}{2}.
$$

由于 $\mu$ 为常数，

$$
\nabla\cdot(2\mu D(u))
=\mu\Delta u+\mu\nabla(\nabla\cdot u)=\mu\Delta u.
$$

除以 $\rho$，令 $\nu=\mu/\rho$，得到

$$
\begin{cases}
\partial_tu+(u\cdot\nabla)u=-\rho^{-1}\nabla p+\nu\Delta u+f,\\
\nabla\cdot u=0.
\end{cases}
$$

## 初边值条件与能量

在固定光滑有界区域上，可考虑无滑移条件 $u|_{\partial\Omega}=0$，初值须满足不可压缩约束与相应兼容条件。对足够光滑的解，动量方程与 $u$ 做 $L^2$ 内积得到

$$
\frac12\frac{d}{dt}\|u\|_{L^2}^2+
\nu\|\nabla u\|_{L^2}^2=\int_\Omega f\cdot u\,dx.
$$

对流项与压力项分别利用散度约束及边界条件消去。这个估计是研究弱解的起点，但本身并不能解决三维全局光滑性问题。

下一步：[Euler 方程与无黏模型](/posts/euler/inviscid-model/)。
