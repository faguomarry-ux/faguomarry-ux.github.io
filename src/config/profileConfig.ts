import type { ProfileConfig } from "../types/profileConfig";
export const profileConfig: ProfileConfig = {
	avatar: "/assets/images/notebook-avatar.svg",
	name: "faguomarry",
	bio: "以推导整理思路，以文字留住日常。数学 · 流体 · 语言",
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/faguomarry-ux",
			showName: true,
		},
		{ name: "RSS", icon: "fa7-solid:rss", url: "/rss/", showName: true },
	],
};
