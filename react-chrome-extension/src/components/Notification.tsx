const Notification = ({
  type,
  message,
}: {
  type: 'success' | 'error';
  message: string;
}) => {
  return (
    <div
      className={`mt-4 p-2 rounded ${
        type === 'success'
          ? 'bg-green-200 text-green-700'
          : 'bg-red-200 text-red-700'
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
