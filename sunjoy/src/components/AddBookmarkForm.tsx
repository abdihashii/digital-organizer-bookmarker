'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addBookmark } from '@/app/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Submit = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			className={pending ? 'cursor-not-allowed bg-slate-500' : ''}
			type="submit"
			aria-disabled={pending}
		>
			{pending ? 'Adding...' : 'Add'}
		</Button>
	);
};

const AddBookmarkForm = () => {
	const [, formAction] = useFormState(addBookmark, null);

	return (
		<form
			action={formAction}
			className="flex w-1/4 flex-row justify-between gap-4"
		>
			<Input
				type="text"
				placeholder="URL"
				name="url"
			/>

			<Submit />
		</form>
	);
};

export default AddBookmarkForm;
