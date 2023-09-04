'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import Image from 'next/image';
import useAuth from '@/app/hooks/useAuth';

export default function SignUpPage() {
	const { signUp } = useAuth();

	const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const target = event.target as typeof event.target & {
			email: { value: string };
			password: { value: string };
			confirmPassword: { value: string };
		};

		const email = target.email.value;
		const password = target.password.value;
		const confirmPassword = target.confirmPassword.value;

		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}

		await signUp(email, password);
	};

	return (
		<main className="h-screen w-full md:flex md:flex-row md:items-center lg:p-20 xl:p-28">
			<article className="hidden h-full w-2/3 items-center bg-gray-100 px-10 md:flex">
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
				<h1 className="text-center text-3xl font-bold text-gray-900">
					Sign Up
				</h1>

				<form
					className="flex flex-col gap-8"
					onSubmit={handleSignUp}
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
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							required
							id="confirmPassword"
							type="password"
						/>
					</section>

					<section>
						<Button
							type="submit"
							className="w-full"
						>
							Create Account
						</Button>
					</section>
				</form>

				<section className="flex flex-row justify-center gap-2">
					<p className="text-center text-gray-500">Already have an account?</p>

					<Link
						className="text-center text-blue-500 hover:underline"
						href="/log-in"
					>
						Log In
					</Link>
				</section>
			</article>
		</main>
	);
}
