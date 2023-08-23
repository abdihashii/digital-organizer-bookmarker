export type BookmarkType = {
	uuid: number | string;
	title: string | null;
	url: string | null;
	imgSrc?: string | null;
	featured?: boolean | null;
	tags?: Array<string> | null;
};
