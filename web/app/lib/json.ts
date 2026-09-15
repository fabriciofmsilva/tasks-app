import { NextRequest, NextResponse } from "next/server";

export async function parseJson<T>(req: NextRequest): Promise<T | NextResponse> {
  try {
    return (await req.json()) as T;
  } catch {
    return NextResponse.json({ error: "invalid json body" }, { status: 400 });
  }
}
