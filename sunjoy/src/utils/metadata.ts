import ogs from 'open-graph-scraper';

export const generateOpenGraphMetadata = async (url: string) => {
	try {
		const response = await ogs({ url });

		if (response.error) {
			throw response.error;
		}

		const { result } = response;

		const { ogImage } = result;

		if (!ogImage) {
			throw new Error('No ogImage found');
		}

		return ogImage[0].url;
	} catch (error) {
		return error;
	}
};
