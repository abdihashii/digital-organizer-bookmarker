import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function useAuth() {
	const supabase = createClientComponentClient();

	const router = useRouter();

	const signUp = async (email: string, password: string) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			console.log(error);
			return;
		}

		const user = data?.user;

		console.log(user);
		alert(JSON.stringify(user, null, 2));

		router.push('/dashboard');
	};

	const signIn = async (formData: FormData) => {
		const response = await fetch('/auth/sign-in', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			throw new Error('Failed to sign in');
		}

		return response;
	};

	const signOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};

	return {
		signUp,
		signIn,
		signOut,
	};
}
