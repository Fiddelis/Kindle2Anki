export interface TranslateTemplate {
  id: string;
  word: string;
  wordTranslated?: string;
  usage: string;
  usageTranslated?: string;
  sourceLanguage: string;
  targetLanguage: string;
}
