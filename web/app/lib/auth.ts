import { cookies } from "next/headers";
import { users } from "@/app/api/_store";

export async function getCurrentUser() {
  const sessionId = (await cookies()).get("session")?.value;
  return users.find((u) => u.id === sessionId);
}
