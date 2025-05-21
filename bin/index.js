#!/usr/bin/env node
import('../dist/index.js').then(async ({ translateError }) => {
    const input = process.argv.slice(2).join(" ");
  
    if (!input) {
      console.log("❗ Please provide an error message to translate.");
      process.exit(1);
    }
  
    const result = await translateError(input);
    console.log(result);
  });
  