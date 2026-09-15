import { NextRequest, NextResponse } from "next/server";
import { users } from "../_store";
import { parseJson } from "@/app/lib/json";

export async function POST(req: NextRequest) {
  const body = await parseJson<{ email: string; password: string }>(req);
  if (body instanceof NextResponse) return body;
  const { email, password } = body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return NextResponse.json({ error: "invalid credentials" }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  // TODO: cookie sem secure/sameSite/maxAge — adicionar secure (HTTPS), sameSite ("lax"/"strict") e expiração.
  res.cookies.set("session", user.id, { httpOnly: true, path: "/" });
  return res;
}
