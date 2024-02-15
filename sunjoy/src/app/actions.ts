'use server';

import { revalidatePath } from 'next/cache';
import ogs from 'open-graph-scraper';
import { getUser } from '@/lib/supabaseServerClient';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { generateTagsFromURL } from '@/utils/tag-utils';

export async function addBookmark(
	prevState: {
		success: boolean;
		message: string;
	},
	formData: FormData,
): Promise<{
	success: boolean;
	message: string;
}> {
	try {
		const user = await getUser();

		if (!user) {
			return { success: false, message: 'User not found' };
		}

		const url = formData.get('url') as string;

		// Get the Open Graph data from the URL
		const { result } = await ogs({ url });
		const { ogTitle, ogUrl, ogImage } = result;

		if (!ogTitle || !ogUrl) {
			throw new Error('No Open Graph title or URL found');
		}

		// Generate the tags for the URL
		const { tags } = await generateTagsFromURL(ogUrl);

		const rawFormData = {
			user_id: user.id,
			title: ogTitle,
			url: ogUrl,
			imgsrc: ogImage?.[0].url ?? null,
			tags,
		};

		const supabase = createServerActionClient({ cookies });

		const { error } = await supabase.from('bookmarks').insert([rawFormData]);

		if (error) {
			throw error;
		}

		revalidatePath('/');

		return { success: true, message: 'Bookmark added successfully!' };
	} catch (error) {
		console.error(error);

		return { success: false, message: 'Error adding bookmark!' };
	}
}

export async function deleteBookmark(
	prevState: {
		success: boolean;
		message: string;
	},
	formData: FormData,
): Promise<{
	success: boolean;
	message: string;
}> {
	try {
		const supabase = createServerActionClient({ cookies });

		const { error } = await supabase
			.from('bookmarks')
			.delete()
			.eq('uuid', formData.get('uuid'));

		if (error) {
			throw error;
		}

		revalidatePath('/');

		return {
			success: true,
			message: 'Bookmark deleted successfully!',
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			message: 'Error deleting bookmark!',
		};
	}
}
