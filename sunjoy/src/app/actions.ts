'use server';

import { revalidatePath } from 'next/cache';
import ogs from 'open-graph-scraper';
import { getUser } from '@/lib/supabaseServerClient';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { generateTagsFromURL } from '@/utils/tag-utils';

export async function addBookmark(prevState: any, formData: FormData) {
	try {
		const user = await getUser();

		if (!user) {
			return;
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
	} catch (error) {
		console.error(error);
	}
}
