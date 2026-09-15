import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { users } from "@/app/api/_store";
import { readTasks } from "@/app/lib/tasks";

export const dynamic = "force-dynamic";

import Menu from '@/app/components/menu';
import TaskList from "./TaskList";

export default async function TasksPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  const user = users.find((u) => u.id === sessionId);

  if (!user) redirect("/login");

  const tasks = readTasks(user.id);

  return (
    <div>
      <h1>Tasks - Task APP</h1>
      <Menu></Menu>
      <TaskList tasks={tasks} />
    </div>
  );
}
