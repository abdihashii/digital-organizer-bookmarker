'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { deleteBookmark } from '@/server/actions';

import GenerateTagsButton from './GenerateTagsButton';
import { Button } from './ui/button';
import { MoreVertical, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useToast } from './ui/use-toast';

const DeleteBookmarkButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			variant="ghost"
			className={`flex items-center gap-1 ${pending && 'cursor-not-allowed'}`}
			type="submit"
			aria-disabled={pending}
		>
			{pending ?
				'Deleting...'
			:	<>
					<Trash2 /> Delete
				</>
			}
		</Button>
	);
};

const BookmarkCard = ({ bookmark }: { bookmark: Bookmark }) => {
	const [formState, formAction] = useFormState(deleteBookmark, {
		success: false,
		message: '',
	});
	const { toast } = useToast();
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		// Only show toast if the form has been submitted and there is a message + success
		if (formState.message) {
			toast({
				description: (
					<p className="flex items-center gap-4">
						{formState.success ?
							<CheckCircle className="text-green-500" />
						:	<AlertCircle />}
						{formState.message}
					</p>
				),
				variant: formState.success ? 'default' : 'destructive',
			});
		}
	}, [formState, toast]);

	return (
		<li className="flex h-[425px] flex-col gap-2 rounded-lg border-2 border-slate-500 p-4">
			{/* Header */}
			<div className="flex justify-between gap-4">
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

				<Popover>
					<PopoverTrigger>
						<Button
							variant={'outline'}
							size="icon"
						>
							<MoreVertical />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-fit p-2">
						<form
							action={formAction}
							ref={formRef}
							className="flex flex-col gap-2"
						>
							<input
								type="hidden"
								name="uuid"
								value={bookmark.uuid}
							/>

							{/* <Button variant="ghost">Edit</Button> */}
							<DeleteBookmarkButton />
						</form>
					</PopoverContent>
				</Popover>
			</div>

			{/* Content */}
			<Link
				href={bookmark.url}
				target="_blank"
				className="flex h-full flex-col justify-between"
			>
				<h3 className="mb-auto line-clamp-2 text-xl font-medium">
					{bookmark.title}
				</h3>

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
