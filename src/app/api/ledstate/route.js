import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const data = await request.json();
        console.log('Received data:', data);

        let picoResponse;
        const PICO_URL = 'https://fb3d-2001-44c8-45c3-9f77-cca4-271b-6e59-4f88.ngrok-free.app';

        if (data.action === 'red') {
            picoResponse = await fetch(`${PICO_URL}/red`);
        } else if (data.action === 'green') {
            picoResponse = await fetch(`${PICO_URL}/green`);
        } else if (data.action === 'blue') {
            picoResponse = await fetch(`${PICO_URL}/blue`);
        } else if (data.action === 'off') {
            picoResponse = await fetch(`${PICO_URL}/off`);
        }

        console.log('Pico response status:', picoResponse.status);
        const picoData = await picoResponse.text();

        return NextResponse.json({ message: 'Action performed on Pico', data: picoData });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Error processing data', error: error.message }, { status: 500 });
    }
}
