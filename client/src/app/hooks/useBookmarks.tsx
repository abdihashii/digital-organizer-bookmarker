import { useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { bookmarksAtom, filteredBookmarksAtom } from '@/app/store';
import { useAtom } from 'jotai';
import { BookmarkType } from '../types';

export const useBookmarks = () => {
	const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);
	const [filteredBookmarks] = useAtom(filteredBookmarksAtom);

	const viewableBookmarks =
		filteredBookmarks.length > 0 ? filteredBookmarks : bookmarks;

	const featuredBookmarks = viewableBookmarks.filter(
		(bookmark) => bookmark.featured,
	);
	const restOfBookmarks = viewableBookmarks.filter(
		(bookmark) => !bookmark.featured,
	);

	const getBookmarks = async () => {
		const { data, error } = await supabase.from('bookmarks').select();

		if (error) {
			console.error(error);
			return;
		}

		setBookmarks(data);
	};

	const addBookmark = async (bookmark: {
		title: string;
		url: string;
		featured: boolean;
		tags?: Array<string>;
	}) => {
		const { error } = await supabase
			.from('bookmarks')
			.insert([{ ...bookmark, uuid: crypto.randomUUID() }]);

		if (error) {
			console.error(error);
			return;
		}

		getBookmarks();
	};

	const deleteBookmark = async (bookmark: BookmarkType) => {
		const { error } = await supabase
			.from('bookmarks')
			.delete()
			.eq('uuid', bookmark.uuid);

		if (error) {
			console.error(error);
			return;
		}

		getBookmarks();
	};

	const saveUpdatedBookmark = async (bookmark: {
		uuid: string;
		title: string;
		url: string;
		featured: boolean;
		tags?: Array<string>;
	}) => {
		const { error } = await supabase
			.from('bookmarks')
			.update(bookmark)
			.eq('uuid', bookmark.uuid);

		if (error) {
			console.error(error);
			return;
		}

		getBookmarks();
	};

	const generateScreenshot = async (url: string) => {
		const encodedUrl = encodeURIComponent(url);

		try {
			const resp = await fetch(`/api/get-screenshot?url=${encodedUrl}`);
			const data = await resp.json();

			return data.secure_url;
		} catch (error) {
			console.error(error);

			return null;
		}
	};

	useEffect(() => {
		getBookmarks();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		bookmarks,
		featuredBookmarks,
		restOfBookmarks,
		addBookmark,
		deleteBookmark,
		saveUpdatedBookmark,
		generateScreenshot,
	};
};
