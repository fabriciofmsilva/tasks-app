import { redirect } from "next/navigation";
import { readTasks } from "@/app/lib/tasks";
import { getCurrentUser } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

import Menu from '@/app/components/menu';
import TaskList from "./TaskList";

export default async function TasksPage() {
  const user = await getCurrentUser();
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
