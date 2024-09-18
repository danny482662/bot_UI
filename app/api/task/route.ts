import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/next-auth';
import connectMongo from '@/libs/mongoose';
import User_Task from '@/models/User_Task';

export async function POST(req: Request) {

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    if (!body.task_id) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    await connectMongo();

    const newUserTask = new User_Task({
      user_id: session.user.id,
      task_id: body.task_id,
    });

    await newUserTask.save();

    return NextResponse.json(newUserTask);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
