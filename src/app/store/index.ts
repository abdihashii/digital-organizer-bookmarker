import { atom } from 'jotai';
import type { BookmarkType } from '../types';
import Fuse from 'fuse.js';

export const openAddBookmarkModalAtom = atom(false);

export const searchQueryAtom = atom('');

export const bookmarksAtom = atom<Array<BookmarkType>>([]);

export const filteredBookmarksAtom = atom((get) => {
	const searchOptions = {
		includeScore: true,
		keys: ['title', 'url', 'tags'],
	};

	const fuse = new Fuse(get(bookmarksAtom), searchOptions);

	const bookmarks = get(bookmarksAtom);
	const searchQuery = get(searchQueryAtom);

	if (!searchQuery) {
		return bookmarks;
	}

	const results = fuse.search(searchQuery);
	const parsedResults = results.map((result) => result.item);

	return parsedResults;
});

export const loadingBookmarksAtom = atom(false);
