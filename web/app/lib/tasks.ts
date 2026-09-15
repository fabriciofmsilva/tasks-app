import fs from "fs";
import path from "path";

type Task = { id: string; title: string; done: boolean };

const DIR = path.join(process.cwd(), "data", "tasks");

const SEED: Task[] = [
  { id: "1", title: "Configure environment", done: true },
  { id: "2", title: "Write first test", done: false },
];

function filePath(user: string) {
  return path.join(DIR, `${user}.json`);
}

export function readTasks(user: string): Task[] {
  const file = filePath(user);
  if (!fs.existsSync(file)) {
    fs.mkdirSync(DIR, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(SEED, null, 2));
  }
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function writeTasks(user: string, tasks: Task[]) {
  fs.writeFileSync(filePath(user), JSON.stringify(tasks, null, 2));
}

const locks = new Map<string, Promise<unknown>>();

// ponytail: lock em memória por usuário — serializa read-modify-write só dentro
// deste processo. Se rodar multi-instância/serverless, trocar por lock externo
// (ex.: Redis) ou mover storage pra DB com transação.
export function updateTasks<T>(
  user: string,
  fn: (tasks: Task[]) => { tasks: Task[]; result: T }
): Promise<T> {
  const run = () => {
    const { tasks, result } = fn(readTasks(user));
    writeTasks(user, tasks);
    return result;
  };
  const next = (locks.get(user) ?? Promise.resolve()).then(run, run);
  locks.set(user, next.catch(() => {}));
  return next;
}
