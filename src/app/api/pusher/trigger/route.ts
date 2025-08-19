import { NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,            // from Pusher dashboard
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,     // public key (safe for client)
  secret: process.env.PUSHER_SECRET!,           // server-side secret
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

interface PusherPayload {
  roomCode: string;
  delta: unknown;   // raw JSON delta
  clientId: string;
}

export async function POST(req: Request) {
  try {
    const { roomCode, delta, clientId }: PusherPayload = await req.json();

    if (!roomCode || !delta || !clientId) {
      return NextResponse.json(
        { success: false, error: 'Missing roomCode, delta, or clientId' },
        { status: 400 }
      );
    }

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

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
