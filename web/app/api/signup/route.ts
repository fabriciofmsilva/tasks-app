import { NextRequest, NextResponse } from "next/server";
import { users } from "../_store";
import { parseJson } from "@/app/lib/json";

export async function POST(req: NextRequest) {
  const body = await parseJson<{ email: string; password: string }>(req);
  if (body instanceof NextResponse) return body;
  const { email, password } = body;

  if (users.some((u) => u.email === email)) {
    return NextResponse.json({ error: "email already exists" }, { status: 409 });
  }
  // TODO: senha em texto puro — hashear (ex.: bcrypt) antes de persistir e comparar. Vem na Camada 5.
  users.push({ id: crypto.randomUUID(), email, password });
  return NextResponse.json({ ok: true });
}
