import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { sql } from '@vercel/postgres'
import React from 'react'

async function Page() {

  const { rows } = await sql`SELECT * FROM convidados`

  return (
    <main className='bg-amber-100 w-full min-h-screen flex items-center justify-start py-20 flex-col gap-4'>
      <h1 className='text-2xl font-montserrat'>Lista de convidados</h1>

      <Table>
        <TableCaption>Lista de convidados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.nome}</TableCell>
              <TableCell>{row.situacao}</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </main>
  )
}

export default Page