'use client';

import { Database } from '@/types/database.types';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '../ui/button';

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
		<Button
			onClick={handleSignOut}
			className="mt-4 w-full"
		>
			{loading ? 'Signing Out...' : 'Sign Out'}
		</Button>
	);
};

export default SignOutClientComponent;
