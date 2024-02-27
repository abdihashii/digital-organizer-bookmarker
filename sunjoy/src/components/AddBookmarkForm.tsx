'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addBookmark } from '@/server/actions';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { CheckCircle, AlertCircle } from 'lucide-react';

const initialFormState = {
	success: false,
	message: '',
};

const SubmitButton = () => {
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
	const [formState, formAction] = useFormState(addBookmark, initialFormState);
	const formRef = useRef<HTMLFormElement>(null);
	const { toast } = useToast();

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

		// If the form was submitted successfully, reset the form
		if (formState.success) {
			formRef.current?.reset();
		}
	}, [formState, toast]);

	return (
		<form
			ref={formRef}
			action={formAction}
			className="flex w-1/2 flex-row justify-between gap-4"
		>
			<Input
				type="text"
				placeholder="URL"
				name="url"
			/>

			<SubmitButton />
		</form>
	);
};

export default AddBookmarkForm;
