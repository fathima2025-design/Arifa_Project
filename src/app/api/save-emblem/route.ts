import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { base64 } = await req.json();
    if (!base64) return NextResponse.json({ error: "No base64" }, { status: 400 });
    const buffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const filePath = path.join(process.cwd(), "public", "images", "arifa-emblem-transparent.png");
    fs.writeFileSync(filePath, buffer);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
