import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
};

export async function POST(req) {
  try {
    const data = await req.json();
    const { state, status, lux } = data;

    if (!state) {
      return NextResponse.json({ error: 'State is required' }, { status: 400 });
    }

    const result = await query(
      'INSERT INTO public."PHUW022" (state, timestamp, status, lux) VALUES ($1, CURRENT_TIMESTAMP, $2, $3) RETURNING id',
      [state, status, lux]
    );

    return NextResponse.json({ id: result.rows[0].id }, { status: 201 });
  } catch (err) {
    console.error('Database error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
