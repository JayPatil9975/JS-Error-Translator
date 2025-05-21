// src/errors.ts
var errorMap = {
  "undefined is not a function": "You're trying to call something that isn't a function. Check your variable names and imports.",
  "cannot read property '(.*?)' of undefined": "You\u2019re accessing a property of an undefined variable. Make sure it's initialized.",
  "unexpected token": "There's a syntax error \u2014 maybe a missing bracket, comma, or quote.",
  "cannot read properties of null": "You're trying to access a property on null. Ensure the object exists before using it."
};

// src/index.ts
import axios from "axios";
async function translateError(error) {
  const message = typeof error === "string" ? error : error.message;
  for (const pattern in errorMap) {
    const regex = new RegExp(pattern, "i");
    if (regex.test(message)) {
      return errorMap[pattern];
    }
  }
  return await getAIExplanation(message);
}
async function getAIExplanation(message) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return `No explanation found for: "${message}". Set OPENAI_API_KEY to enable AI fallback.`;
  }
  try {
    const prompt = `Explain this JavaScript error to a beginner:
"${message}"`;
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 100
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data.choices?.[0]?.text?.trim() || `Could not generate explanation.`;
  } catch (err) {
    return `Failed to fetch AI explanation: ${err}`;
  }
}
export {
  translateError
};
