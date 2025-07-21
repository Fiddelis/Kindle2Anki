# Kindle2Anki

Kindle2Anki is a **web application** built with Next.js and React that lets you upload your Kindle `vocab.db` file. Export your selected vocabulary directly into Anki-compatible CSV for seamless flashcard creation.

## Features

* 📁 **File Upload**: Drag-and-drop or browse to select your `vocab.db` from Kindle.
* 🌐 **Translation**: On-the-fly translations of words and sentences.
* 📊 **Interactive Tables**: Sort, filter, and select vocabulary entries in a responsive data table.
* 🎴 **Anki Export**: Generate a downloadable CSV that can be imported directly into Anki.

## Tech Stack

* 🚀 **Next.js** (App Router)
* ⚛️ **React** with Server & Client Components
* 💙 **TypeScript** for type safety
* 🗄️ **SQLite** (via `sql.js`) to read `vocab.db` in the browser
* 🎨 **Tailwind CSS** for styling

## License

This project is licensed under the [MIT License](LICENSE).
