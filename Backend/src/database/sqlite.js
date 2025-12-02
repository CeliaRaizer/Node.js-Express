const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_FILE = process.env.SQLITE_DB_FILE || path.join(__dirname, '../data/livraria.db');
fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

let db;
function getDb() {
    if (!db) {
        db = new Database(DB_FILE);
        db.pragma('foreign_keys = ON');
    }
    return db;
}

function run(sql, params = []) { return getDb().prepare(sql).run(...params); }
function get(sql, params = []) { return getDb().prepare(sql).get(...params); }
function all(sql, params = []) { return getDb().prepare(sql).all(...params); }

function init() {
    run(`CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    categoria TEXT NOT NULL,
    ano INTEGER NOT NULL,
    editora TEXT NOT NULL,
    numeroPaginas INTEGER NOT NULL
    )`);

    run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Verificar se coluna email existe
    const hasEmail = all("PRAGMA table_info(users)").some(col => col.name === "email");

    if (!hasEmail) {
        run("ALTER TABLE users ADD COLUMN email TEXT");
        console.log("Coluna email adicionada à tabela users");
    }

    run(`CREATE TABLE IF NOT EXISTS reviews (
    id_review INTEGER PRIMARY KEY AUTOINCREMENT,
    livro_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    nota INTEGER CHECK(nota >= 1 AND nota <= 5),
    comentario TEXT,
    dataReview DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (livro_id) REFERENCES livros(id),
    FOREIGN KEY (usuario_id) REFERENCES users(id)
    )`);


    console.log('Banco de dados SQLite inicializado');
}

module.exports = { getDb, run, get, all, init };
