import path from "path";
import { searchTableClient } from "../searchKindle";
import { KindleBookInfo, KindleLookup, KindleWord } from "../types";

describe("Funções de leitura do vocab.db", () => {
  const vocabularyDB = path.resolve(
    __dirname,
    "../../../tests/fixtures/vocab.db"
  );

  test("readBookInfo retorna array de objetos com os campos corretos", () => {
    const books = searchTableClient<KindleBookInfo>(
      vocabularyDB,
      "BOOK_INFO",
      {}
    );

    expect(Array.isArray(books)).toBe(true);
    expect(books[0]).toHaveProperty("id");
    expect(books[0]).toHaveProperty("title");
    expect(books[0]).toHaveProperty("authors");
    expect(books[0]).toHaveProperty("lang");
  });

  test("readLookups retorna array de lookups com os campos esperados", () => {
    const lookups = searchTableClient<KindleLookup>(
      vocabularyDB,
      "LOOKUPS",
      {}
    );

    expect(Array.isArray(lookups)).toBe(true);
    expect(lookups[0]).toHaveProperty("id");
    expect(lookups[0]).toHaveProperty("word_key");
    expect(lookups[0]).toHaveProperty("book_key");
    expect(lookups[0]).toHaveProperty("usage");
    expect(lookups[0]).toHaveProperty("timestamp");
  });

  test("readWords retorna array de palavras com os campos certos", () => {
    const words = searchTableClient<KindleWord>(vocabularyDB, "WORDS", {});

    expect(Array.isArray(words)).toBe(true);
    expect(words[0]).toHaveProperty("id");
    expect(words[0]).toHaveProperty("word");
    expect(words[0]).toHaveProperty("stem");
    expect(words[0]).toHaveProperty("lang");
    expect(words[0]).toHaveProperty("timestamp");
  });
});
