export type BookmarkType = {
	id: number;
	title: string;
	url: string;
	imgSrc?: string;
	featured?: boolean;
	tags?: Array<string>;
};
