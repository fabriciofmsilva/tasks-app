import { NextRequest, NextResponse } from "next/server";
import { users } from "../_store";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return NextResponse.json({ error: "invalid credentials" }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("session", user.id, { httpOnly: true, path: "/" });
  return res;
}
