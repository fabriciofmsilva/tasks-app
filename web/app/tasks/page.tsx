import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { users } from "../api/_store";
import { readTasks } from "../lib/tasks";

export const dynamic = "force-dynamic";

import Menu from '../components/menu';

export default async function Tasks() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  const user = users.find((u) => u.id === sessionId);

  if (!user) redirect("/login");

  const tasks = readTasks(user.id);

  return (
    <div>
      <h1>Tasks - Task APP</h1>
      <Menu></Menu>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.done ? "✅" : "⬜"} {t.title}</li>
        ))}
      </ul>
    </div>
  );
}
