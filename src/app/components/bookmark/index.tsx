import { BookmarkType } from '../../types';

export default function Bookmark({ bookmark }: { bookmark: BookmarkType }) {
	return (
		<div className="flex w-full flex-col gap-4 overflow-hidden rounded border border-black p-4">
			<h3 className="text-xl font-bold text-gray-800">{bookmark.title}</h3>
			{/* TODO: add hover tooltip for overflow */}
			<p className="truncate text-sm text-gray-500">{bookmark.url}</p>

			{bookmark.tags && (
				<div className="flex flex-row gap-2 overflow-x-auto">
					{bookmark.tags.map((tag) => (
						<span
							key={tag}
							className="whitespace-nowrap rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700"
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</div>
	);
}
