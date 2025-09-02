import { translateBatch, translateText } from '../../../src/lib/server/translate';

import { TranslateTemplate } from '@/types/translate';

describe('translateText', () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    global.fetch = originalFetch;
  });

  it('send void text', async () => {
    const result = await translateText('   ', 'en', 'pt');
    expect(result).toBe('');
  });

  it('return translated text when response API is 200', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ translation: 'olá' }),
    });

    const result = await translateText('hello', 'en', 'pt');
    expect(result).toBe('olá');
  });

  it("throws when response API isn't ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(translateText('hello', 'en', 'pt')).rejects.toThrow(
      'Free translate failed: 500 Internal Server Error',
    );
  });

  it('returns empty string if JSON has no translation', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const result = await translateText('oi', 'pt', 'en');
    expect(result).toBe('');
  });
});

describe('translateBatch', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('return [] when items is empty', async () => {
    await expect(translateBatch([])).resolves.toEqual([]);
  });

  it('translate word and usage', async () => {
    const mockTranslate = jest
      .fn()
      .mockResolvedValueOnce('house')
      .mockResolvedValueOnce('The house is big')
      .mockResolvedValueOnce('cat')
      .mockResolvedValueOnce('The cat sleeps');

    const items: TranslateTemplate[] = [
      {
        id: 1,
        word: 'casa',
        usage: 'A casa é grande',
        sourceLanguage: 'pt',
        targetLanguage: 'en',
      },
      {
        id: 2,
        word: 'gato',
        usage: 'O gato dorme',
        sourceLanguage: 'pt',
        targetLanguage: 'en',
      },
    ];

    const out = await translateBatch(items, mockTranslate);

    expect(out).toEqual([
      { ...items[0], wordTranslated: 'house', usageTranslated: 'The house is big' },
      { ...items[1], wordTranslated: 'cat', usageTranslated: 'The cat sleeps' },
    ]);

    expect(mockTranslate).toHaveBeenCalledTimes(4);
    expect(mockTranslate).toHaveBeenNthCalledWith(1, 'casa', 'pt', 'en');
    expect(mockTranslate).toHaveBeenNthCalledWith(2, 'A casa é grande', 'pt', 'en');
    expect(mockTranslate).toHaveBeenNthCalledWith(3, 'gato', 'pt', 'en');
    expect(mockTranslate).toHaveBeenNthCalledWith(4, 'O gato dorme', 'pt', 'en');
  });
});
