<script lang="ts">
import { onMount } from "svelte";

let {
	mode,
	vector = [3, 4],
}: { mode: "basis" | "stress" | "motion"; vector?: [number, number] } =
	$props();
const uid = $props.id();
let angle = $state(45);
let time = $state(0);
let playing = $state(false);
let flow = $state("shear");
const rad = $derived((angle * Math.PI) / 180);
const c = $derived(Math.cos(rad));
const s = $derived(Math.sin(rad));
const tx = $derived(10 * c + 2 * s);
const ty = $derived(2 * c + 6 * s);
const normal = $derived(c * tx + s * ty);
const shear = $derived(-s * tx + c * ty);
const rotated = $derived([
	10 * c * c + 4 * s * c + 6 * s * s,
	2 * (c * c - s * s) - 4 * s * c,
	10 * s * s - 4 * s * c + 6 * c * c,
]);
const corners = [
	[-1, -1],
	[1, -1],
	[1, 1],
	[-1, 1],
];
const flows = [
	{
		id: "shear",
		label: "简单剪切",
		matrix: "L = [0, 1; 0, 0]",
		omega: "−1",
		d: "D = [0, ½; ½, 0]",
		w: "W = [0, ½; −½, 0]",
	},
	{
		id: "stretch",
		label: "平面伸缩",
		matrix: "L = [1, 0; 0, −1]",
		omega: "0",
		d: "D = [1, 0; 0, −1]",
		w: "W = 0",
	},
	{
		id: "rotation",
		label: "刚体旋转",
		matrix: "L = [0, −1; 1, 0]",
		omega: "2",
		d: "D = 0",
		w: "W = [0, −1; 1, 0]",
	},
];
const selected = $derived(flows.find((item) => item.id === flow) ?? flows[0]);
const fmt = (value: number) =>
	(Math.abs(value) < 0.0005 ? 0 : value).toFixed(2);

function transform(x: number, y: number, part: "L" | "D" | "W") {
	let a = 1;
	let b = 0;
	let cc = 0;
	let d = 1;
	if (flow === "stretch") {
		if (part !== "W") {
			a = Math.exp(time);
			d = Math.exp(-time);
		}
	} else if (flow === "rotation" || part === "W") {
		const theta = (flow === "rotation" ? 1 : -0.5) * time;
		if (!(flow === "rotation" && part === "D")) {
			a = d = Math.cos(theta);
			b = -Math.sin(theta);
			cc = Math.sin(theta);
		}
	} else if (part === "D") {
		a = d = Math.cosh(time / 2);
		b = cc = Math.sinh(time / 2);
	} else {
		b = time;
	}
	return [a * x + b * y, cc * x + d * y];
}
function points(part: "L" | "D" | "W") {
	return corners
		.map(([x, y]) => {
			const p = transform(x, y, part);
			return `${110 + p[0] * 30},${110 - p[1] * 30}`;
		})
		.join(" ");
}

onMount(() => {
	if (mode !== "motion") return;
	const observer = new IntersectionObserver(([entry]) => {
		if (!entry.isIntersecting) playing = false;
	});
	const element = document.getElementById(uid);
	if (element) observer.observe(element);
	return () => observer.disconnect();
});

$effect(() => {
	if (mode !== "motion" || !playing) return;
	let frame = 0;
	let previous = 0;
	const tick = (now: number) => {
		if (playing && previous) {
			time = Math.min(
				1.2,
				time + Math.min((now - previous) / 1000, 0.05) * 0.45,
			);
			if (time >= 1.2) playing = false;
		}
		previous = now;
		frame = requestAnimationFrame(tick);
	};
	frame = requestAnimationFrame(tick);
	return () => cancelAnimationFrame(frame);
});
</script>

