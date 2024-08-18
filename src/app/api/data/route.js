import { Client } from 'pg'; 

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { lux, temperature } = req.body;
    try {
      await client.connect();
      await client.query(
        'INSERT INTO sensor_data (lux, temperature) VALUES ($1, $2)',
        [lux, temperature]
      );
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    } finally {
      await client.end();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
