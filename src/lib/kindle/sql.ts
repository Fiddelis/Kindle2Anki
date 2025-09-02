'use client';

import type { SqlJsStatic, Database as SqlJsDatabase } from 'sql.js';
import type { Database } from 'sql.js';

let SQL: SqlJsStatic | null = null;

async function getSqlJs(): Promise<SqlJsStatic> {
  if (!SQL) {
    const initSqlJs = (await import('sql.js')).default;
    SQL = await initSqlJs({
      locateFile: (file) => `/${file}`,
    });
  }
  return SQL;
}

export async function openDbFromBlob(
  blobUrl: string,
  deps: {
    fetch?: typeof fetch;
    getSqlJs?: () => Promise<{ Database: new (buf: Uint8Array) => SqlJsDatabase }>;
  } = {},
): Promise<SqlJsDatabase> {
  const f = deps.fetch ?? globalThis.fetch;
  const get = deps.getSqlJs ?? getSqlJs;

  const res = await f(blobUrl);
  const buffer = await res.arrayBuffer();
  const SQL = await get();
  return new SQL.Database(new Uint8Array(buffer));
}

export function searchTableClient<T>(
  db: Database,
  fields: string,
  table: string,
  filters: Partial<Record<keyof T, string | number | Array<string | number>>>,
): T[] {
  const clauses: string[] = [];
  const params: (string | number)[] = [];

  Object.entries(filters).forEach(([key, raw]) => {
    if (raw == null) return;

    if (Array.isArray(raw)) {
      const placeholders = raw.map(() => '?').join(', ');
      clauses.push(`"${key}" IN (${placeholders})`);
      params.push(...raw);
    } else {
      clauses.push(`"${key}" = ?`);
      params.push(raw as string | number);
    }
  });

  const where = clauses.length ? 'WHERE ' + clauses.join(' AND ') : '';
  const sql = `SELECT ${fields} FROM ${table} ${where}`;
  const stmt = db.prepare(sql);

  stmt.bind(params);
  const results: T[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject() as unknown as T);
  }
  stmt.free();
  return results;
}
