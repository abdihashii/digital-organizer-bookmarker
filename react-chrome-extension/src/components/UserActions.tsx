const UserActions = ({
  handleAddBookmark,
  handleSignOut,
  isLoading,
}: {
  handleAddBookmark: () => void;
  handleSignOut: () => void;
  isLoading: boolean;
}) => {
  return (
    <div className="mt-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddBookmark}
      >
        Add Bookmark
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
        onClick={handleSignOut}
        disabled={isLoading}
      >
        {isLoading ? 'Signing Out...' : 'Sign Out'}
      </button>
    </div>
  );
};

export default UserActions;
