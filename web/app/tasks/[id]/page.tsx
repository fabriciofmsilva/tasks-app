import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { users } from "@/app/api/_store";
import { readTasks } from "@/app/lib/tasks";

export const dynamic = "force-dynamic";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const sessionId = (await cookies()).get("session")?.value;
  const user = users.find((u) => u.id === sessionId);
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
