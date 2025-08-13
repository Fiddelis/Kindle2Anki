declare module '@steve2955/anki-apkg-export' {
  export default class AnkiExport {
    constructor(deckName: string);
    addCard(front: string, back: string): void;
    save(): Promise<Buffer>;
  }
}
