import React from 'react';

import AddBookmarkForm from './AddBookmarkForm';
import BookmarkList from './BookmarkList';

const Bookmarks = ({ error, data }: { error: any; data: Array<Bookmark> }) => {
	return (
		<section className="flex flex-col items-center gap-10">
			<h2 className="text-3xl font-medium">Bookmarks</h2>

			<AddBookmarkForm />

			{error && <p>Error: Unable to retrieve bookmarks: {error.message}</p>}

			<BookmarkList data={data} />
		</section>
	);
};

export default Bookmarks;
