'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import Image from 'next/image';
import useAuth from '@/app/hooks/useAuth';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function SignInPage() {
	const { signIn } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// loading spinner for sign in button. This is a local state
		setIsLoading(true);

		const target = event.target as typeof event.target & {
			email: { value: string };
			password: { value: string };
		};

		const email = target.email.value;
		const password = target.password.value;

		// Create a new FormData object and append the necessary fields
		const formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);

		console.log(JSON.stringify(formData, null, 2));

		try {
			const response = await signIn(formData);
			if (response.redirected) {
				window.location.href = response.url;
			}
		} catch (error: any) {
			console.error('Error:', error.message);
			// TODO: Show a user-friendly error message on the UI
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="h-screen w-full md:flex md:flex-row md:items-center lg:p-20 xl:p-28">
			<article className="hidden h-full w-2/3 items-center justify-center bg-gray-100 px-10 md:flex md:flex-col">
				<p className="text-3xl font-bold text-gray-900">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>

				{/* <Image
					src="/ben-kim-HeSAWmZ_tqw-unsplash.jpg"
					width={'100%'}
					height={'100%'}
					alt="a snow covered mountain with a sky background"
				/> */}
			</article>

			<article className="flex h-full flex-col justify-center gap-8 px-10 md:w-1/2">
				<section className="flex flex-col gap-2">
					<h1 className="text-center text-4xl font-bold text-gray-900">
						Welcome Back!
					</h1>

					<h2 className="text-center text-gray-500">
						Sign in to your account below
					</h2>
				</section>

				<form
					className="flex flex-col gap-8"
					onSubmit={handleSignIn}
				>
					<section>
						<Label htmlFor="email">Email</Label>
						<Input
							required
							id="email"
							type="email"
						/>
					</section>

					<section>
						<Label htmlFor="password">Password</Label>
						<Input
							required
							id="password"
							type="password"
						/>
					</section>

					<section>
						<Button
							type="submit"
							className="w-full"
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<ReloadIcon className="mr-2 animate-spin" />
									Signing in...
								</>
							) : (
								'Sign In'
							)}
						</Button>
					</section>
				</form>

				<section className="flex flex-row justify-center gap-2">
					<p className="text-center text-gray-500">First time here?</p>

					<Link
						className="text-center text-blue-500 hover:underline"
						href="/sign-up"
					>
						Sign up for free
					</Link>
				</section>
			</article>
		</main>
	);
}
