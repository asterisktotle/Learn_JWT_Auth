import { DatabaseSync } from 'node:sqlite';
//database using memory from RAM for temporary database only
const db = new DatabaseSync(':memory:');

//execute SQL statement from strings
//INTEGER PRIMARY KEY - act as the rowid for that column
db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
    `);
db.exec(`
    CREATE TABLE todos (
        id  INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT, 
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    `);

export default db;
