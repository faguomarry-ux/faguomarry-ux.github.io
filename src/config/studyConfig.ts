export const studyTopics = [
	{
		name: "微分几何",
		group: "数学笔记",
		mark: "01",
		description: "从曲线与曲面出发，理解流形、度量、联络与曲率。",
	},
	{
		name: "实分析",
		group: "数学笔记",
		mark: "02",
		description: "测度、积分与收敛：为连续问题建立严谨的语言。",
	},
	{
		name: "泛函分析",
		group: "数学笔记",
		mark: "03",
		description: "在函数空间中讨论范数、算子、弱收敛与对偶。",
	},
	{
		name: "偏微分方程",
		group: "数学笔记",
		mark: "04",
		description: "从模型到解：初边值问题、弱形式与能量估计。",
	},
	{
		name: "流体力学",
		group: "流体与方程",
		mark: "05",
		description: "连续介质、物质导数与守恒律的物理直觉。",
	},
	{
		name: "N–S 方程组",
		group: "流体与方程",
		mark: "06",
		description: "从应力与动量守恒推导黏性流体方程。",
	},
	{
		name: "Euler 方程组",
		group: "流体与方程",
		mark: "07",
		description: "无黏流动、压力约束与涡量输运。",
	},
	{
		name: "英语学习",
		group: "语言学习",
		mark: "08",
		description: "数学英语、精读摘记与自己的表达练习。",
	},
	{
		name: "西语学习",
		group: "语言学习",
		mark: "09",
		description: "从发音与变位开始，积累句子与阅读体验。",
	},
	{
		name: "闲谈记录",
		group: "日常与思考",
		mark: "10",
		description: "学习之外的观察，也值得认真留下一页。",
	},
] as const;
export const topicUrl = (name: string): string =>
	"/archive/?category=" + encodeURIComponent(name);
