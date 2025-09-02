'use server';

import { TranslateTemplate } from '@/types/translate';

const ENDPOINT = 'https://translate-pa.googleapis.com/v1/translate';

type RawResponse = { translation: string };

const baseFetchInit: RequestInit = {
  method: 'GET',
  headers: {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'User-Agent': 'Mozilla/5.0',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

function buildParams(text: string, source: string, target: string) {
  const key = process.env.FREE_TRANSLATE_API_KEY ?? '';
  const params = new URLSearchParams({
    'params.client': 'gtx',
    'query.source_language': source,
    'query.target_language': target,
    'query.display_language': 'en-US',
    data_types: 'TRANSLATION',
    key,
    'query.text': text,
  });
  return params.toString();
}

export async function translateText(text: string, source: string, target: string): Promise<string> {
  if (!text?.trim()) return '';
  const qs = buildParams(text, source, target);
  const res = await fetch(`${ENDPOINT}?${qs}`, baseFetchInit);
  if (!res.ok) {
    throw new Error(`Free translate failed: ${res.status} ${res.statusText}`);
  }
  const body = (await res.json()) as RawResponse;
  return body.translation ?? '';
}

export async function translateBatch(
  items: TranslateTemplate[],
  translate = translateText,
): Promise<TranslateTemplate[]> {
  if (!Array.isArray(items) || items.length === 0) return [];

  const results = await Promise.all(
    items.map(async (item) => {
      const [wordTranslated, usageTranslated] = await Promise.all([
        translate(item.word, item.sourceLanguage, item.targetLanguage),
        translate(item.usage, item.sourceLanguage, item.targetLanguage),
      ]);

      return {
        ...item,
        wordTranslated,
        usageTranslated,
      } as TranslateTemplate;
    }),
  );
  return results;
}
