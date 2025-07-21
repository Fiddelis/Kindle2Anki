// lib/freeTranslate.ts
import fetch from "node-fetch";

const ENDPOINT = "https://translate-pa.googleapis.com/v1/translate";
const API_KEY = "AIzaSyDLEeFI5OtFBwYBIoK_jj5m32rZK5CkCXA";

export interface FreeTranslateOptions {
  text: string;
  sourceLanguage: string; // e.g. 'en'
  targetLanguage: string; // e.g. 'pt'
}

export async function freeTranslate({
  text,
  sourceLanguage,
  targetLanguage,
}: FreeTranslateOptions): Promise<string> {
  const params = new URLSearchParams({
    "params.client": "gtx",
    "query.source_language": sourceLanguage,
    "query.target_language": targetLanguage,
    "query.display_language": "en-US",
    data_types: "TRANSLATION",
    key: API_KEY,
    "query.text": text,
  });

  const res = await fetch(`${ENDPOINT}?${params.toString()}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
        "AppleWebKit/537.36 (KHTML, like Gecko) " +
        "Chrome/133.0.0.0 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!res.ok) {
    throw new Error(`Free translate failed: ${res.status} ${res.statusText}`);
  }

  const body = (await res.json()) as { translation: string };
  return body.translation;
}
