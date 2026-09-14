import fs from "fs";
import path from "path";

type Task = { id: string; title: string; done: boolean };

const DIR = path.join(process.cwd(), "data", "tasks");

const SEED: Task[] = [
  { id: "1", title: "Configurar ambiente", done: true },
  { id: "2", title: "Escrever primeiro teste", done: false },
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
