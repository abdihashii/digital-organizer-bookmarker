'use client';

import { useAtom } from 'jotai';
import { openAddBookmarkModalAtom } from '../../store';
import { motion } from 'framer-motion';
import Backdrop from './backdrop';
import { MdClose } from 'react-icons/md';

export default function Modal({
	handleClose,
	title,
}: {
	handleClose: () => void;
	title: string;
}) {
	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => {
					e.stopPropagation(); // prevents click event in modal from propagating to backdrop
				}}
				className="m-auto flex h-fit w-11/12 flex-col items-center rounded-xl bg-white p-8 lg:w-1/2"
			>
				<div className="flex w-full flex-row justify-between">
					<h3 className="text-3xl font-semibold text-gray-800">{title}</h3>
					<button onClick={handleClose}>
						<MdClose className="overflow-visible text-4xl text-gray-800 transition-colors duration-150 group-hover:text-gray-400" />
					</button>
				</div>

				<form
					className="mt-8 flex w-full flex-col gap-6"
					onSubmit={handleFormSubmit}
				>
					<div className="flex flex-col gap-2">
						<label
							htmlFor="bookmarkName"
							className="text-gray-800"
						>
							Bookmark Name
						</label>
						<input
							required
							type="text"
							className="rounded-md border border-gray-300 p-4"
							placeholder="Name"
							id="bookmarkName"
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
						/>
					</div>

					<button
						type="submit"
						className="rounded-md border border-gray-300 bg-gray-800 p-4 text-white transition-colors duration-150 hover:bg-gray-700"
					>
						Add Bookmark
					</button>
				</form>
			</motion.div>
		</Backdrop>
	);
}
