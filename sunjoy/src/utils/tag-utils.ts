import { OpenAI } from 'openai';
import { Assistant } from '@/lib/assistant';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const generateTagsFromURL = async (url: string) => {
	// const model = "gpt-3.5-turbo";
	const model = 'gpt-4';

	try {
		const response = await openai.chat.completions.create({
			model,
			messages: [
				{
					role: 'system',
					content:
						'You are a helpful assistant that generates tags for digital assets such as websites.',
				},
				{
					role: 'user',
					content: `
					I need tags for ${url}! Please just return the tags and nothing else. 
					
					Please make sure to generate 100 variations of the tags and select the top ones from your own generation. 
					
					Make each tag unqiue and relevant to the content and not too long and distill the most relevant information, i.e. tags shouldn't be longer than 2 words and should be at least 1 word long.
					
					If the link provided is to a video or audio, please generate tags that are relevant to the content of the video or audio. Do this by reading the content or description of the video or audio. For example, for YouTube videos, there are tags, descriptions, and titles from the video that can be used to generate tags. Please make sure to use the most relevant information from the video or audio to generate the tags. You should also use the title of the page as a hint for generating tags.
					
					Please be cognizant of the metadata of the page and use that to generate tags. For example, if the page has an og:title, og:description, or og:image, please use that information to generate tags. That can be a very useful hint, but remember to read the page content as well!
					
					The generated tags should also be words that are used in content like this one because the tags will be used to search for similar content.
					
					There should be at least 3 tags but no more than 5 tags! This is important! Please distill to the most important and relevant 3 - 5 tags. 
					
					Please don't include list or bullet points.`,
				},
			],
		});

		if (!response) {
			throw new Error('No response found');
		}

		const messageContent = response.choices[0].message.content;

		if (!messageContent) {
			throw new Error('No message content found! Unable to generate tags.');
		}

		// convert tags to array
		const tagArray = messageContent.split(',').map((tag: string) => tag.trim());

		// Make sure that each tag is not wrapped in quotes
		tagArray.forEach((tag: string, index: number) => {
			if (tag.startsWith('"') && tag.endsWith('"')) {
				tagArray[index] = tag.slice(1, -1);
			}
		});

		return {
			model,
			url,
			message: messageContent,
			tags: tagArray,
		};
	} catch (error) {
		console.error('error', error);

		return {
			error: error,
		};
	}
};

export async function generateTagsFromFile(file: OpenAI.Files.FileObject) {
	const assistant = Assistant.getInstance('tags-from-url', openai);

	await assistant.createHtmlFile(file);
	await assistant.createAssistant();
	await assistant.createThread();
	await assistant.addMessageToThread();

	await assistant.runAssistant();
	await assistant.waitForRunToComplete();

	const runMessages = await assistant.displayRunResults();

	const message = runMessages?.data[0].content.map((messageObj) => {
		if (messageObj.type === 'text') {
			return messageObj.text.value;
		}
	});

	// Delete the assistant once the run is complete and the message is returned
	await assistant.deleteAssistant();

	return message;
}
