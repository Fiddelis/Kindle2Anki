'use client';

import type { SqlJsStatic, Database as SqlJsDatabase } from 'sql.js';

let SQL: SqlJsStatic | null = null;

export async function getSqlJs(): Promise<SqlJsStatic> {
  if (!SQL) {
    const initSqlJs = (await import('sql.js')).default;
    SQL = await initSqlJs({
      locateFile: (file) => `/${file}`,
    });
  }
  return SQL;
}

export async function openDbFromBlob(blobUrl: string): Promise<SqlJsDatabase> {
  const res = await fetch(blobUrl);
  const buffer = await res.arrayBuffer();
  const SQL = await getSqlJs();
  return new SQL.Database(new Uint8Array(buffer));
}

import type { Database } from 'sql.js';

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
