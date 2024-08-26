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
      lux: '/print_lux',
      temperature: '/print_temp',
      raindrop: '/print_raindrop',
      vibration: '/print_vibration',
    };

    const endpoint = endpoints[data.action];
    if (!endpoint) {
      return NextResponse.json(
        { message: 'Invalid action' },
        { status: 400, headers: corsHeaders }
      );
    }

    const picoResponse = await fetch(`${PICO_URL}${endpoint}`);
    const result = picoResponse.ok ? await picoResponse.text() : 'Error fetching data';

    return NextResponse.json(
      { message: `${data.action} data fetched successfully`, data: result },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: 'Error processing data', error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    { message: 'This endpoint only supports POST requests.' },
    {
      status: 200,
      headers: {
        ...corsHeaders,
        'Allow': 'POST',
      },
    }
  );
}
