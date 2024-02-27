import { OpenAI } from 'openai';

export class Assistant {
  private static instance: Assistant;
  private openai: OpenAI;
  private htmlFile?: OpenAI.Files.FileObject;
  private assistantName: string;
  private assistantId?: string;
  private thread?: OpenAI.Beta.Threads.Thread;
  private messageId?: string;
  private run?: OpenAI.Beta.Threads.Runs.Run;

  private constructor(assistantName: string, openAI: OpenAI) {
    this.assistantName = assistantName;
    this.openai = openAI;
  }

  public static getInstance(assistantName: string, openAI: OpenAI): Assistant {
    console.log('Checking if an instance of Assistant exists...');

    if (!Assistant.instance) {
      console.log('Creating a new instance of Assistant...');

      Assistant.instance = new Assistant(assistantName, openAI);
    }

    console.log('Returning the existing instance of Assistant...');

    return Assistant.instance;
  }

  async createHtmlFile(file: OpenAI.Files.FileObject) {
    console.log('Creating HTML file...');

    this.htmlFile = file;
  }

  async createAssistant() {
    console.log(
      `Creating an assistant with the name: ${this.assistantName}...`
    );

    try {
      if (!this.htmlFile) {
        throw new Error('HTML file not found');
      }

      const newAssistant = await this.openai.beta.assistants.create({
        name: this.assistantName,
        instructions:
          'You are a helpful assistant that is able to read HTML files and generate tags from them.',
        tools: [{ type: 'retrieval' }],
        model: 'gpt-4-turbo-preview',
        file_ids: [this.htmlFile.id],
      });

      this.assistantId = newAssistant.id;
    } catch (error) {
      console.error(error);
    }
  }

  async createThread() {
    try {
      const thread = await this.openai.beta.threads.create();

      this.thread = thread;

      // return thread;
    } catch (error) {
      console.error(error);
    }
  }

  async addMessageToThread() {
    try {
      if (!this.thread) {
        throw new Error('Thread not found');
      }

      const message = await this.openai.beta.threads.messages.create(
        this.thread.id,
        {
          role: 'user',
          content: `
          I need tags for this html file! Please just return the tags and nothing else.

          Please make sure to generate 100 variations of the tags and select the top ones from your own generation.
          
          Make each tag unique and relevant to the content and not too long and distill the most relevant information, i.e. tags shouldn't be longer than 2 words and should be at least 1 word long.
          
          Please be cognizant of the metadata of the page and use that to generate tags. For example, if the page has an og:title, og:description, or og:image, please use that information to generate tags. That can be a very useful hint, but remember to read the page content as well!
          
          The generated tags should also be words that are used in content like this one because the tags will be used to search for similar content.
          
          There should be at least 3 tags but no more than 5 tags! This is important! Please distill to the most important and relevant 3 - 5 tags.
          
          Please don't include list or bullet points.
          `,
        }
      );

      this.messageId = message.id;

      // return message;
    } catch (error) {
      console.error(error);
    }
  }

  async runAssistant() {
    try {
      if (!this.thread) {
        throw new Error('Thread not found');
      }

      console.log(
        `Attempting to run assistant with ID: ${this.assistantId} in thread with ID: ${this.thread.id}...`
      );

      const run = await this.openai.beta.threads.runs.create(this.thread.id, {
        assistant_id: this.assistantId as string,
        instructions:
          'Please address the user request and generate tags from the HTML file.',
      });

      this.run = run;

      if (!run) {
        throw new Error('Run not found');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getRunId() {
    return this.run?.id;
  }

  async waitForRunToComplete() {
    if (!this.thread || !this.run) {
      throw new Error('Thread or run not found');
    }

    console.log(`Waiting for run ${this.run.id} to complete...`);

    let status = await this.getRunStatus();

    while (status !== 'completed' && status !== 'failed') {
      // Wait for 5 secfonds before checking the status again
      await new Promise((resolve) => setTimeout(resolve, 5000));
      status = await this.getRunStatus();
      console.log(`Run status: ${status}`);
    }

    console.log(`Run ${this.run.id} has completed with status: ${status}!`);
  }

  async getRunStatus() {
    try {
      if (!this.thread) {
        throw new Error('Thread not found');
      }

      if (!this.run) {
        throw new Error('Run not found');
      }

      const run = await this.openai.beta.threads.runs.retrieve(
        this.thread.id,
        this.run.id
      );

      return run.status;
    } catch (error) {
      console.error(error);
    }
  }

  async displayRunResults() {
    try {
      if (!this.thread) {
        throw new Error('Thread not found');
      }

      const messages = await this.openai.beta.threads.messages.list(
        this.thread.id
      );

      return messages;
    } catch (error) {
      console.error(error);
    }
  }

  async getMessageContent() {
    try {
      if (!this.thread) {
        throw new Error('Thread not found');
      }

      if (!this.messageId) {
        throw new Error('Message not found');
      }

      const message = await this.openai.beta.threads.messages.retrieve(
        this.thread.id,
        this.messageId
      );

      return message.content[0];
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAssistant() {
    try {
      if (!this.assistantId) {
        throw new Error('Assistant ID not found');
      }

      console.log(`Deleting assistant with ID: ${this.assistantId}...`);

      await this.openai.beta.assistants.del(this.assistantId);

      console.log(`Assistant with ID: ${this.assistantId} has been deleted!`);
    } catch (error) {
      console.error('Failed to delete assistant: ', error);
    }
  }
}
