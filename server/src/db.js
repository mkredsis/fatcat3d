import { DatabaseSync } from 'node:sqlite'
import fs from 'node:fs'
import path from 'node:path'

export const DATA_DIR = process.env.DATA_DIR || path.resolve(process.cwd(), 'data')
export const UPLOADS_DIR = path.join(DATA_DIR, 'uploads')

fs.mkdirSync(UPLOADS_DIR, { recursive: true })

const db = new DatabaseSync(path.join(DATA_DIR, 'fatcat3d.db'))

db.exec('PRAGMA journal_mode = WAL')
db.exec('PRAGMA foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    pass_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file TEXT NOT NULL,
    caption TEXT NOT NULL DEFAULT '',
    position INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`)

/** Transacción simple (equivalente a better-sqlite3 db.transaction). */
export function tx(fn) {
  db.exec('BEGIN')
  try {
    fn()
    db.exec('COMMIT')
  } catch (e) {
    db.exec('ROLLBACK')
    throw e
  }
}

export default db
