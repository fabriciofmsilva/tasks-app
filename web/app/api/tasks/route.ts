import { NextRequest, NextResponse } from "next/server";
import { users } from "@/app/api/_store";
import { readTasks, writeTasks } from "@/app/lib/tasks";

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get("session")?.value;
  const user = users.find((u) => u.id === sessionId);

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const tasks = readTasks(user.id);
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get("session")?.value;
  const user = users.find((u) => u.id === sessionId);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { title } = await req.json();
  const tasks = readTasks(user.id);
  const newTask = { id: crypto.randomUUID(), title, done: false };
  writeTasks(user.id, [...tasks, newTask]);

  return NextResponse.json(newTask, { status: 201 });
}
