'use server';

import fetch from 'node-fetch';

export const freeTranslate = async ({
  text,
  sourceLanguage,
  targetLanguage,
}: {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}): Promise<string> => {
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
};
