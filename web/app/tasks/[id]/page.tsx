import { redirect, notFound } from "next/navigation";
import { readTasks } from "@/app/lib/tasks";
import { getCurrentUser } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { id } = await params;
  const task = readTasks(user.id).find((t) => t.id === id);
  if (!task) notFound();

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.done ? "✅ concluída" : "⬜ pendente"}</p>
    </div>
  );
}
