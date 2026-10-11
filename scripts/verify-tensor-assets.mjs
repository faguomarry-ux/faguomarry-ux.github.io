import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const html = readFileSync(
	resolve(root, "dist/posts/fluid-mechanics/tensors/index.html"),
	"utf8",
);
const source = readFileSync(
	resolve(root, "src/content/posts/fluid-mechanics/tensors.mdx"),
	"utf8",
);
assert.equal((source.match(/^## 问题 \d：/gm) ?? []).length, 7);
assert.equal((source.match(/我的问题（原文）/g) ?? []).length, 7);
assert.ok(!html.includes("katex-error"), "Rendered formula error found");
assert.ok(
	!/(?:localhost|127\.0\.0\.1|sandbox:|file:\/\/|C:\\Users|D:\\swap)/.test(
		html,
	),
	"A temporary or local-machine URL leaked into the article",
);
const figures = new Set(
	[
		...html.matchAll(
			/src="(\/images\/fluid-mechanics\/tensors\/[^"?]+\.svg)"/g,
		),
	].map((match) => match[1]),
);
assert.equal(figures.size, 8, "Expected all eight explanatory SVG figures");
const stressImage =
	"/images/fluid-mechanics/tensors/shear-and-normal-stresses.png";
assert.ok(html.includes(stressImage), "Missing Wikimedia stress illustration");
assert.ok(
	readFileSync(resolve(root, `dist${stressImage}`)).equals(
		readFileSync(resolve(root, `public${stressImage}`)),
	),
	"Stress illustration differs after build",
);
assert.ok(html.includes("Joseasorrentino"), "Missing image author attribution");
assert.ok(
	html.includes("https://creativecommons.org/licenses/by-sa/4.0/"),
	"Missing image license link",
);
for (const url of figures) {
	const published = readFileSync(resolve(root, `dist${url}`));
	const original = readFileSync(resolve(root, `public${url}`));
	assert.ok(published.equals(original), `SVG differs after build: ${url}`);
	assert.ok(
		!/<script|(?:href|src)=["'](?:https?:|file:|data:)/i.test(
			published.toString(),
		),
		`Unexpected external resource in SVG: ${url}`,
	);
}
const scripts = new Set(
	[...html.matchAll(/(?:component-url|renderer-url)="([^"?]+\.js)"/g)].map(
		(match) => match[1],
	),
);
assert.ok(scripts.size >= 3, "Missing client island scripts");
for (const url of scripts) {
	assert.ok(url.startsWith("/_astro/"), `Non-local island script: ${url}`);
	assert.ok(existsSync(resolve(root, `dist${url}`)), `Missing script: ${url}`);
}
const config = readFileSync(resolve(root, "astro.config.mjs"), "utf8");
assert.ok(config.includes('base: "/"'), "Recheck URLs for a project-site base");
const workflow = readFileSync(
	resolve(root, ".github/workflows/deploy.yml"),
	"utf8",
);
assert.ok(workflow.includes("path: dist"), "Pages must publish the built site");
console.log(
	`Tensor deployment check passed: 7 original questions, ${figures.size} SVG files, 1 attributed PNG, ${scripts.size} local island scripts; no formula errors or temporary URLs.`,
);
