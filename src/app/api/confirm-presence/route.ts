import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  const { confirmado } = await req.json();

  let status
  if (confirmado === true) status = 'confirmado'
  if (confirmado === false) status = 'não confirmado'

  const { rowCount } = await sql`UPDATE convidados SET situacao = ${status} WHERE id = ${id}`;

  return NextResponse.json(rowCount)
}