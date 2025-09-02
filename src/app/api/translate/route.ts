import { translateBatch } from '@/lib/server/translate';
import { TranslateTemplate } from '@/types/translate';
import { NextResponse } from 'next/server';

type BatchOut = {
  id: string;
  word?: string;
  usage?: string;
  targetLanguage?: string;
  wordTranslated?: string;
  usageTranslated?: string;
};

type ClientItem = { id: string | number; word?: string; usage?: string };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { translation?: TranslateTemplate[] };
    if (!body?.translation || !Array.isArray(body.translation)) {
      return NextResponse.json({ error: 'translation must be an array' }, { status: 400 });
    }

    const raw: BatchOut[] = await translateBatch(body.translation);

    const normalized: ClientItem[] = raw.map((t) => ({
      id: t.id,
      word: t.wordTranslated ?? t.word,
      usage: t.usageTranslated ?? t.usage,
    }));

    return NextResponse.json(normalized, { status: 200 });
  } catch (err: unknown) {
    const message =
      err && typeof err === 'object' && 'message' in err
        ? (err as { message?: string }).message
        : 'Unexpected error while translating.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
