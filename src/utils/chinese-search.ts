import type { SearchResult } from "@/global";
import { url } from "@/utils/url-utils";

type TextEntry = { url: string; title: string; text: string };
let indexPromise: Promise<TextEntry[]> | undefined;
const escapeHtml = (text: string): string =>
	text.replace(
		/[&<>"']/g,
		(char) =>
			({
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#39;",
			})[char] ?? char,
	);

export async function searchChineseText(
	keyword: string,
): Promise<SearchResult[]> {
	if (!indexPromise) {
		indexPromise = fetch(url("/api/search.json"))
			.then((response) => {
				if (!response.ok) throw new Error("Cannot load text search index");
				return response.json() as Promise<TextEntry[]>;
			})
			.catch((error) => {
				indexPromise = undefined;
				throw error;
			});
	}
	const query = keyword.trim().toLocaleLowerCase();
	if (!query) return [];
	return (await indexPromise)
		.filter((entry) =>
			`${entry.title}\n${entry.text}`.toLocaleLowerCase().includes(query),
		)
		.map((entry) => {
			const position = Math.max(
				0,
				entry.text.toLocaleLowerCase().indexOf(query),
			);
			const excerpt = entry.text.slice(
				Math.max(0, position - 25),
				position + 100,
			);
			return {
				url: entry.url,
				meta: { title: entry.title },
				excerpt: escapeHtml(excerpt),
			};
		});
}
