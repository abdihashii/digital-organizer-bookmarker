export type BookmarkType = {
	id: number | string;
	title: string;
	url: string;
	imgSrc?: string;
	featured?: boolean;
	tags?: Array<string>;
};
