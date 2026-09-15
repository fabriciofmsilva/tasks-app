import { NextRequest, NextResponse } from "next/server";
import { readTasks, updateTasks } from "@/app/lib/tasks";
import { getCurrentUser } from "@/app/lib/auth";
import { parseJson } from "@/app/lib/json";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const tasks = readTasks(user.id);
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await parseJson<{ title: string }>(req);
  if (body instanceof NextResponse) return body;
  const { title } = body;

  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const newTask = { id: crypto.randomUUID(), title, done: false };
  await updateTasks(user.id, (tasks) => ({ tasks: [...tasks, newTask], result: newTask }));

  return NextResponse.json(newTask, { status: 201 });
}