<section class="explorer" id={uid} aria-label={mode === "basis" ? "基底旋转交互演示" : mode === "stress" ? "截面牵引力交互演示" : "速度梯度分解动画"}>
	<div class="eyebrow">TENSOR LAB / {mode === "basis" ? "01" : mode === "stress" ? "02" : "03"}</div>
	{#if mode === "basis" || mode === "stress"}
		<h4>{mode === "basis" ? "坐标在变，物理对象保持不变" : "转动截面，观察受力"}</h4>
		<label for={`${uid}-angle`}>{mode === "basis" ? "基底旋转角" : "截面法向角"} <output>{angle}°</output></label>
		<input id={`${uid}-angle`} type="range" min="0" max="180" step="0.5" bind:value={angle} />
		<div class="presets">
			{#each [0, 45, 90] as value}<button type="button" onclick={() => angle = value}>{value}°</button>{/each}
			{#if mode === "basis"}<button type="button" onclick={() => angle = 22.5}>主方向（22.5°）</button>{/if}
		</div>
		<div class="vector-layout">
			<svg viewBox="0 0 340 300" role="img" aria-label={mode === "basis" ? "固定速度向量和随角度旋转的新基底" : "截面、法向量与牵引力向量"}>
				<defs><marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="context-stroke" /></marker></defs>
				<path d="M25 155H315 M170 20V285" class="axis" />
				<text x="316" y="171">x</text><text x="178" y="22">y</text>
				{#if mode === "basis"}
					<ellipse cx="170" cy="155" rx="95" ry="60" class="ellipse" transform="rotate(-22.5 170 155)" />
					<line x1="170" y1="155" x2={170 + 20 * vector[0]} y2={155 - 20 * vector[1]} class="blue" marker-end={`url(#${uid}-arrow)`} />
					<text x={174 + 20 * vector[0]} y={150 - 20 * vector[1]}>u = ({vector[0]}, {vector[1]})</text>
					<line x1="170" y1="155" x2={170 + 112 * c} y2={155 - 112 * s} class="green" marker-end={`url(#${uid}-arrow)`} />
					<line x1="170" y1="155" x2={170 - 112 * s} y2={155 - 112 * c} class="green" marker-end={`url(#${uid}-arrow)`} />
					<text x={170 + 125 * c} y={155 - 125 * s}>e′₁</text><text x={170 - 125 * s} y={155 - 125 * c}>e′₂</text>
					<text x="30" y="280">椭圆标示固定的应力主方向</text>
				{:else}
					<circle cx="170" cy="155" r="90" class="ellipse" />
					<line x1={170 - 95 * s} y1={155 - 95 * c} x2={170 + 95 * s} y2={155 + 95 * c} class="cut" />
					<line x1="170" y1="155" x2={170 + 65 * c} y2={155 - 65 * s} class="orange" marker-end={`url(#${uid}-arrow)`} />
					<line x1="170" y1="155" x2={170 + 10 * tx} y2={155 - 10 * ty} class="blue" marker-end={`url(#${uid}-arrow)`} />
					<text x={178 + 65 * c} y={155 - 65 * s}>n</text><text x={178 + 10 * tx} y={155 - 10 * ty}>t</text>
					<text x="28" y="280">箭头长度分别采用方向与应力的比例尺</text>
				{/if}
			</svg>
			<div class="readout" aria-live="polite">
				{#if mode === "basis"}
					<p>u′ = Qᵀu</p><strong>({fmt(vector[0] * c + vector[1] * s)}, {fmt(-vector[0] * s + vector[1] * c)})</strong>
					<p>σ′ = QᵀσQ（Pa）</p>
					<div class="matrix"><span>{fmt(rotated[0])}</span><span>{fmt(rotated[1])}</span><span>{fmt(rotated[1])}</span><span>{fmt(rotated[2])}</span></div>
					<p>迹 = 16 · 行列式 = 56<br />主应力 = 8 ± 2√2 Pa</p>
				{:else}
					<p>t = σn（Pa）</p><strong>({fmt(tx)}, {fmt(ty)})</strong>
					<p>法向应力 n · t</p><strong>{fmt(normal)} Pa</strong>
					<p>有符号切向应力 m · t</p><strong>{fmt(shear)} Pa</strong>
					<p>m = (−sin θ, cos θ)</p>
				{/if}
			</div>
		</div>
		<p class="note">固定 σ = [10, 2; 2, 6] Pa。{mode === "basis" ? "绿色基底旋转，蓝色速度向量与应力主方向固定。" : "橙色为单位法向量，蓝色为牵引力；灰线为截面在二维中的迹线。"}</p>
	{:else}
		<h4>同一个速度梯度，分开看变形与自旋</h4>
		<div class="presets">{#each flows as item}<button type="button" aria-pressed={flow === item.id} onclick={() => { flow = item.id; time = 0; playing = false; }}>{item.label}</button>{/each}</div>
		<p class="formula">{selected.matrix} · {selected.d} · {selected.w}<br />涡度 ωz = {selected.omega} s⁻¹</p>
		<div class="motion-grid">
			{#each ["L", "D", "W"] as part}
				{@const p = transform(1, 1, part as "L" | "D" | "W")}
				<div>
					<svg viewBox="0 0 220 220" role="img" aria-label={`${part} 单独驱动时的物质微团形状`}>
						<path d="M10 110H210 M110 10V210" class="axis" /><rect x="80" y="80" width="60" height="60" class="initial" />
						<polygon points={points(part as "L" | "D" | "W")} class="parcel" />
						<circle cx={110 + p[0] * 30} cy={110 - p[1] * 30} r="4" fill="#e58932" />
					</svg>
					<strong>{part === "L" ? "完整流动 L" : part === "D" ? "仅应变率 D" : "仅自旋 W"}</strong>
				</div>
			{/each}
		</div>
		<label for={`${uid}-time`}>演化时间 <output>{time.toFixed(2)} s</output></label>
		<input id={`${uid}-time`} type="range" min="0" max="1.2" step="0.01" bind:value={time} oninput={() => playing = false} />
		<div class="presets"><button type="button" onclick={() => { if (time >= 1.2) time = 0; playing = !playing; }}>{playing ? "暂停" : "播放动画"}</button><button type="button" onclick={() => { time = 0; playing = false; }}>重置</button></div>
		<p class="note">虚线为初始形状，橙点标记同一角点。三图分别求解 ẋ = Lx、ẋ = Dx、ẋ = Wx，采用各自的精确解；有限时间后的形状不能直接相加。动画需手动播放，也可拖动时间滑块逐帧观察。</p>
	{/if}
	<noscript>交互演示需要启用 JavaScript；正文保留了对应公式与数值算例。</noscript>
</section>

<style>
	.explorer { margin: 2rem 0; padding: clamp(1rem, 3vw, 1.75rem); border: 1px solid var(--line-divider, #94a3b855); border-radius: 16px; background: var(--card-bg, #fff); color: var(--text-color, inherit); }
	.eyebrow { font: 600 0.7rem/1.5 ui-monospace, monospace; letter-spacing: 0.16em; color: #638b98; }
	h4 { margin: 0.4rem 0 1.2rem; font-size: 1.15rem; }
	label { display: flex; justify-content: space-between; gap: 1rem; font-size: 0.9rem; }
	output { font-variant-numeric: tabular-nums; }
	input { width: 100%; accent-color: #318b9e; margin: 0.7rem 0; cursor: pointer; }
	.presets { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.5rem 0 1rem; }
	button { padding: 0.35rem 0.75rem; border: 1px solid #8297a766; border-radius: 7px; font: inherit; font-size: 0.8rem; cursor: pointer; background: transparent; color: inherit; }
	button:hover, button[aria-pressed="true"] { background: #318b9e22; border-color: #318b9e; }
	button:focus-visible, input:focus-visible { outline: 2px solid #318b9e; outline-offset: 3px; }
	.vector-layout { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 1rem; align-items: center; }
	svg { display: block; width: 100%; height: auto; overflow: visible; }
	svg text { fill: currentColor; font: 11px system-ui, sans-serif; }
	.axis { stroke: #94a3b866; fill: none; stroke-width: 1; }
	.blue, .green, .orange { stroke-width: 3; }
	.blue { stroke: #4b95d8; }.green { stroke: #36a383; }.orange { stroke: #e58932; }
	.ellipse { fill: #4b95d80c; stroke: #94a3b888; stroke-dasharray: 5 5; }
	.cut { stroke: #94a3b8; stroke-width: 5; }.initial { fill: none; stroke: #94a3b8; stroke-dasharray: 4 4; }
	.parcel { fill: #318b9e22; stroke: #318b9e; stroke-width: 2; }
	.readout { padding: 1rem; background: #8297a710; border-radius: 10px; font-variant-numeric: tabular-nums; }
	.readout p { font-size: 0.8rem; margin: 0.65rem 0 0.3rem; }.readout strong { font: 600 1.1rem/1.4 ui-monospace, monospace; }
	.matrix { display: grid; grid-template-columns: 1fr 1fr; gap: 0.3rem 1.2rem; border-inline: 2px solid #8297a7; padding: 0.4rem; text-align: center; font: 1rem ui-monospace, monospace; }
	.note { font-size: 0.8rem; line-height: 1.7; opacity: 0.8; margin: 1rem 0 0; }
	.formula { font: 0.8rem/1.9 ui-monospace, monospace; }
	.motion-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); text-align: center; gap: 0.5rem; margin-bottom: 1.5rem; }
	.motion-grid strong { font-size: 0.8rem; }
	@media (max-width: 520px) { .vector-layout { grid-template-columns: 1fr; }.vector-layout svg { max-width: 340px; margin-inline: auto; }.motion-grid { gap: 0.1rem; }.motion-grid strong { font-size: 0.7rem; } }
</style>
