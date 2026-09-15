import { NextRequest, NextResponse } from "next/server";
import { users } from "@/app/api/_store";
import { readTasks, writeTasks } from "@/app/lib/tasks";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionId = req.cookies.get("session")?.value;
  const user = users.find((u) => u.id === sessionId);
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const { done } = await req.json();

  const tasks = readTasks(user.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return NextResponse.json({ error: "not found" }, { status: 404 });

  task.done = done;
  writeTasks(user.id, tasks);

  return NextResponse.json(task);
}
