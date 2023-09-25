import supabase from '../utils/supabaseClient';
import { handleError } from '../utils/errorHandler';
import { useCallback } from 'react';

export default function useBookmarks() {
  const addBookmark = async (url: string, title: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // This should never happen, but just in case
    // TODO: Remove this check once we're sure it's not needed
    if (!user) {
      return { error: 'User not found' };
    }

    const newBookmark = {
      user_id: user.id,
      uuid: crypto.randomUUID(),
      url,
      title,
    };

    alert(`newBookmark: ${JSON.stringify(newBookmark, null, 2)}`);

    const { error } = await supabase
      .from('bookmarks')
      .insert(newBookmark)
      .single();

    return { error }; // Return both data and error
  };

  const fetchBookmarks = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('bookmarks').select();

      if (error) throw error;

      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleError(error, 'Error fetching bookmarks');
    }
  }, []);

  return {
    addBookmark,
    fetchBookmarks,
  };
}
