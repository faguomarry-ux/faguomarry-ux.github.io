---
title: 'Euler 方程组：无黏假设带来了什么？'
published: 2026-10-10
description: '从压力应力写出不可压缩 Euler 方程，讨论边界条件与能量守恒。'
category: 'Euler 方程组'
tags: ['起步笔记', '方程推导', '无黏流']
series: '从守恒律到流体方程'
seriesOrder: 3
---

> 起步笔记：以下是常密度不可压缩 Euler 模型。可压缩 Euler 还需要质量、能量方程与状态关系。

## 压力应力模型

对无黏流体，取 $\sigma=-pI$。将其代入 $\rho D_tu=\nabla\cdot\sigma+\rho f$，结合常密度下的质量守恒，得到

$$
\begin{cases}
\partial_tu+(u\cdot\nabla)u=-\rho^{-1}\nabla p+f,\\
\nabla\cdot u=0.
\end{cases}
$$

## 边界条件的区别

在固定固壁上，无黏模型通常施加不可穿透条件 $u\cdot n=0$。N–S 中的无滑移条件 $u=0$ 一般不能直接沿用到 Euler。

把 N–S 中的黏性项形式上删去可以得到 Euler 的方程形式，但这不等于已经证明黏度趋零时解收敛；边界层会使该问题更加复杂。

## 光滑解的能量

在光滑有界区域上，若 $u\cdot n=0$、$f=0$，且解足够光滑，则

$$
\frac{d}{dt}\frac12\int_\Omega|u|^2\,dx=0.
$$

对流和压力造成的能量通量在边界上消失。对低正则性弱解，能量守恒需要进一步条件，不能直接搬用这个经典计算。
