import { translate } from '@/lib/translate';
import { freeTranslate } from '@/lib/translate/free_translate';
import { LookupWithWord } from '@/types/kindle';

jest.mock('@/lib/translate/free_translate', () => {
  return {
    freeTranslate: jest.fn(({ text }) => {
      if (text === 'landscape') return Promise.resolve('paisagem');
      return Promise.resolve(
        'Introdução ao Spring Boot e Quarkus No cenário atual de desenvolvimento de software...',
      );
    }),
  };
});

describe('Translate Function Tests', () => {
  test('translate should return translated word and usage', async () => {
    const lookup: LookupWithWord = {
      lookup_id: '1',
      book_id: '1',
      word_id: 'en:landscape',
      usage:
        'Spring Boot and Quarkus Introduction In the current landscape of software development...',
      word: 'landscape',
      stem: 'landscape',
      word_lang: 'en',
      word_timestamp: new Date(),
      lookup_timestamp: new Date(),
      word_translated: null,
      usage_translated: null,
    };

    const result = await translate([lookup], 'pt');

    expect(result).toEqual([
      {
        ...lookup,
        word_translated: 'paisagem',
        usage_translated:
          'Introdução ao Spring Boot e Quarkus No cenário atual de desenvolvimento de software...',
      },
    ]);

    // Verificação opcional para garantir que o mock foi chamado
    expect(freeTranslate).toHaveBeenCalledTimes(2);
  });
});
