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
