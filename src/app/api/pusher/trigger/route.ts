import { NextResponse } from 'next/server';
import Pusher from 'pusher';

// Initialize Pusher only if env vars are present to avoid crash on import if missing
const getPusherInstance = () => {
  const appId = process.env.PUSHER_APP_ID;
  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const secret = process.env.PUSHER_SECRET;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  if (!appId || !key || !secret || !cluster) {
    throw new Error('Missing Pusher environment variables on server');
  }

  return new Pusher({
    appId,
    key,
    secret,
    cluster,
    useTLS: true,
  });
};

interface PusherPayload {
  roomCode: string;
  delta: unknown;   // raw JSON delta
  clientId: string;
}

export async function POST(req: Request) {
  try {
    const { roomCode, delta, clientId }: PusherPayload = await req.json();

    if (!roomCode || typeof roomCode !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing roomCode' },
        { status: 400 }
      );
    }

    if (!delta) {
      return NextResponse.json(
        { success: false, error: 'Missing delta' },
        { status: 400 }
      );
    }

    if (!clientId || typeof clientId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing clientId' },
        { status: 400 }
      );
    }

    const pusher = getPusherInstance();

    // ✅ Just relay raw delta JSON to Pusher
    await pusher.trigger(`doc-channel-${roomCode}`, 'doc-update', {
      delta,
      clientId,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('Pusher trigger error:', err);

    const message =
      err instanceof Error ? err.message : 'Unknown error occurred';

    // Distinguish between config errors and runtime errors if possible, 
    // but for security, 500 is generally appropriate for server-side issues.
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
