import { useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { bookmarksAtom, filteredBookmarksAtom } from '@/app/store';
import { useAtom } from 'jotai';

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
			console.log(error);
			return;
		}

		setBookmarks(data);
	};

	useEffect(() => {
		getBookmarks();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		bookmarks,
		featuredBookmarks,
		restOfBookmarks,
	};
};
