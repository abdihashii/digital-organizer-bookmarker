import Link from 'next/link';
import React from 'react';
import GenerateTagsButton from './GenerateTagsButton';
import Image from 'next/image';

const BookmarkCard = ({ bookmark }: { bookmark: Bookmark }) => {
	return (
		<li>
			<Link
				className="flex h-[400px] flex-col justify-between rounded-lg border-2 border-slate-500 p-4"
				href={bookmark.url}
				target="_blank"
			>
				{bookmark.tags ?
					<ul className="flex gap-2 overflow-x-scroll">
						{bookmark.tags.map((tag) => (
							<li
								key={tag}
								className="w-max rounded-lg bg-slate-500 px-2 py-1 text-xs text-white"
							>
								{tag}
							</li>
						))}
					</ul>
				:	<GenerateTagsButton bookmark={bookmark} />}

				<h3 className="line-clamp-2 text-xl font-medium">{bookmark.title}</h3>

				{bookmark.imgsrc && (
					<div className="relative h-56 w-full">
						<Image
							className="object-cover"
							src={bookmark.imgsrc}
							alt={bookmark.title}
							fill={true}
						/>
					</div>
				)}

				<p className="line-clamp-1 text-sm text-slate-500">{bookmark.url}</p>
			</Link>
		</li>
	);
};

export default BookmarkCard;
