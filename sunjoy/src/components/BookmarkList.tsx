import React from 'react';
import BookmarkCard from './BookmarkCard';

const BookmarkList = ({ data }: { data: Array<Bookmark> }) => {
	return (
		<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
			{data.map((bookmark) => (
				<BookmarkCard
					key={bookmark.uuid}
					bookmark={bookmark}
				/>
			))}
		</ul>
	);
};

export default BookmarkList;
