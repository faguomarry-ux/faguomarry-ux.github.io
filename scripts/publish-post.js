import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.resolve("src/content/posts");
const argument = process.argv[2];
if (!argument)
	throw new Error("用法：pnpm publish-post <相对文章目录的文件名.md>");
const file = path.resolve(root, argument);
if (
	!file.startsWith(`${root}${path.sep}`) ||
	!file.endsWith(".md") ||
	!fs.existsSync(file)
) {
	throw new Error("请选择 src/content/posts 内已有的 .md 文件");
}
const { data } = matter(fs.readFileSync(file, "utf8"));
if (!data.title || !data.published || data.draft !== false) {
	throw new Error("请填写 title、published，并明确设置 draft: false 后再发布");
}
function run(command, args, capture = false) {
	const result = spawnSync(command, args, {
		stdio: capture ? "pipe" : "inherit",
		encoding: "utf8",
	});
	if (result.error) throw result.error;
	if (result.status !== 0) process.exit(result.status || 1);
	return result.stdout?.trim();
}
// Do not accidentally include other staged work in the article commit.
if (run("git", ["diff", "--cached", "--name-only"], true)) {
	throw new Error("暂存区已有其他改动，请先提交或取消暂存，再发布文章");
}
const branch = run("git", ["branch", "--show-current"], true);
if (!["master", "main"].includes(branch))
	throw new Error("请在 master 或 main 分支发布");
for (const task of ["check", "type-check", "build"]) {
	// Invoke pnpm's JS entrypoint to avoid Windows .cmd shell quoting.
	run(process.execPath, [process.env.npm_execpath, "run", task]);
}
if (process.argv.includes("--check-only")) {
	console.log("文章检查通过，未提交或推送。");
	process.exit(0);
}
run("git", ["add", "--", file]);
if (!run("git", ["diff", "--cached", "--name-only"], true)) {
	console.log("文章没有新改动，无需再次提交。");
	process.exit(0);
}
run("git", ["commit", "-m", `docs: publish ${path.basename(file, ".md")}`]);
run("git", ["push", "origin", branch]);
console.log(
	"文章已推送，请等待 GitHub Actions 部署完成。推送失败时可用 git push 重试。",
);
