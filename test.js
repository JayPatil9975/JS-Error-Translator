import { translateError } from "./dist/index.js"; // Use correct path to built file

async function main() {
  try {
    // ❌ Intentional error: calling undefined
    const result = undefined();
  } catch (err) {
    const explanation = await translateError(err);
    console.log(explanation);
  }

  try {
    // ❌ Another error: accessing a property on null
    const foo = null;
    console.log(foo.bar);
  } catch (err) {
    const explanation = await translateError(err);
    console.log(explanation);
  }
}

main();
