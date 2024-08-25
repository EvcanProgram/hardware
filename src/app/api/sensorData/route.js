import { NextResponse } from 'next/server';

let sensorData = {};

export async function handler(req) {
  const { method } = req;

  if (method === 'OPTIONS') {
    return NextResponse.json(
      { message: 'CORS preflight OK' },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // or specify your allowed origin
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }

  switch (method) {
    case 'POST':
      try {
        const data = await req.json();
        console.log('Received data:', data);

        sensorData = {
          lux: data.lux,
          temperature: data.temperature,
          raindrop_status: data.raindrop_status,
          raindrop_value: data.raindrop_value,
          vibration_status: data.vibration_status,
          timestamp: new Date().toISOString(),
        };

        return NextResponse.json({ message: 'Data received successfully' }, { status: 200 });
      } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json({ message: 'Error processing request', error: error.message }, { status: 500 });
      }

    case 'GET':
      return NextResponse.json(sensorData, { status: 200 });

    // Add more cases as needed for other methods like PUT, DELETE, etc.

    default:
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}

export { handler as POST, handler as GET, handler as DELETE, handler as PUT, handler as HEAD, handler as OPTIONS };
