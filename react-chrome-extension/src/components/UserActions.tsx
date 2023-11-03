const UserActions = ({
  handleAddBookmark,
  handleGenerateTags,
  isLoading,
}: {
  handleAddBookmark: () => void;
  handleGenerateTags: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className="w-full flex flex-row gap-2">
      <button
        className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        onClick={handleAddBookmark}
      >
        Add Bookmark
      </button>
      <button
        className="w-1/2 bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded"
        onClick={handleGenerateTags}
      >
        {!isLoading ? 'Generate Tags' : 'Generating...'}
      </button>
    </div>
  );
};

export default UserActions;
