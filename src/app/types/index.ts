export type BookmarkType = {
	id: number;
	title: string;
	url: string;
	featured?: boolean;
	tags?: Array<string>;
};
