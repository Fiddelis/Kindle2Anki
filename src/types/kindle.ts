export interface KindleBookInfo {
  id: string;
  title: string;
  authors: string;
  lang: string;
}

export interface LookupWithWord {
  lookup_id: string;
  word_id: string;
  book_id: string;

  usage: string;
  word: string;
  stem: string;
  word_lang: string;

  // Timestamps
  lookup_timestamp: Date;
  word_timestamp: Date;

  // Optional fields for translation
  word_translated: string | null;
  usage_translated: string | null;
}
