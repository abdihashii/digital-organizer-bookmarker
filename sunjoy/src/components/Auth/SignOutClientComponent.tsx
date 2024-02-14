'use client';

import { Database } from '@/types/database.types';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const SignOutClientComponent = () => {
	const supabase = createClientComponentClient<Database>();

	const [loading, setLoading] = useState(false);

	const handleSignOut = async () => {
		setLoading(true);

		try {
			const { error } = await supabase.auth.signOut();

			if (error) {
				throw error;
			}
		} catch (error) {
			console.error('Error signing out:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<button
			onClick={handleSignOut}
			className="mt-4 w-full rounded-md bg-black px-4 py-2 text-white hover:bg-slate-500"
		>
			{loading ? 'Signing Out...' : 'Sign Out'}
		</button>
	);
};

export default SignOutClientComponent;
