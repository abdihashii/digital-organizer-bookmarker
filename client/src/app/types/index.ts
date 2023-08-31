export type BookmarkType = {
	uuid: number | string;
	title: string | null;
	url: string | null;
	imgsrc?: string | null;
	featured?: boolean | null;
	tags?: Array<string> | null;
};
