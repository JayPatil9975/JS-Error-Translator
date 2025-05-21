import { errorMap } from "./errors";
import axios from "axios";
import "dotenv/config"; // Add this at the top


/**
 * Translates JS/TS error to a beginner-friendly explanation.
 * @param error Error object or string
 * @returns Friendly explanation
 */
export async function translateError(error: string | Error): Promise<string> {
  const message = typeof error === "string" ? error : error.message;
  const normalizedMessage = message.toLowerCase();

  for (const pattern in errorMap) {
    const regex = new RegExp(pattern, "i"); // case-insensitive regex
    if (regex.test(normalizedMessage)) {
      return `🔍 Explanation:\n${errorMap[pattern]}`;
    }
  }

  const aiExplanation = await getAIExplanation(message);
  return `🔍 Explanation:\n${aiExplanation}`;
}

/**
 * Fallback to OpenAI if no match found in errorMap
 */
/**
 * Fallback to OpenAI if no match found in errorMap
 */
async function getAIExplanation(message: string): Promise<string> {
    const apiKey = process.env.TOGETHER_API_KEY;
    if (!apiKey) {
      return `No explanation found for: "${message}". Set TOGETHER_API_KEY to enable AI fallback.`;
    }
  
    try {
      const prompt = `Explain this JavaScript/TypeScript error to a beginner:\n"${message}"`;
  
      const response = await axios.post(
        "https://api.together.xyz/v1/completions",
        {
          model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
          prompt: prompt,
          max_tokens: 150,
          temperature: 0.7,
          top_p: 0.9,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data.choices?.[0]?.text?.trim() || `Could not generate explanation.`;
    } catch (err) {
      return `Failed to fetch AI explanation: ${err}`;
    }
  }
  