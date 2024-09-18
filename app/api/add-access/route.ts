import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/next-auth';
import connectMongo from '@/libs/mongoose';
import User from '@/models/User';

export async function POST() {

  try {

    const session = await getServerSession(authOptions);

    await connectMongo();

    const user = await User.findById(session.user.id);

    if (user) {
      user.hasAccess = true;
      await user.save();
      return NextResponse.json({ hasAccess: true }, { status: 200 });
    } else {
      throw new Error("No user found");
    }
    
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}