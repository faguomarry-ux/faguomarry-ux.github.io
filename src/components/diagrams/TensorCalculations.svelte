<script lang="ts">
let { mode }: { mode: "slices" | "operations" | "constitutive" } = $props();
const uid = $props.id();
let rank = $state(3);
let k = $state(1);
let l = $state(1);
let operation = $state("outer");
let mu = $state(3);
const indices = [1, 2, 3];
const ops = [
	{
		id: "outer",
		label: "向量并矢",
		input: "a = (1, 2)，b = (3, 4)",
		rule: "Mᵢⱼ = aᵢbⱼ；没有求和指标",
		result: "[3, 4; 6, 8]",
		order: "1 + 1 → 2",
		steps: [
			"M₁₁ = 1 × 3 = 3",
			"M₁₂ = 1 × 4 = 4",
			"M₂₁ = 2 × 3 = 6",
			"M₂₂ = 2 × 4 = 8",
		],
	},
	{
		id: "vector",
		label: "张量乘向量",
		input: "A = [1, 2; 3, 4]，v = (5, 6)",
		rule: "wᵢ = Σⱼ Aᵢⱼvⱼ；消去指标 j",
		result: "(17, 39)",
		order: "2 + 1 → 1",
		steps: ["w₁ = 1 × 5 + 2 × 6 = 17", "w₂ = 3 × 5 + 4 × 6 = 39"],
	},
	{
		id: "trace",
		label: "求迹缩并",
		input: "A = [1, 2; 3, 4]",
		rule: "tr A = Σᵢ Aᵢᵢ；只加对角元素",
		result: "5",
		order: "2 → 0",
		steps: ["A₁₁ + A₂₂ = 1 + 4 = 5", "两个指标位置缩并，结果没有自由指标。"],
	},
	{
		id: "double",
		label: "双重缩并",
		input: "A = [1, 2; 3, 4]，B = [5, 6; 7, 8]",
		rule: "A:B = ΣᵢΣⱼ AᵢⱼBᵢⱼ",
		result: "70",
		order: "2 + 2 → 0",
		steps: [
			"A:B = 1 × 5 + 2 × 6 + 3 × 7 + 4 × 8",
			"= 5 + 12 + 21 + 32 = 70",
			"对应元素相乘后全部相加，等于 tr(AᵀB)。",
		],
	},
];
const chosen = $derived(ops.find((item) => item.id === operation) ?? ops[0]);
const strain = [
	[2, 1],
	[1, -2],
];
function coefficient(i: number, j: number, a: number, b: number) {
	return mu * (Number(i === a && j === b) + Number(i === b && j === a));
}
function terms(i: number, j: number) {
	return strain
		.flatMap((row, a) =>
			row.map((value, b) => `${coefficient(i, j, a, b)} × (${value})`),
		)
		.join(" + ");
}
</script>

