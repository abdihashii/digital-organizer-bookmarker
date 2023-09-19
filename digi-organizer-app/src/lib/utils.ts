import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const removeTrailingSlashFromUrl = (url: string) => {
  return url.replace(/\/$/, '');
};

export const removeWrappingQuotesFromUrl = (url: string) => {
  return url.replace(/['"]+/g, '');
};

export const cleanUpImgSrc = (url: string) => {
  if (!url) {
    return null;
  }

  const urlWithoutTrailingSlash = removeTrailingSlashFromUrl(url);
  const urlWithoutWrappingQuotes = removeWrappingQuotesFromUrl(
    urlWithoutTrailingSlash
  );

  return urlWithoutWrappingQuotes;
};

export const generateScreenshot = async (url: string) => {
  const encodedUrl = encodeURIComponent(url);

  try {
    const res = await fetch(`api/get-screenshot?url=${encodedUrl}`);
    const data = await res.json();

    return data.secure_url;
  } catch (error) {
    console.error(error);

    return null;
  }
};
