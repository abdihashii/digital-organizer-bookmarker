'use client';

import { MdBookmarkAdd } from 'react-icons/md';
import Rodal from 'rodal';
import { useAtom } from 'jotai';
import { openAddBookmarkModalAtom } from '../store';

import 'rodal/lib/rodal.css';

export default function SearchBookmarks() {
	const [showModal, setShowModal] = useAtom(openAddBookmarkModalAtom);

	const addBookmark = () => {
		setShowModal(true);
	};

	return (
		<div className="flex w-full flex-row items-stretch">
			<input
				type="text"
				className="flex-grow appearance-none rounded-md rounded-br-none rounded-tr-none border border-gray-300 p-4"
				style={{ width: 'calc(100% - 4rem)' }}
				placeholder="Search"
			/>
			<div
				className="group flex w-16 cursor-pointer items-center justify-center rounded-md rounded-bl-none rounded-tl-none border border-l-0 border-gray-300 bg-white"
				onClick={addBookmark}
			>
				<MdBookmarkAdd
					className="overflow-visible text-2xl text-gray-800 transition-colors duration-150 group-hover:text-gray-400"
					aria-label="Add Bookmark"
				/>
			</div>

			<Rodal
				visible={showModal}
				onClose={() => setShowModal(!showModal)}
			>
				<div>Content</div>
			</Rodal>
		</div>
	);
}
