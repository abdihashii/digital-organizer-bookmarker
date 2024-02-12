import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // const model = "gpt-3.5-turbo";
  const model = "gpt-4";

  const { url } = await req.json();

  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates tags for digital assets.",
      },
      {
        role: "user",
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

  const messageContent = response.choices[0].message.content;

  if (!messageContent) {
    return Response.json({
      error: "No tags found",
    });
  }

  // convert tags to array
  const tagArray = messageContent.split(",").map((tag: string) => tag.trim());

  // Make sure that each tag is not wrapped in quotes
  tagArray.forEach((tag: string, index: number) => {
    if (tag.startsWith('"') && tag.endsWith('"')) {
      tagArray[index] = tag.slice(1, -1);
    }
  });

  return Response.json({
    model,
    url,
    message: messageContent,
    tags: tagArray,
  });
}
