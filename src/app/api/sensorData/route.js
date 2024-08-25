import { NextResponse } from 'next/server';

let sensorData = {};

// Handle POST requests to update sensor data
export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Received data:', data);

    // Update the sensor data with new values
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
}

// Handle GET requests to retrieve sensor data
export async function GET() {
  return NextResponse.json(sensorData, { status: 200 });
}

// Handle HEAD requests (not supported in this API)
export function HEAD() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
