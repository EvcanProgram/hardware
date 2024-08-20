import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT * FROM public."PHUW022" ORDER BY timestamp DESC');
      console.log(res.rows); // Log the raw data
      return NextResponse.json({ data: res.rows });
    } catch (error) {
      console.error('Error fetching data from PHUW022:', error);
      return NextResponse.json({ message: 'Error fetching data from PHUW022', error: error.message }, { status: 500 });
    } finally {
      client.release();
    }
  }
  
