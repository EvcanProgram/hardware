import { NextResponse } from 'next/server';

const PICO_URL = 'https://17a3-27-55-93-42.ngrok-free.app';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Adjust this as per your security needs
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};


export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    const endpoints = {
      fetch_all: [
        '/print_lux',
        '/print_temp',
        '/print_raindrop',
        '/print_vibration',
      ],
    };

    let picoResponses = {};

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

      return NextResponse.json(
        { message: 'All data fetched successfully', data: picoResponses },
        { headers: corsHeaders } // Add CORS headers here
      );
    }

    return NextResponse.json(
      { message: 'Invalid action' },
      { status: 400, headers: corsHeaders } // Add CORS headers here
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: 'Error processing data', error: error.message },
      { status: 500, headers: corsHeaders } // Add CORS headers here
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({
    message: 'This endpoint only supports POST requests.',
    allowedMethods: ['POST'],
  }, {
    status: 200,
    headers: {
      ...corsHeaders, // Apply CORS headers
      'Allow': 'POST',
    },
  });
}
