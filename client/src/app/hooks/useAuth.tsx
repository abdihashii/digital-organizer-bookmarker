'use client';

import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function useAuth() {
	const router = useRouter();

	const signUp = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: '/dashboard',
			},
		});

		if (error) {
			console.log(error);
			return;
		}

		const user = data?.user;

		console.log(user);
		alert(user);

		router.push('/dashboard');
	};

	const signIn = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.log(error);
			return;
		}

		const user = data?.user;

		console.log(user);
		// alert(user);

		router.push('/dashboard');
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.log(error);
			return;
		}

		console.log('Signed out');
		alert('Signed out');

		router.push('/');
	};

	return {
		signUp,
		signIn,
		signOut,
	};
}
