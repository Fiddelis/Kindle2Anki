import AnkiExport from '@steve2955/anki-apkg-export';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { deckName, cards } = await req.json();

  const apkg = new AnkiExport(deckName || 'Deck');
  for (const c of cards) apkg.addCard(c.front, c.back);

  const zip = await apkg.save();

  const zipArray = new Uint8Array(zip);
  return new Response(zipArray, {
    headers: {
      'Content-Type': 'application/apkg',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(deckName || 'deck')}.apkg"`,
      'Cache-Control': 'no-store',
    },
  });
}
