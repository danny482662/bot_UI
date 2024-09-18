import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/next-auth';
import connectMongo from '@/libs/mongoose';
import User from '@/models/User';

export async function POST() {

  try {

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ hasAccess: false }, { status: 200 });
    }

    await connectMongo();

    // Find user by ID
    const user = await User.findById(session.user.id);

    // Check if user has access
    if (user) {
      return NextResponse.json({ hasAccess: user.hasAccess }, { status: 200 });
    }

    
    // Default to user not having access
    return NextResponse.json({ hasAccess: false }, { status: 200 });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}