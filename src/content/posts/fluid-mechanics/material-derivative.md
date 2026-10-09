---
title: '流体力学起步：跟着质点看物质导数'
published: 2026-10-10
description: '从粒子轨迹上的链式法则出发，理解局部变化与对流变化。'
category: '流体力学'
tags: ['起步笔记', '物质导数', '连续介质']
series: '从守恒律到流体方程'
seriesOrder: 1
---

> 起步笔记：先把观察方式与符号对应起来。

## 两种描述

Euler 描述在固定空间点观察速度场 $u(x,t)$。Lagrange 描述追踪质点轨迹 $X(a,t)$，其中 $a$ 标记初始位置，且

$$
\frac{dX}{dt}=u(X(a,t),t).
$$

## 链式法则

对光滑标量场 $q(x,t)$，沿着轨迹求导：

$$
\frac{d}{dt}q(X(a,t),t)
=\partial_tq+u\cdot\nabla q.
$$

这定义了物质导数 $D_t=\partial_t+u\cdot\nabla$。流体质点的加速度因此为 $D_tu$。

## 一个检查

即便速度场不显含时间，质点也可能沿流线加速：$\partial_tu=0$ 并不推出 $D_tu=0$。例如 $u(x,y)=(x,-y)$ 的散度为零，但 $(u\cdot\nabla)u=(x,y)$。

继续阅读：[不可压缩 N–S 方程的推导](/posts/navier-stokes/derivation/)。
