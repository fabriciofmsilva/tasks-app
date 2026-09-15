"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Task = { id: string; title: string; done: boolean };

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");

  async function createTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    router.refresh();
  }

  async function toggleTask(id: string, done: boolean) {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !done }),
    });
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={createTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleTask(t.id, t.done)}
            />
            <Link href={`/tasks/${t.id}`}>{t.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
