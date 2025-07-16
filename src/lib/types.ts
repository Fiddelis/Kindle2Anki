export interface KindleBookInfo {
  id: string;
  title: string;
  authors: string;
  lang: string;
}

export interface KindleLookup {
  id: string;
  word_key: string;
  book_key: string;
  usage: string;
  timestamp: string;
}

export interface KindleWord {
  id: string;
  word: string;
  stem: string;
  lang: string;
  timestamp: string;
}

export interface LookupWithWord {
  lookup_id: string;
  word_key: string;
  book_key: string;
  usage: string;
  lookup_timestamp: string;

  word_id: string;
  word: string;
  stem: string;
  word_lang: string;
  word_timestamp: string;

  translated_lang: string | null;
  word_translated: string | null;
  usage_translated: string | null;
}
