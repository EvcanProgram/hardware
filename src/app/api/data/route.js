import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export async function POST(req) {
  try {
    const { lux, temperature } = await req.json();
    await client.query(
      'INSERT INTO sensor_data (lux, temperature) VALUES ($1, $2)',
      [lux, temperature]
    );
    return new Response(
      JSON.stringify({ message: 'Data saved successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Database error:', error);
    return new Response(
      JSON.stringify({ error: 'Database error' }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await client.query('SELECT * FROM sensor_data');
    return new Response(
      JSON.stringify(result.rows),
      { status: 200 }
    );
  } catch (error) {
    console.error('Database error:', error);
    return new Response(
      JSON.stringify({ error: 'Database error' }),
      { status: 500 }
    );
  }
}
