import { openDbFromBlob } from '@/lib/kindle/sql';

describe('openDbFromBlob', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('open DB with correct Uint8Array', async () => {
    const payload = new Uint8Array([1, 2, 3]);
    const mockFetch = jest.fn().mockResolvedValue({
      arrayBuffer: async () => payload.buffer,
    });

    const dbInstance = { ok: true };
    const Database = jest.fn().mockImplementation(() => dbInstance);
    const mockGetSqlJs = jest.fn().mockResolvedValue({ Database });

    const out = await openDbFromBlob('blob:foo', { fetch: mockFetch, getSqlJs: mockGetSqlJs });

    expect(mockFetch).toHaveBeenCalledWith('blob:foo');
    expect(mockGetSqlJs).toHaveBeenCalled();
    expect(Database).toHaveBeenCalledTimes(1);

    // validate that it was created with the same content as the buffer
    const arg = Database.mock.calls[0][0] as Uint8Array;
    expect(Array.from(arg)).toEqual([1, 2, 3]);

    // returns the instance of the DB created by SQL.Database
    expect(out).toBe(dbInstance);
  });

  it('throws error when fetch rejects', async () => {
    const mockFetch = jest.fn().mockRejectedValue(new Error('network'));
    const mockGetSqlJs = jest.fn();

    await expect(
      openDbFromBlob('blob:x', { fetch: mockFetch, getSqlJs: mockGetSqlJs }),
    ).rejects.toThrow('network');

    expect(mockGetSqlJs).not.toHaveBeenCalled();
  });

  it('throws error when res.arrayBuffer() rejects', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      arrayBuffer: async () => {
        throw new Error('bad buffer');
      },
    });
    const mockGetSqlJs = jest.fn();

    await expect(
      openDbFromBlob('blob:x', { fetch: mockFetch, getSqlJs: mockGetSqlJs }),
    ).rejects.toThrow('bad buffer');

    expect(mockGetSqlJs).not.toHaveBeenCalled();
  });

  it('throws error when getSqlJs rejects', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      arrayBuffer: async () => new ArrayBuffer(0),
    });
    const mockGetSqlJs = jest.fn().mockRejectedValue(new Error('sql.js load failed'));

    await expect(
      openDbFromBlob('blob:x', { fetch: mockFetch, getSqlJs: mockGetSqlJs }),
    ).rejects.toThrow('sql.js load failed');
  });
});
