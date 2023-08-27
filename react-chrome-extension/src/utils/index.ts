export const checkIfValidUrl = (url: string) => {
  // check if the url first starts with http:// or https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    console.error('URL must start with http:// or https://');
    return false;
  }

  try {
    new URL(url);
  } catch (_) {
    console.error('Invalid URL! Please try again.');
    return false;
  }

  return true;
};
