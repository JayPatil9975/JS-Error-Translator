# 🧠 js-error-translator

> Translate confusing JavaScript and TypeScript error messages into beginner-friendly explanations — instantly!

---

## ✨ Features

- 🔍 Translates cryptic JS/TS errors into plain English
- 🧪 Works as a library *and* a CLI tool
- 🔧 Useful for beginners, educators, and debugging sessions
- 🤖 (Optional) Fallback to AI explanations using local Ollama integration

---

## 📦 Installation

```bash
npm install js-error-translator

Or to use it globally as a CLI:

```bash
npm install -g js-error-translator

🚀 Usage
✅ As a Library (in code)

```bash 

import { translateError } from "js-error-translator";
const message = await translateError("TypeError: undefined is not a function");
console.log(message);


💻 As a CLI tool

js-error-translator "TypeError: undefined is not a function"

You’ll get:

🔍 Explanation:
You're trying to call something that's not a function. Check your variables or imports.

```bash
npm run test

👥 Author
Made with ❤️ by Jayesh Patil

📄 License
MIT

Let me know if you’d like to:
- Add example GIFs/screenshots
- Document Ollama integration better
- Auto-generate CLI help

Shall I update this into your project and bump the version to `1.1.0` so you can re-publish?