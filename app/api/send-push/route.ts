import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

const serviceAccount = require('./path/to/your/serviceAccountKey.json');

if (initializeApp.apps.length === 0) {
    initializeApp({
        credential: cert(serviceAccount),
    });
}

export async function POST(request: NextRequest) {
    try {
        const { title, body, token } = await request.json();

        if (!title || !body || !token) {
            return NextResponse.json({ error: 'Missing title, body, or token' }, { status: 400 });
        }

        const message = {
            notification: {
                title: title,
                body: body,
            },
            token: token,
        };

        const messaging = getMessaging();
        const response = await messaging.send(message);

        return NextResponse.json({ messageId: response }, { status: 200 });
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}