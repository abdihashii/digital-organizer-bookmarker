export type BookmarkType = {
	uuid: number | string;
	title: string | undefined;
	url: string | undefined;
	imgSrc?: string | undefined;
	featured?: boolean | undefined;
	tags?: Array<string> | undefined;
};
