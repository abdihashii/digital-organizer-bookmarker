import Link from 'next/link';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col gap-8 bg-gray-200 p-12">
			<h1>Hello, World!</h1>

			<Link
				href="/dashboard"
				className="w-fit rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			>
				Dashboard
			</Link>
		</main>
	);
}
