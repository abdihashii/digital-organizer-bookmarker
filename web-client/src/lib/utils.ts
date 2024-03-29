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
    urlWithoutTrailingSlash,
  );

  return urlWithoutWrappingQuotes;
};

export const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};
