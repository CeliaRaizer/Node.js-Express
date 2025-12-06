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

    //livros
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

    //usuarios
    run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    const hasEmail = all("PRAGMA table_info(users)").some(col => col.name === "email");
    if (!hasEmail) {
        run("ALTER TABLE users ADD COLUMN email TEXT");
        console.log("Coluna 'email' adicionada à tabela users");
    }

    //reviews
    const reviewsExists = all(`
        SELECT name FROM sqlite_master WHERE type='table' AND name='reviews';
    `).length > 0;

    if (!reviewsExists) {
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
        const fkList = all("PRAGMA foreign_key_list(reviews)");
        const hasCascade = fkList.some(fk => fk.on_delete === "CASCADE");

        if (!hasCascade) {

            run(`ALTER TABLE reviews RENAME TO reviews_old`);

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

            run(`
                INSERT INTO reviews (id_review, livro_id, usuario_id, nota, comentario, dataReview)
                SELECT id_review, livro_id, usuario_id, nota, comentario, dataReview
                FROM reviews_old
            `);

            run(`DROP TABLE reviews_old`);
        } 
    }

    //favoritos
    const favoritesExists = all(`
        SELECT name FROM sqlite_master WHERE type='table' AND name='favorites';
    `).length > 0;

    if (!favoritesExists) {
        console.log("Criando tabela favorites com ON DELETE CASCADE...");
        run(`
            CREATE TABLE favorites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                book_id INTEGER NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (book_id) REFERENCES livros(id) ON DELETE CASCADE
            )
        `);
    } else {
        const fkFav = all("PRAGMA foreign_key_list(favorites)");
        const hasCascade = fkFav.some(fk => fk.on_delete === "CASCADE");

        if (!hasCascade) {
            console.log("Recriando tabela 'favorites' com ON DELETE CASCADE...");

            run(`ALTER TABLE favorites RENAME TO favorites_old`);

            run(`
                CREATE TABLE favorites (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    book_id INTEGER NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (book_id) REFERENCES livros(id) ON DELETE CASCADE
                )
            `);

            run(`
                INSERT INTO favorites (id, user_id, book_id)
                SELECT id, user_id, book_id FROM favorites_old
            `);

            run(`DROP TABLE favorites_old`);

            console.log("Tabela 'favorites' recriada com sucesso.");
        } 
    }

    console.log('Banco de dados SQLite inicializado');
}

module.exports = { getDb, run, get, all, init };
