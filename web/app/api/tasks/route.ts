import { NextRequest, NextResponse } from "next/server";
import { users } from "../_store";
import { readTasks } from "../../lib/tasks";

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get("session")?.value;
  const user = users.find((u) => u.id === sessionId);

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const tasks = readTasks(user.id);
  return NextResponse.json(tasks);
}
