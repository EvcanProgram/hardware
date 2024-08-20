//send to rasberry 
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const data = await request.json();
        
        let picoResponse;

        // Set the URL of the Raspberry Pi Pico server
        const PICO_URL = 'https://5108-223-24-154-51.ngrok-free.app';

        // Send a request to the Pico based on the action
        if (data.action === 'red') {
            picoResponse = await fetch(`${PICO_URL}/red`);
        } else if (data.action === 'green') {
            picoResponse = await fetch(`${PICO_URL}/green`);
        } else if (data.action === 'blue') {
            picoResponse = await fetch(`${PICO_URL}/blue`);
        } else if (data.action === 'off') {
            picoResponse = await fetch(`${PICO_URL}/off`);
        }

        const picoData = await picoResponse.text();

        return NextResponse.json({ message: 'Action performed on Pico', data: picoData });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing data', error: error.message }, { status: 500 });
    }
}
