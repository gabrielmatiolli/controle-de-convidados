import { QueryConvidado } from "@/types/convidado"
import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const { rows }: QueryConvidado = await sql`SELECT * FROM convidados`
    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function POST(req: NextRequest) {
  const { nome } = await req.json()
  try {
    await sql`INSERT INTO convidados (nome) VALUES (${nome})`
    return NextResponse.json({ message: 'Convidado cadastrado com sucesso!' })
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function PUT(req: NextRequest) {
  const { nome } = await req.json()
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  try {
    await sql`UPDATE convidados SET nome = ${nome} WHERE id = ${id}`
    return NextResponse.json({ message: 'Convidado editado com sucesso!' })
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function DELETE(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  try {
    await sql`DELETE FROM convidados WHERE id = ${id}`
    return NextResponse.json({ message: 'Convidado excluído com sucesso!' })
  } catch (error) {
    return NextResponse.json(error)
  }
}