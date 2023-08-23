import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { BookmarkType } from '../types';

export const openAddBookmarkModalAtom = atom(false);

export const bookmarksAtom = atomWithStorage<Array<BookmarkType>>('bookmarks', [
	{
		id: 1,
		title: 'Google',
		url: 'https://google.com',
		imgSrc:
			'https://images.unsplash.com/photo-1553895501-af9e282e7fc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
		featured: true,
		tags: ['search engine'],
	},
	{
		id: 2,
		title: 'Facebook',
		url: 'https://facebook.com',
		imgSrc:
			'https://images.unsplash.com/photo-1636114673156-052a83459fc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
	},
	{
		id: 3,
		title: 'Twitter',
		url: 'https://twitter.com',
		imgSrc:
			'https://images.unsplash.com/photo-1566241477600-ac026ad43874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1446&q=80',
		featured: true,
		tags: ['social media', 'microblogging'],
	},
	{
		id: 4,
		title: 'Instagram',
		url: 'https://instagram.com',
		imgSrc:
			'https://images.unsplash.com/photo-1616469829935-c2f33ebd89b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
	},
	{
		id: 5,
		title: 'LinkedIn',
		url: 'https://linkedin.com',
		imgSrc:
			'https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
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

export const editedBookmarkAtom = atom<BookmarkType | null>(null);
