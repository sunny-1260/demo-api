// tests/db.js
import mysql from 'mysql2/promise';          // promise‑based API
import { expect } from '@playwright/test';

// you can also read from process.env or a .env file
const config = {
  host: 'taltektc.com',
  user: 'isnyhwte_qa_taltek',
  password: 'A3&s1UDtUDc',
  database: 'isnyhwte_qa_taltek',
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

export async function validateUserInDB(user_id, expected_first_name) {
  const rows = await query('SELECT * FROM users WHERE student_id = ?', [user_id]);
  expect(rows.length).toBeGreaterThan(0);
  expect(rows[0].first_name).toBe(expected_first_name);
  console.log(rows[0].first_name);
}