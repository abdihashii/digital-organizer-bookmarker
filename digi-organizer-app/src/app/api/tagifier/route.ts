import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

const MODEL_NAME = 'models/text-bison-001';

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(
    process.env.GOOGLE_AI_API_KEY as string
  ),
});

const sanitizeTagsList = (tags: string | undefined) => {
  if (!tags) return [];

  const tagsArray = tags.split('\n');
  const tagsArrayFiltered = tagsArray.filter((item) => item !== '');
  const tagsArrayFinal = tagsArrayFiltered.map((item) =>
    item.replace(/\d+\./, '').trim()
  );
  return tagsArrayFinal;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const url =
    searchParams.get('url') ||
    'https://rogermartin.medium.com/business-model-generation-playing-to-win-d50c33d6dfeb';

  if (!url) {
    return new Response(
      JSON.stringify({
        error: 'No url provided',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const promptString = `Please analyze the following url of an article/blog/document and generate two distinct lists of tags that encapsulate its content.

'Themes': Generate up to five tags that represent the overarching themes or major topics conveyed in the text. These tags should illuminate broad concepts and ideas that capture the core of the content - they don't have to be specific words found in the document.

'Specifics': Create up to five tags pointing out specific entities, details, or subtopics directly referenced within the text. These tags should underscore notable individuals, events, or unique details discussed in the content, and these specific tags should appear regularly in the document.

Keep each tag concise to a maximum of two words.

The objective here is to meaningfully capture the essence of the content accurately, not to fill each list with five tags for the sake of it. If a smaller number of tags provide a complete and accurate representation of the content's themes and specifics, don't add more to reach five. Prioritize precision and relevance over quantity.

Pay close attention to both explicit and implicit details, ensuring that the tags are truly pertinent and meaningful. Avoid biases and maintain objectivity. The goal is to provide an accurate, succinct, and comprehensive representation of the text's content through these tags.

The url for analysis is as follows:
${url}

Remember: Quality over quantity. Each tag should provide valuable insight into the content. Avoid including tags that only marginally relate to the content or dilute the significance of the other tags. The ultimate goal is to create a clear, concise snapshot of the text's content through the most illuminating and relevant tags.

Ensure the returned format is like the example below:
Themes:
1. First tag
2. Second tag

Specifics:
1. First tag
2. Second tag
3. Third tag`;

  const res = await client.generateText({
    // required, which model to use to generate the result
    model: MODEL_NAME,
    // optional, 0.0 always uses the highest-probability result
    temperature: 0.7,
    // optional, how many candidate results to generate
    candidateCount: 1,
    // optional, number of most probable tokens to consider for generation
    topK: 40,
    // optional, for nucleus sampling decoding strategy
    topP: 0.95,
    // optional, maximum number of output tokens to generate
    maxOutputTokens: 1024,
    // optional, safety settings
    safetySettings: [
      { category: 'HARM_CATEGORY_DEROGATORY', threshold: 1 },
      { category: 'HARM_CATEGORY_TOXICITY', threshold: 1 },
      { category: 'HARM_CATEGORY_VIOLENCE', threshold: 2 },
      { category: 'HARM_CATEGORY_SEXUAL', threshold: 2 },
      { category: 'HARM_CATEGORY_MEDICAL', threshold: 2 },
      { category: 'HARM_CATEGORY_DANGEROUS', threshold: 2 },
    ],
    prompt: {
      text: promptString,
    },
  });

  const output = await res[0].candidates![0].output;

  const themes = output?.split('Themes:')[1].split('Specifics:')[0];
  const specifics = output?.split('Specifics:')[1];

  // Convert themes string to array
  const themesArray = sanitizeTagsList(themes);

  // Convert specifics string to array
  const specificsArray = sanitizeTagsList(specifics);

  return new Response(
    JSON.stringify({
      themes: themesArray,
      specifics: specificsArray,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
