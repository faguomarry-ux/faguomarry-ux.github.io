import type { SidebarLayoutConfig } from "../types/sidebarConfig";
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	enable: true,
	position: "left",
	tabletSidebar: "left",
	hideSidebarOnPostPage: false,
	leftComponents: [
		{ type: "profile", enable: true, position: "top", showOnPostPage: true },
		{
			type: "announcement",
			enable: true,
			position: "top",
			showOnPostPage: false,
		},
		{
			type: "categories",
			enable: true,
			position: "sticky",
			showOnPostPage: false,
			specificConfig: { collapseThreshold: 12 },
		},
		{
			type: "sidebarToc",
			enable: true,
			position: "sticky",
			showOnPostPage: true,
			hideOnNonPostPage: true,
		},
	],
	rightComponents: [],
	mobileBottomComponents: [
		{ type: "profile", enable: true, showOnPostPage: false },
	],
};
