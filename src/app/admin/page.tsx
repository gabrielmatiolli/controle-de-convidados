"use client"

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaPlus, FaShare } from "react-icons/fa";
import { FaRegCircleCheck, FaRegTrashCan } from 'react-icons/fa6';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Convidado, Situacao } from '@/types/convidado';
import { MdEdit, MdOutlinePending } from "react-icons/md";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Copy } from 'lucide-react';

function Page() {
  const { toast } = useToast();
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState(0); // Estado para rastrear a ordem de classificação
  const formCriarRef = useRef<HTMLFormElement>(null);
  const formEditarRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    axios.get<Convidado[]>('/api/convidados')
      .then(({ data }) => {
        setConvidados(data);
        setLoading(false);
      });
  }, []);

  const createConvidado = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const nome = formData.get('nome')?.toString();

    try {
      await axios.post('/api/convidados', { nome });
      toast({ title: 'Convidado cadastrado com sucesso!' });
      if (formCriarRef.current) {
        formCriarRef.current.reset();
      }
      const { data } = await axios.get<Convidado[]>('/api/convidados');
      setConvidados(data);
    } catch (error) {
      toast({ title: 'Erro ao cadastrar convidado', variant: 'destructive' });
      console.error(error);
    }
  };

  const deleteConvidado = async (id: number) => {
    try {
      await axios.delete(`/api/convidados?id=${id}`);
      toast({ title: 'Convidado excluído com sucesso!' });
      const { data } = await axios.get<Convidado[]>('/api/convidados');
      setConvidados(data);
    } catch (error) {
      toast({ title: 'Erro ao excluir convidado', variant: 'destructive' });
      console.error(error);
    }
  };

  const editarConvidado = async (event: React.FormEvent<HTMLFormElement>, id: number) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const nome = formData.get('nome')?.toString();

    try {
      await axios.put(`/api/convidados?id=${id}`, { nome });
      toast({ title: 'Convidado editado com sucesso!' });
      if (formEditarRef.current) {
        formEditarRef.current.reset();
      }
      const { data } = await axios.get<Convidado[]>('/api/convidados');
      setConvidados(data);
    } catch (error) {
      toast({ title: 'Erro ao editar convidado', variant: 'destructive' });
      console.error(error);
    }
  };

  const copyText = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const text = formData.get('link')?.toString();
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        console.log('Texto copiado para a área de transferência!');
      } catch (err) {
        console.error('Falha ao copiar texto: ', err);
      }
    }
  };

  const totalConfirmados = convidados.filter(convidado => convidado.situacao === 'confirmado').length;
  const totalRecusados = convidados.filter(convidado => convidado.situacao === 'não confirmado').length;
  const totalPendentes = convidados.filter(convidado => convidado.situacao === 'pendente').length;

  const getOrder = (order: number) => {
    switch (order) {
      case 0:
        return ['confirmado', 'pendente', 'não confirmado'];
      case 1:
        return ['pendente', 'confirmado', 'não confirmado'];
      case 2:
      default:
        return ['não confirmado', 'confirmado', 'pendente'];
    }
  };

  const handleSort = () => {
    const newOrder = (sortOrder + 1) % 3;
    setSortOrder(newOrder);

    const order = getOrder(newOrder);
    const sortedConvidados = [...convidados].sort((a, b) => order.indexOf(a.situacao) - order.indexOf(b.situacao));
    setConvidados(sortedConvidados);
  };

  if (loading) {
    return <div className='bg-amber-100 h-screen w-full grid place-items-center'><div className='border-4 border-green border-b-transparent rounded-full size-12 animate-spin'>&nbsp;</div></div>; // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  }

  return (
    <main className='bg-amber-100 w-full min-h-screen flex items-center justify-start py-12 px-10 flex-col gap-4'>
      <h1 className='text-3xl font-montserrat'>Lista de convidados</h1>
      <p className='text-md font-montserrat'>Total de convidados confirmados: {totalConfirmados}</p>
      <p className='text-md font-montserrat'>Total de convidados recusados: {totalRecusados}</p>
      <p className='text-md font-montserrat'>Total de convidados pendentes: {totalPendentes}</p>
      <p className='text-sm font-montserrat'>Total de convidados: {convidados.length}</p>

      {/* Cadastrar convidado */}
      <Dialog>
        <DialogTrigger asChild>
          <button className='px-4 py-2 rounded-md bg-green text-white flex items-center justify-center gap-2 transition-all hover:opacity-60 active:translate-y-1'><FaPlus /> Cadastrar novo convidado</button>
        </DialogTrigger>
        <DialogContent className='w-11/12 rounded-sm'>
          <form onSubmit={createConvidado} ref={formCriarRef} className='flex flex-col gap-5'>
            <DialogHeader>
              <DialogTitle className='font-openSans'>Cadastrar novo convidado</DialogTitle>
              <DialogDescription className='font-openSans'>
                Coloque o nome do convidado que você deseja adicionar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right font-openSans">
                Nome
              </Label>
              <Input
                id="nome"
                name="nome"
                defaultValue="Um nome qualquer"
                className="col-span-3 font-openSans"
              />
            </div>
            <DialogFooter>
              <Button className='font-openSans' type='submit'>Cadastrar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='font-openSans'>Nome</TableHead>
            <TableHead className='font-openSans' onClick={handleSort} style={{ cursor: 'pointer' }}>Status</TableHead>
            <TableHead className='text-right font-openSans'>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {convidados.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium font-openSans text-lg">{row.nome}</TableCell>
              <TableCell><SituacaoIcon situacao={row.situacao} /></TableCell>
              <TableCell className='flex items-center gap-2 justify-end'>
                {/* Confirmação convidado */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="bg-green size-10 grid place-items-center rounded-full transition-all hover:opacity-60 active:translate-y-1"><FaShare color='#fff' /></button>
                  </DialogTrigger>
                  <DialogContent className="w-11/12 rounded-sm">
                    <DialogHeader>
                      <DialogTitle>Criar novo link para confirmação do convidado</DialogTitle>
                      <DialogDescription>
                        Copie o link abaixo e envie para o convidado confirmar sua presença.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <form onSubmit={copyText} className="flex items-center gap-2 w-full">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="link" className="sr-only">
                            Link
                          </Label>
                          <Input
                            id="link"
                            name='link'
                            defaultValue={window.location.origin + "?id=" + row.id}
                            readOnly
                          />
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button type='submit' size="sm" className="px-3">
                              <span className="sr-only">Copy</span>
                              <Copy />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            Link copiado para a área de transferência!
                          </PopoverContent>
                        </Popover>
                      </form>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Fechar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Editar e excluir convidado */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="border border-green size-10 grid place-items-center rounded-full transition-all hover:opacity-60 active:translate-y-1"><MdEdit color='#576032' /></button>
                  </PopoverTrigger>
                  <PopoverContent className='flex gap-2 flex-col w-full'>
                    {/* Editar convidado */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={'outline'}><MdEdit /> Editar</Button>
                      </DialogTrigger>
                      <DialogContent className='w-11/12 rounded-sm'>
                        <form onSubmit={(e) => editarConvidado(e, row.id)} ref={formEditarRef} className='flex flex-col gap-5'>
                          <DialogHeader>
                            <DialogTitle className='font-openSans'>Editar nome do convidado</DialogTitle>
                            <DialogDescription className='font-openSans'>
                              Altere o nome do convidado que você deseja editar.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nome" className="text-right font-openSans">
                              Nome
                            </Label>
                            <Input
                              id="nome"
                              name="nome"
                              defaultValue={row.nome}
                              className="col-span-3 font-openSans"
                            />
                          </div>
                          <DialogFooter>
                            <Button className='font-openSans' type='submit'>Alterar</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>

                    {/* Excluir convidado */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant={'destructive'}><FaRegTrashCan /> Excluir</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='w-11/12 rounded-sm'>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Você irá excluir o convidado <strong>{row.nome}</strong> e não poderá desfazer essa ação.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteConvidado(row.id)}>Confirmar</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

const situacaoMap = {
  "pendente": { icon: MdOutlinePending, className: 'text-amber-500 text-[2.5rem]' },
  "confirmado": { icon: FaRegCircleCheck, className: 'text-emerald-600 text-[2rem]' },
  "não confirmado": { icon: IoCloseCircleOutline, className: 'text-red-600 text-[2.5rem]' }
};

function SituacaoIcon({ situacao }: { situacao: Situacao }) {
  const { icon: Icon, className } = situacaoMap[situacao];
  return <Icon className={className} />;
}

export default Page;