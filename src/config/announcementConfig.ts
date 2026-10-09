import type { AnnouncementConfig } from "../types/announcementConfig";
export const announcementConfig: AnnouncementConfig = {
	title: "写在开始",
	content:
		"这里收集学习中的定义、推导、疑问与回顾。起步笔记会随着理解不断修订。",
	closable: false,
	link: {
		enable: true,
		text: "从学习地图开始",
		url: "/topics/",
		external: false,
	},
};
