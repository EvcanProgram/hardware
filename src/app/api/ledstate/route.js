// src/app/api/ledstate/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const data = await request.json();
        // Process the data here
        return NextResponse.json({ message: 'Data received', data });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing data', error: error.message }, { status: 500 });
    }
}
