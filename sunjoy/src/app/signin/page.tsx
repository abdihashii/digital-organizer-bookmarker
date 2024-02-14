import { getUser } from '@/lib/supabaseServerClient';
import { redirect } from 'next/navigation';
import SignInClientComponent from '@/components/Auth/SignInClientComponent';

export default async function SignInPage() {
	const user = await getUser();

	if (user) {
		redirect('/');
	}

	return (
		<main className="flex h-screen items-center justify-center">
			<SignInClientComponent />
		</main>
	);
}
