import { chatCompletion } from '@huggingface/inference';

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

const HF_ACCESS_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN; // ⚠️ Hardcoded for dev use only

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // Latest Mixtral as of July 2025
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024,
      accessToken: HF_ACCESS_TOKEN,
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("Error generating recipe:", err.message);
  }
}
