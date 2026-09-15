import { NextRequest, NextResponse } from "next/server";
import { updateTasks } from "@/app/lib/tasks";
import { getCurrentUser } from "@/app/lib/auth";
import { parseJson } from "@/app/lib/json";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await parseJson<{ done: boolean }>(req);
  if (body instanceof NextResponse) return body;
  const { done } = body;

  const updated = await updateTasks(user.id, (tasks) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return { tasks, result: null };
    const updatedTask = { ...task, done };
    return { tasks: tasks.map((t) => (t.id === id ? updatedTask : t)), result: updatedTask };
  });

  if (!updated) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(updated);
}
