import supabase from '../utils/supabaseClient';

export default function useBookmarks() {
  const addBookmark = async (url: string, title: string) => {
    const newBookmark = {
      uuid: crypto.randomUUID(),
      url,
      title,
    };

    alert(`newBookmark: ${JSON.stringify(newBookmark, null, 2)}`);

    const { data, error } = await supabase
      .from('bookmarks')
      .insert(newBookmark)
      .select();

    if (error) {
      console.error(error);
    }

    return data;
  };

  return {
    addBookmark,
  };
}
