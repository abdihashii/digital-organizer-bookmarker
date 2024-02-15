import React from 'react';
import AddBookmarkForm from './AddBookmarkForm';
import BookmarkCard from './BookmarkCard';

const Bookmarks = ({ error, data }: { error: any; data: Array<Bookmark> }) => {
	return (
		<section className="flex flex-col items-center gap-10">
			<h2 className="text-3xl font-medium">Bookmarks</h2>

			<AddBookmarkForm />

			{error && <p>Error: Unable to retrieve bookmarks: {error.message}</p>}

			<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
				{data.map((bookmark) => (
					<BookmarkCard
						key={bookmark.uuid}
						bookmark={bookmark}
					/>
				))}
			</ul>
		</section>
	);
};

export default Bookmarks;
