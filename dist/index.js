// src/errors.ts
var errorMap = {
  // TypeErrors
  "undefined is not a function": "You're trying to call something that's not a function. Check your variables or imports.",
  "cannot read property '.*?' of undefined": "You're accessing a property of an undefined variable. Initialize it first.",
  "cannot read properties of undefined": "You're trying to access a property on an undefined variable.",
  "cannot read properties of null": "You're trying to access a property on null. Ensure it's not null before using.",
  "x is not a function": "You're calling something as a function that isn't one. Check for typos or overwritten variables.",
  "x is not iterable": "You're trying to loop through a value that's not iterable, like an object or null.",
  "assignment to constant variable": "You're trying to reassign a constant. Use let or var if you need to reassign.",
  "maximum call stack size exceeded": "There's likely a recursive function without a proper base case. It's causing an infinite loop.",
  // Reference Errors
  "x is not defined": "You're using a variable that hasn't been declared. Did you forget to define or import it?",
  "cannot access '.*?' before initialization": "You're trying to use a variable before it's initialized. Check variable hoisting.",
  // Syntax Errors
  "unexpected token": "There's a syntax error \u2014 maybe a missing bracket, comma, or quote.",
  "unexpected end of input": "You probably missed a closing parenthesis, bracket, or quote.",
  "missing \\) after argument list": "You're missing a closing parenthesis in your function call.",
  "invalid or unexpected token": "There might be a character in your code that JS doesn't understand \u2014 like a copy-paste artifact.",
  // Range Errors
  "invalid array length": "You've tried to set an array length to a negative number or something invalid.",
  "invalid string length": "You\u2019re trying to create a string that's too large or invalid.",
  // JSON Errors
  "unexpected token .* in JSON at position": "You're parsing invalid JSON. Maybe a missing comma or extra character?",
  "unexpected end of JSON input": "The JSON data ended too early \u2014 maybe something wasn't fully written or closed.",
  // Eval Errors
  "unexpected identifier": "There's likely a typo or malformed expression \u2014 maybe you forgot a comma or operator.",
  // Fetch / Network
  "failed to fetch": "There was a network error \u2014 check your internet connection or server.",
  "networkerror when attempting to fetch resource": "The browser couldn't connect to the URL \u2014 check the endpoint.",
  // DOM & Browser
  "document is not defined": "You're trying to use the DOM in a non-browser environment like Node.js.",
  "window is not defined": "This error happens in environments like Node.js. The 'window' object exists only in browsers.",
  // Promise / Async
  "cannot set properties of undefined": "You're trying to assign a value to something that doesn't exist yet.",
  "async function returned undefined": "You might be forgetting to `return` a value from your async function.",
  // TypeScript Specific
  "argument of type .* is not assignable to parameter of type .*": "You're passing the wrong type to a function or method. Check your types.",
  "property '.*?' does not exist on type": "You're trying to access a property that doesn't exist on the given type.",
  "cannot find module '.*?'": "You're trying to import a module that can't be found \u2014 check file paths and extensions.",
  "type '.*?' is not assignable to type '.*?'": "You're assigning a value to a type-incompatible variable.",
  "cannot redeclare block-scoped variable": "You declared the same variable name twice in the same scope with let/const."
};

// src/index.ts
import axios from "axios";
import "dotenv/config";
async function translateError(error) {
  const message = typeof error === "string" ? error : error.message;
  const normalizedMessage = message.toLowerCase();
  for (const pattern in errorMap) {
    const regex = new RegExp(pattern, "i");
    if (regex.test(normalizedMessage)) {
      return `\u{1F50D} Explanation:
${errorMap[pattern]}`;
    }
  }
  const aiExplanation = await getAIExplanation(message);
  return `\u{1F50D} Explanation:
${aiExplanation}`;
}
async function getAIExplanation(message) {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    return `No explanation found for: "${message}". Set TOGETHER_API_KEY to enable AI fallback.`;
  }
  try {
    const prompt = `Explain this JavaScript/TypeScript error to a beginner:
"${message}"`;
    const response = await axios.post(
      "https://api.together.xyz/v1/completions",
      {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        prompt,
        max_tokens: 150,
        temperature: 0.7,
        top_p: 0.9
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
