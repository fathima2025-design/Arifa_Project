import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const images = [
    {
      src: "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\c5e5fe33-7899-4fc8-98ac-34d89fbb0a1c\\arifa_contact_team_banner_1793077518646.jpg",
      dest: path.join(process.cwd(), "public", "images", "company", "contact-team-banner.jpg"),
    },
    {
      src: "C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\c5e5fe33-7899-4fc8-98ac-34d89fbb0a1c\\arifa_head_office_interior_1793077541657.jpg",
      dest: path.join(process.cwd(), "public", "images", "company", "office-interior.jpg"),
    },
  ];

  for (const img of images) {
    try {
      if (fs.existsSync(img.src)) {
        fs.mkdirSync(path.dirname(img.dest), { recursive: true });
        fs.copyFileSync(img.src, img.dest);
      }
    } catch (e) {
      console.warn("Failed to copy image:", e);
    }
  }

  return NextResponse.json({ success: true });
}
