import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  try {
    const { rows } = await sql`SELECT * FROM convidados WHERE id = ${id}`
    return NextResponse.json(rows[0])
  } catch (error) {
    return NextResponse.json(error)
  }
}