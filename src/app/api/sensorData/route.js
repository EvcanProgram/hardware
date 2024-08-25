import { NextResponse } from 'next/server';

let sensorData = {};

export async function POST(req) {
  try {
    const { lux, temperature, raindrop_status, raindrop_value, vibration_status } = await req.json();

    sensorData = {
      lux,
      temperature,
      raindrop_status,
      raindrop_value,
      vibration_status,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({ message: 'Data received successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(sensorData, { status: 200 });
}

export function HEAD() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
