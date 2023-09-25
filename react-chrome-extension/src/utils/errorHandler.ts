export const handleError = (
  error: { message: string },
  customMessage: string
) => {
  console.error(customMessage, error.message);
  alert(`${customMessage}: ${error.message}`); // TODO: replace with a toast
};
