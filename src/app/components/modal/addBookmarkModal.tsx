import React, { useState } from 'react';
import Modal from './';
import { bookmarksAtom } from '@/app/store';
import { useAtom } from 'jotai';

export default function AddBookmarkModal({
	handleClose,
}: {
	handleClose: () => void;
}) {
	const [newBookmark, setNewBookmark] = useState({
		title: '',
		url: '',
		featured: false,
		// tags: [],
	});
	const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newBookmarkWithUUID = {
			...newBookmark,
			id: crypto.randomUUID(),
		};

		alert(`New Bookmark: ${JSON.stringify(newBookmarkWithUUID, null, 2)}`);

		setBookmarks([...bookmarks, newBookmarkWithUUID]);

		setNewBookmark({
			title: '',
			url: '',
			featured: false,
			// tags: [],
		});

		handleClose();
	};

	return (
		<Modal
			title="Add Bookmark"
			handleClose={handleClose}
		>
			<form
				className="flex w-full flex-col gap-6"
				onSubmit={handleFormSubmit}
			>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="bookmarkTitle"
						className="text-gray-800"
					>
						Bookmark Title
					</label>
					<input
						required
						type="text"
						className="rounded-md border border-gray-300 p-4"
						placeholder="Title"
						id="bookmarkTitle"
						autoFocus
						value={newBookmark.title}
						onChange={(e) =>
							setNewBookmark({ ...newBookmark, title: e.target.value })
						}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="bookmarkURL"
						className="text-gray-800"
					>
						Bookmark URL
					</label>
					<input
						required
						type="url"
						className="rounded-md border border-gray-300 p-4"
						placeholder="URL"
						id="bookmarkURL"
						value={newBookmark.url}
						onChange={(e) =>
							setNewBookmark({ ...newBookmark, url: e.target.value })
						}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-2">
						<input
							type="checkbox"
							className="rounded-md border border-gray-300 p-4"
							id="featureBookmark"
							checked={newBookmark.featured}
							onChange={(e) =>
								setNewBookmark({ ...newBookmark, featured: e.target.checked })
							}
						/>
						<label htmlFor="featureBookmark">Feature this tag</label>
					</div>

					{/* <div className="flex flex-row gap-2">
							<input
								type="checkbox"
								className="rounded-md border border-gray-300 p-4"
								id="generateTags"
							/>
							<label htmlFor="generateTags">Auto Generate Tags</label>
						</div> */}
				</div>

				<button
					type="submit"
					className="rounded-md border border-gray-300 bg-gray-800 p-4 text-white transition-colors duration-150 hover:bg-gray-700"
				>
					Add Bookmark
				</button>

				<pre>
					<code>{JSON.stringify(newBookmark, null, 2)}</code>
				</pre>
			</form>
		</Modal>
	);
}
