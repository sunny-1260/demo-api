// tests/db.js
import mysql from 'mysql2/promise';          // promise‑based API

// you can also read from process.env or a .env file
const config = {
  host: 'taltektc.com',
  user: 'isnyhwte_qa_taltek',
  password: 'A3&s1UDtUDc',
  database: 'mydb',
};

export async function query(sql, params = []) {
  const conn = await mysql.createConnection(config);
  try {
    const [rows] = await conn.execute(sql, params);
    return rows;
  } finally {
    await conn.end();
  }
}