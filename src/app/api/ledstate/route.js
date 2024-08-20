import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const data = await request.json();
        console.log('Received data:', data);

        let picoResponse;
        const PICO_URL = 'https://6aa8-27-55-71-25.ngrok-free.appp';

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
