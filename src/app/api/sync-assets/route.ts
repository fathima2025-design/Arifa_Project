import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: true, message: "Assets already synced in public/images/company" });
}
