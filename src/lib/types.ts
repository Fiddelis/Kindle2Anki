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
