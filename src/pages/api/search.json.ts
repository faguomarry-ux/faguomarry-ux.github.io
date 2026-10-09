import { getSortedPosts } from "@/utils/content-utils";
import { getPostUrlBySlug } from "@/utils/url-utils";

// A substring index complements Pagefind's word-based matching for Chinese.
// Encrypted posts must never expose their body through this public index.
export async function GET(): Promise<Response> {
	const posts = await getSortedPosts();
	return Response.json(
		posts
			.filter((post) => !post.data.password)
			.map((post) => ({
				url: getPostUrlBySlug(post.id),
				title: post.data.title,
				text: [post.data.description, post.data.category, post.body ?? ""].join(
					"\n",
				),
			})),
	);
}
