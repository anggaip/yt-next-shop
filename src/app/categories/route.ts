import { NextResponse } from "next/server";

import { categories } from "@/mocks/categories";

export async function GET() {
  return NextResponse.json(categories);
}
