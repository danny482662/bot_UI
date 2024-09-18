import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/next-auth';
import connectMongo from '@/libs/mongoose';
import Trade from '@/models/Trade';

// This function is used to get the trades for the authenticated user
export async function GET(req: Request) {
  try {
    // Get the session for the authenticated user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to the MongoDB database
    await connectMongo();

    // Find the trades for the authenticated user
    const trades = await Trade.find({ user_id: session.user.id });

    return NextResponse.json(trades);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}