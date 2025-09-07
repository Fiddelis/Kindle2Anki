# Kindle2Anki

**Kindle2Anki** is a modern **web application** that helps you transform the vocabulary collected by your Kindle into **ready-to-study Anki flashcards** — all directly in your browser.
Simply connect your Kindle, upload the `vocab.db` file, select the words you want to keep, optionally translate them, and export a deck compatible with Anki.

<p align="center">
  <img width="1914" height="915" alt="Kindle2Anki preview" src="https://github.com/user-attachments/assets/8b5ba9a0-4c4b-442b-9c5e-0a907b12bdd2" />
</p>

---

## ✨ Features

* 📂 **Simple file upload** – Drag and drop or browse to select your `vocab.db` directly from your Kindle’s internal storage.
* 🔍 **Smart filtering** – View your vocabulary grouped by book, filter entries, and select only what matters to you.
* 🌐 **Optional translation** – Automatically translate both the word and its original sentence for easier learning.
* 🎴 **Anki-ready export** – Download a APKG that imports directly into Anki.

---

## 🚀 How It Works

1. **Connect your Kindle** via USB and locate the file:

   ```
   /system/vocabulary/vocab.db
   ```
2. **Upload the file** to Kindle2Anki (drag & drop or file picker).
3. **Select books and words** you want to keep.
4. **Translate** (optional) to your study language.
5. **Export** the CSV and import it into Anki.

---

## 🛠️ Tech Stack

* **Next.js** (App Router) for fast, modern web architecture
* **React** with Client & Server Components
* **TypeScript** for type safety
* **SQLite parsing in-browser** via [`sql.js`](https://github.com/sql-js/sql.js)
* **Tailwind CSS** for a clean, responsive UI

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
