import { NextResponse } from 'next/server';
import { Client } from 'pg';

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

export async function POST(request) {
    try {
        const data = await request.json();
        const { state, timestamp } = data;

        await client.query(
            'INSERT INTO led_states (state, timestamp) VALUES ($1, $2)',
            [state, timestamp]
        );

        return NextResponse.json({ message: 'Data received and stored', data });
    } catch (error) {
        console.error('Error processing data:', error);
        return NextResponse.json({ message: 'Error processing data', error: error.message }, { status: 500 });
    } finally {
        client.end(); // Make sure to close the connection
    }
}
