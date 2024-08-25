import { NextResponse } from 'next/server';

const PICO_URL = 'https://a62a-2405-9800-b911-26af-756e-da1b-281a-85ed.ngrok-free.app';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    let picoResponse;
    let sensorEndpoint;

    // Determine the endpoint to hit on the Python server based on the action
    switch (data.action) {
      case 'fetch_lux':
        sensorEndpoint = '/print_lux';
        break;
      case 'fetch_temp':
        sensorEndpoint = '/print_temp';
        break;
      case 'fetch_raindrop':
        sensorEndpoint = '/print_raindrop';
        break;
      case 'fetch_vibration':
        sensorEndpoint = '/print_vibration';
        break;
      default:
        return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

    // Make a request to the Python server
    picoResponse = await fetch(`${PICO_URL}${sensorEndpoint}`);
    if (!picoResponse.ok) {
      throw new Error('Failed to fetch data from Python server');
    }
    const picoData = await picoResponse.text();

    console.log('Pico response data:', picoData);

    // Return the data from the Python server back to the frontend
    return NextResponse.json({ message: 'Data fetched successfully', data: picoData });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Error processing data', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Please use POST to fetch data' }, { status: 405 });
}
