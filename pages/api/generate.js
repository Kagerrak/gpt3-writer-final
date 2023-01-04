import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-IaMrNqK3kHnFlfdddkoz9bcn",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `
Write me a prayer with the following details... 

Details:
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 500,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  // const secondPrompt = `
  // Take the prayer below and improve it.

  // But include all this details ${req.body.userInput}

  // Prayer: ${basePromptOutput}

  // ImprovedPrayer
  // `;

  //   Call the openAI a second time with Prompt #2
  // const secondPromptCompletion = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: `${secondPrompt}`,
  //   temperature: 0.8,
  //   max_tokens: 500,
  // });

  //   get output
  // const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
