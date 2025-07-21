"use server";
import { freeTranslate } from "@/lib/free-translate";
import type { LookupWithWord } from "@/lib/types";

export async function translateTextsFree(
  lookupWithWord: LookupWithWord[],
  targetLanguage: string
): Promise<LookupWithWord[]> {
  type Item = { text: string; lang: string };
  const items: Item[] = lookupWithWord.flatMap((lww) => [
    { text: lww.word, lang: lww.word_lang },
    { text: lww.usage, lang: lww.word_lang },
  ]);

  const batchSize = 20;
  const translated: string[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    const batchResults = await Promise.all(
      batch.map((item) =>
        freeTranslate({
          text: item.text,
          sourceLanguage: item.lang,
          targetLanguage,
        })
      )
    );

    translated.push(...batchResults);
  }

  return lookupWithWord.map((lww, idx) => ({
    ...lww,
    word_translated: translated[idx * 2],
    usage_translated: translated[idx * 2 + 1],
  }));
}
