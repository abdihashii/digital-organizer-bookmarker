import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { BookmarkType } from '../types';

export const openAddBookmarkModalAtom = atom(false);

export const bookmarksAtom = atomWithStorage<Array<BookmarkType>>('bookmarks', [
	{
		id: 1,
		title: 'Google',
		url: 'https://google.com',
		featured: true,
		tags: ['search engine'],
	},
	{
		id: 2,
		title: 'Facebook',
		url: 'https://facebook.com',
	},
	{
		id: 3,
		title: 'Twitter',
		url: 'https://twitter.com',
		featured: true,
		tags: ['social media', 'microblogging'],
	},
	{
		id: 4,
		title: 'Instagram',
		url: 'https://instagram.com',
	},
	{
		id: 5,
		title: 'LinkedIn',
		url: 'https://linkedin.com',
	},
	{
		id: 6,
		title: 'YouTube',
		url: 'https://youtube.com',
		imgSrc:
			'https://images.unsplash.com/photo-1521302200778-33500795e128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
		featured: true,
		tags: ['video streaming'],
	},
]);
