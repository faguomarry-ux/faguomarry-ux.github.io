import {
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/navBarConfig";
import { studyTopics, topicUrl } from "./studyConfig";
export const LinkPresets: Record<string, NavBarLink> = {
	Home: { name: "首页", url: "/", icon: "material-symbols:home" },
	Archive: { name: "归档", url: "/archive/", icon: "material-symbols:archive" },
	Categories: {
		name: "分类",
		url: "/categories/",
		icon: "material-symbols:folder-open-rounded",
	},
	Tags: { name: "标签", url: "/tags/", icon: "material-symbols:tag-rounded" },
	Series: { name: "系列", url: "/series/", icon: "material-symbols:layers" },
	About: { name: "关于", url: "/about/", icon: "material-symbols:person" },
};
export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPresets.Home,
		...["数学笔记", "流体与方程", "语言学习"].map((group) => ({
			name: group,
			url: "/topics/",
			icon: "material-symbols:menu-book-rounded",
			children: studyTopics
				.filter((t) => t.group === group)
				.map((t) => ({ name: t.name, url: topicUrl(t.name) })),
		})),
		{ name: "闲谈", url: topicUrl("闲谈记录"), icon: "material-symbols:chat" },
		LinkPresets.Archive,
		LinkPresets.About,
	],
};
