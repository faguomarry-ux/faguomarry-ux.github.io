---
title: '微分几何起步：第一基本形式在测量什么？'
published: 2026-10-10
description: '从曲面参数化出发，把空间中的长度写成参数平面上的度量。'
category: '微分几何'
tags: ['起步笔记', '曲面', '度量']
series: '曲面与几何'
seriesOrder: 1
---

> 起步笔记：这一页从一个具体计算开始，后续可以补充曲率与联络。

## 从参数化到长度

设正则曲面的局部参数化为 $X(u,v)$，其中 $X_u$ 与 $X_v$ 线性无关。曲面上的曲线可写为 $\gamma(t)=X(u(t),v(t))$。链式法则给出

$$
\gamma'(t)=X_u u'(t)+X_v v'(t).
$$

记 $E=\langle X_u,X_u\rangle$、$F=\langle X_u,X_v\rangle$、$G=\langle X_v,X_v\rangle$，则

$$
|\gamma'(t)|^2=E(u')^2+2Fu'v'+G(v')^2.
$$

因此第一基本形式 $ds^2=E\,du^2+2F\,du\,dv+G\,dv^2$ 描述了如何在参数坐标中计算曲面上的长度。

## 球面的例子

半径为 $R$ 的球面取 $X(\theta,\varphi)=(R\sin\theta\cos\varphi,R\sin\theta\sin\varphi,R\cos\theta)$，在避开极点的坐标域上得到

$$
ds^2=R^2d\theta^2+R^2\sin^2\theta\,d\varphi^2.
$$

同样的经度变化，在靠近极点时对应更短的距离。这是坐标与几何长度之间的区别。

## 下一页的问题

如何从度量得到测地线？换一组参数坐标时，哪些量改变，哪些几何结论保持不变？