<section class="calculator" aria-label={mode === "slices" ? "高阶张量矩阵切片演示" : mode === "operations" ? "张量运算逐项计算" : "四阶本构双重缩并计算"}>
	<div class="eyebrow">TENSOR LAB / {mode === "slices" ? "矩阵与切片" : "逐项计算"}</div>
	{#if mode === "slices"}
		<h4>固定指标后，高阶张量就能逐片显示</h4>
		<div class="buttons">{#each [2, 3, 4] as value}<button type="button" aria-pressed={rank === value} onclick={() => rank = value}>{value} 阶张量</button>{/each}</div>
		{#if rank >= 3}
			<label for={`${uid}-k`}>固定第三指标 k</label><select id={`${uid}-k`} bind:value={k}>{#each indices as value}<option value={value}>{value}</option>{/each}</select>
		{/if}
		{#if rank === 4}
			<label for={`${uid}-l`}>固定第四指标 l</label><select id={`${uid}-l`} bind:value={l}>{#each indices as value}<option value={value}>{value}</option>{/each}</select>
		{/if}
		<p>{rank === 2 ? "Aᵢⱼ = 10i + j" : rank === 3 ? "Tᵢⱼₖ = 100i + 10j + k" : "Cᵢⱼₖₗ = 1000i + 100j + 10k + l"}（为辨认指标而选取的示例分量）</p>
		<svg viewBox="0 0 420 240" role="img" aria-label={`${rank}阶张量的当前三乘三分量矩阵`}>
			<path d="M60 30H45V210H60 M360 30H375V210H360" fill="none" stroke="currentColor" stroke-width="2" />
			{#each indices as i}{#each indices as j}
				<rect x={65 + (j - 1) * 100} y={40 + (i - 1) * 56} width="90" height="46" rx="7" fill="#318b9e20" />
				<text x={110 + (j - 1) * 100} y={68 + (i - 1) * 56} text-anchor="middle">{rank === 2 ? 10 * i + j : rank === 3 ? 100 * i + 10 * j + k : 1000 * i + 100 * j + 10 * k + l}</text>
			{/each}{/each}
		</svg>
		<p aria-live="polite">{rank === 2 ? "一个矩阵，9 个分量。" : rank === 3 ? `当前 T[:,:,${k}]。总共 3 个切片，27 个分量。` : `当前 C[:,:,${k},${l}]。总共 9 个矩阵块，81 个分量。`}</p>
		<p class="note">矩阵内的行、列仍由 i、j 决定。切片只是查看分量的方法，阶数始终由原张量的指标数量决定。</p>
	{:else if mode === "operations"}
		<h4>选择一个运算，查看每一项怎么计算</h4>
		<div class="buttons">{#each ops as item}<button type="button" aria-pressed={operation === item.id} onclick={() => operation = item.id}>{item.label}</button>{/each}</div>
		<div aria-live="polite"><p>{chosen.input}</p><p>{chosen.rule}</p><ol>{#each chosen.steps as step}<li>{step}</li>{/each}</ol><p class="result">结果：{chosen.result}</p><p>阶数：{chosen.order}</p></div>
	{:else}
		<h4>把四阶本构关系的四项求和真正展开</h4>
		<p>D = [2, 1; 1, −2] s⁻¹，Cᵢⱼₖₗ = μ(δᵢₖδⱼₗ + δᵢₗδⱼₖ)</p>
		<label for={`${uid}-mu`}>动力黏度 μ：{mu} Pa·s</label><input id={`${uid}-mu`} type="range" min="1" max="6" step="1" bind:value={mu} />
		<div class="sum" aria-live="polite">{#each [0, 1] as i}{#each [0, 1] as j}<p>τ{i + 1}{j + 1} = {terms(i, j)}<br /><strong>= {2 * mu * strain[i][j]} Pa</strong></p>{/each}{/each}</div>
		<p class="result">τ = [{4 * mu}, {2 * mu}; {2 * mu}, {-4 * mu}] Pa = 2μD</p>
		<p class="note">每行都按 (k,l) = (1,1)、(1,2)、(2,1)、(2,2) 的顺序展开。两个非对角输入分别贡献 μD₁₂ 和 μD₂₁，因此不能把剪切项漏算一半。</p>
	{/if}
	<noscript>交互需要 JavaScript；正文的 SVG、公式和完整计算步骤可直接阅读。</noscript>
</section>

<style>
.calculator { margin: 2rem 0; padding: clamp(1rem, 3vw, 1.75rem); border: 1px solid var(--line-divider, #94a3b855); border-radius: 16px; background: var(--card-bg, #fff); }
.eyebrow { font: 600 0.7rem/1.5 ui-monospace, monospace; letter-spacing: 0.12em; color: #638b98; }
h4 { margin: 0.5rem 0 1rem; font-size: 1.1rem; }
.buttons { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0; }
button, select { padding: 0.35rem 0.7rem; border: 1px solid #8297a766; border-radius: 7px; background: var(--card-bg, #fff); color: inherit; font: inherit; font-size: 0.85rem; cursor: pointer; }
button[aria-pressed="true"], button:hover { background: #318b9e22; border-color: #318b9e; }
button:focus-visible, select:focus-visible, input:focus-visible { outline: 2px solid #318b9e; outline-offset: 3px; }
label { margin-right: 0.5rem; font-size: 0.85rem; } select { margin: 0.4rem 1rem 0.4rem 0; }
svg { display: block; width: 100%; max-width: 500px; margin: 1rem auto; } svg text { fill: currentColor; font: 20px ui-monospace, monospace; }
p, li { font-size: 0.9rem; line-height: 1.8; } .result { font: 600 1rem/1.8 ui-monospace, monospace; padding: 0.7rem; border-radius: 8px; background: #318b9e15; }
.note { font-size: 0.8rem; opacity: 0.8; } input { width: 100%; margin: 1rem 0; accent-color: #318b9e; } .sum { font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
</style>
