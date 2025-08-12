export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { deckName, cards } = await req.json();

  const AnkiExport = eval('require')('anki-apkg-export').default;

  const apkg = new AnkiExport(deckName || 'Deck');
  for (const c of cards) apkg.addCard(c.front, c.back);

  const zip = await apkg.save();
  return new Response(zip, {
    headers: {
      'Content-Type': 'application/apkg',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(deckName || 'deck')}.apkg"`,
      'Cache-Control': 'no-store',
    },
  });
}
