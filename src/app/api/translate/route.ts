import { translate } from '@/lib/translate';

export async function POST(req: Request) {
  const { lookups, toLanguage } = await req.json();

  if (!lookups.length) return;
  const translated = await translate(lookups, toLanguage);

  return new Response(JSON.stringify(translated), {
    headers: { 'Content-Type': 'application/json' },
  });
}
