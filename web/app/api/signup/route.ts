import { NextRequest, NextResponse } from "next/server";
import { users } from "../_store";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (users.some((u) => u.email === email)) {
    return NextResponse.json({ error: "email already exists" }, { status: 409 });
  }
  users.push({ id: crypto.randomUUID(), email, password }); // texto puro por enquanto, hash vem na Camada 5
  return NextResponse.json({ ok: true });
}
