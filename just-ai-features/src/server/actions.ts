'use server';

import { Assistant } from '@/lib/assistant';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTagsFromURL(file: OpenAI.Files.FileObject) {
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
