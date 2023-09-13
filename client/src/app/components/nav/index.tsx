'use client';

import Link from 'next/link';
import {
	MdLockPerson,
	MdLogout,
	MdOutlineFolderCopy,
	MdPerson,
	MdSettings,
	MdSpaceDashboard,
} from 'react-icons/md';
import useAuth from '@/app/hooks/useAuth';

export default function LeftSideNav() {
	const { signOut } = useAuth();

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<nav className="relative flex h-screen w-40 flex-col items-center gap-8 overflow-y-hidden bg-gray-800 px-4 py-6">
			<Link href="/dashboard">
				<MdSpaceDashboard
					className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
					aria-label="Dashboard"
				/>
			</Link>

			<MdOutlineFolderCopy
				className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
				aria-label="Folders"
			/>

			<MdLockPerson
				className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
				aria-label="Private Bookmarks"
			/>

			<MdSettings
				className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
				aria-label="Settings"
			/>

			{/* Flex items that should be at the bottom of the nav */}
			<div
				className="absolute bottom-0 left-0 
    right-0 flex flex-row items-center justify-center gap-4 px-6 py-8
  "
			>
				<MdPerson
					className="h-8 w-8 text-white transition-colors duration-200 hover:text-gray-400"
					aria-label="Profile"
				/>
				<MdLogout
					className="h-8 w-8 cursor-pointer text-white transition-colors duration-200 hover:text-gray-400"
					aria-label="Log out"
					onClick={handleSignOut}
				/>
			</div>
		</nav>
	);
}
