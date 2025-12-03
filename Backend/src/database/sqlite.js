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

    // ------------------- LIVROS --------------------
    run(`CREATE TABLE IF NOT EXISTS livros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        autor TEXT NOT NULL,
        categoria TEXT NOT NULL,
        ano INTEGER NOT NULL,
        editora TEXT NOT NULL,
        numeroPaginas INTEGER NOT NULL
    )`);

    const hasCapa = all("PRAGMA table_info(livros)").some(col => col.name === "capa");
    if (!hasCapa) {
        run("ALTER TABLE livros ADD COLUMN capa TEXT");
        console.log("Coluna 'capa' adicionada à tabela livros");
    }

    // ------------------- USERS ---------------------
    run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    const hasEmail = all("PRAGMA table_info(users)").some(col => col.name === "email");

    if (!hasEmail) {
        run("ALTER TABLE users ADD COLUMN email TEXT");
        console.log("Coluna email adicionada à tabela users");
    }

    // ------------------- REVIEWS COM CASCADE ---------------------

    // Verifica se a tabela reviews existe
    const reviewsExists = all(`
        SELECT name FROM sqlite_master WHERE type='table' AND name='reviews';
    `).length > 0;

    // Se não existir, já cria com CASCADE direto
    if (!reviewsExists) {
        console.log("Criando tabela reviews com ON DELETE CASCADE...");
        run(`
            CREATE TABLE reviews (
                id_review INTEGER PRIMARY KEY AUTOINCREMENT,
                livro_id INTEGER NOT NULL,
                usuario_id INTEGER NOT NULL,
                nota INTEGER CHECK(nota >= 1 AND nota <= 5),
                comentario TEXT,
                dataReview DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE,
                FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
    } else {
        // Se existe, verifica se já tem CASCADE
        const fkList = all("PRAGMA foreign_key_list(reviews)");
        const hasCascade = fkList.some(fk => fk.on_delete === "CASCADE");

        if (!hasCascade) {
            console.log("Recriando tabela 'reviews' com ON DELETE CASCADE...");

            // renomear a tabela
            run(`ALTER TABLE reviews RENAME TO reviews_old`);

            // Criar nova tabela
            run(`
                CREATE TABLE reviews (
                    id_review INTEGER PRIMARY KEY AUTOINCREMENT,
                    livro_id INTEGER NOT NULL,
                    usuario_id INTEGER NOT NULL,
                    nota INTEGER CHECK(nota >= 1 AND nota <= 5),
                    comentario TEXT,
                    dataReview DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE,
                    FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
                )
            `);

            // Copiar dados
            run(`
                INSERT INTO reviews (id_review, livro_id, usuario_id, nota, comentario, dataReview)
                SELECT id_review, livro_id, usuario_id, nota, comentario, dataReview
                FROM reviews_old
            `);

            // Dropar tabela antiga
            run(`DROP TABLE reviews_old`);

            console.log("Tabela 'reviews' recriada com sucesso.");
        } else {
            console.log("Tabela 'reviews' já possui ON DELETE CASCADE.");
        }
    }

    console.log('Banco de dados SQLite inicializado');
}

module.exports = { getDb, run, get, all, init };
