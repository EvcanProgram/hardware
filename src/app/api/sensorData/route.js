import { NextResponse } from 'next/server';

const PICO_URL = 'https://a62a-2405-9800-b911-26af-756e-da1b-281a-85ed.ngrok-free.app';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    // Define the endpoints
    const endpoints = {
      fetch_all: [
        '/print_lux',
        '/print_temp',
        '/print_raindrop',
        '/print_vibration',
      ],
    };

    let picoResponses = {};

    // Fetch data from all endpoints if action is 'fetch_all'
    if (data.action === 'fetch_all') {
      for (const endpoint of endpoints.fetch_all) {
        const picoResponse = await fetch(`${PICO_URL}${endpoint}`);
        if (picoResponse.ok) {
          picoResponses[endpoint] = await picoResponse.text();
        } else {
          picoResponses[endpoint] = `Error fetching data from ${endpoint}`;
        }
      }

      console.log('Pico responses:', picoResponses);

      return NextResponse.json({ message: 'All data fetched successfully', data: picoResponses });
    }

    // Handle other cases or invalid action
    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Error processing data', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Please use POST to fetch data' }, { status: 405 });
}

export async function OPTIONS() {
  return NextResponse.json({
    message: 'This endpoint only supports POST requests.',
    allowedMethods: ['POST'],
  }, {
    status: 200,
    headers: {
      'Allow': 'POST',
    },
  });
}
