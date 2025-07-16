"use client";

import type { SqlJsStatic, Database as SqlJsDatabase } from "sql.js";

let SQL: SqlJsStatic | null = null;

export async function getSqlJs(): Promise<SqlJsStatic> {
  if (!SQL) {
    // importa só no client
    const initSqlJs = (await import("sql.js")).default;
    SQL = await initSqlJs({
      locateFile: (file) => `/${file}`, // aponta para /sql-wasm.wasm
    });
  }
  return SQL;
}

export async function openDbFromBlob(blobUrl: string): Promise<SqlJsDatabase> {
  // busca o arquivo .db selecionado pelo usuário
  const res = await fetch(blobUrl);
  const buffer = await res.arrayBuffer();
  const SQL = await getSqlJs();
  return new SQL.Database(new Uint8Array(buffer));
}

import type { Database } from "sql.js";

export function searchTableClient<T>(
  db: Database,
  table: string,
  filters: Partial<T>
): T[] {
  const clauses: string[] = [];
  const params: (string | number)[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    if (value != null) {
      clauses.push(`"${key}" = ?`);
      params.push(value as string | number);
    }
  });

  const where = clauses.length ? "WHERE " + clauses.join(" AND ") : "";
  const sql = `SELECT * FROM ${table} ${where}`;
  const stmt = db.prepare(sql);

  // aqui só bind e itera
  stmt.bind(params);
  const results: T[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject() as unknown as T);
  }
  stmt.free();
  return results;
}
