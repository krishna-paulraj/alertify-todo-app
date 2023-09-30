"use strict";
import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/db/conn";
import User from "@/models/user";
import { auth } from "@clerk/nextjs";

conn();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    const date = body;
    const { userId }: { userId: string | null } = auth();

    const user = await User.findOne({
      user_id: userId,
    });

    console.log(user.todos);

    const todosForDate = user.todos;

    return NextResponse.json({ todo: todosForDate });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
