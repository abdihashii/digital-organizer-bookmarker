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

export const getCurrentTab = async (): Promise<{
  url: string;
  title: string;
} | null> => {
  if (!chrome?.tabs) return null;

  const tab = await new Promise<chrome.tabs.Tab>((resolve) =>
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>
      resolve(tabs[0])
    )
  );

  if (tab.url && tab.title) {
    return { url: tab.url, title: tab.title };
  }

  return null;
};
