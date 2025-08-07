'use server';

import { freeTranslate } from '@/lib/translate/free_translate';
import type { LookupWithWord } from '@/types/kindle';

export const translate = async (
  lookupWithWord: LookupWithWord[],
  targetLanguage: string,
): Promise<LookupWithWord[]> => {
  const items = lookupWithWord.flatMap((lww) => [
    { text: lww.word, lang: lww.word_lang },
    { text: lww.usage, lang: lww.word_lang },
  ]);

  const batchSize = 20;
  const translated: string[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map((item) =>
        freeTranslate({
          text: item.text,
          sourceLanguage: item.lang,
          targetLanguage,
        }),
      ),
    );
    translated.push(...results);
  }

  return lookupWithWord.map((lww, idx) => ({
    ...lww,
    word_translated: translated[idx * 2],
    usage_translated: translated[idx * 2 + 1],
  }));
};
