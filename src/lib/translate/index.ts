'use server';
import fetch from 'node-fetch';
import type { LookupWithWord } from '@/types/kindle';

async function freeTranslate({
  text,
  sourceLanguage,
  targetLanguage,
}: {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}): Promise<string> {
  const params = new URLSearchParams({
    'params.client': 'gtx',
    'query.source_language': sourceLanguage,
    'query.target_language': targetLanguage,
    'query.display_language': 'en-US',
    data_types: 'TRANSLATION',
    key: process.env.FREE_TRANSLATE_API_KEY ?? '',
    'query.text': text,
  });

  const res = await fetch(`https://translate-pa.googleapis.com/v1/translate?${params}`, {
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!res.ok) {
    throw new Error(`Free translate failed: ${res.status} ${res.statusText}`);
  }

  const body = (await res.json()) as { translation: string };
  return body.translation;
}

export async function translate(
  lookupWithWord: LookupWithWord[],
  targetLanguage: string,
): Promise<LookupWithWord[]> {
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
}
