type User = { id: string; email: string; password: string };

const g = globalThis as unknown as { __users?: User[] };

export const users: User[] = g.__users ?? (g.__users = []);
