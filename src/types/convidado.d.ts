export type Situacao = 'pendente' | 'confirmado' | 'não confirmado'

export interface Convidado {
  id: number
  nome: string
  situacao: Situacao
}

export type QueryConvidado = QueryResult<QueryResultRow & Convidado>