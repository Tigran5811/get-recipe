/* eslint-disable @typescript-eslint/no-explicit-any */
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: "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",
  organization: "org-oJqA3X89TZTCik3UCUQadzTQ",
  dangerouslyAllowBrowser: true,
});
export const getImage = async (text: any) => {
  const responseImage = await openai.images.generate({
    prompt: text,
    size: "256x256",
    n: 1,
  });
  return {
    text: responseImage.data[0].url,
  };
};
export const getRecipe = async (ingredients: any) => {
  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `Convert ingredients to recipe: ${ingredients.join(
          ", "
        )} give me the recipe in json format with these keys - Title
              - IngredientsAmount - array
              - StepsToCook - array
              -TimeToCook - string
              - Difficulty - string`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return response;
};
