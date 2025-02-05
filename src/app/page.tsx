'use client';

import Title from '@/components/Title';
import { useSearchParams } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Suspense } from 'react';
import React from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

function Home() {

  const { toast } = useToast()

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [loading, setLoading] = React.useState(true);
  const [nome, setNome] = React.useState('');

  React.useEffect(() => {
    axios.get("/api/convidado?id=" + id)
      .then((response) => {
        setNome(response.data.nome)
        setLoading(false)
      })
  }, [id])

  const confirmarPresenca = () => {
    axios.put("/api/confirm-presence?id=" + id, { confirmado: true })
      .then(() => toast({ title: "Presença confirmada!" }))
      .catch(() => toast({ title: "Erro ao confirmar presença", variant: "destructive" }))
  }

  const recusarPresenca = () => {
    axios.put("/api/confirm-presence?id=" + id, { confirmado: false })
      .then(() => toast({ title: "Presença recusada!" }))
      .catch(() => toast({ title: "Erro ao recusar presença", variant: "destructive" }))
  }

  if (loading) {
    return <div className='bg-amber-100 h-screen w-full grid place-items-center'><div className='border-4 border-green border-b-transparent rounded-full size-12 animate-spin'>&nbsp;</div></div>; // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  }

  return (
    <main className="bg-ocean bg-cover w-full h-screen bg-no-repeat bg-[80%] flex items-end justify-start py-20 px-10 flex-col gap-6 text-green">
      <h1 className="text-2xl font-semibold font-montserrat w-full text-end mb-6">
        Você foi convidado!
      </h1>
      <Title />
      <p className="font-montserrat uppercase text-end">22 de fevereiro</p>
      <p className="font-montserrat w-4/5 text-balance text-end uppercase">
        Estr. dos Chaves, 05 - Tanquinho, Santana de Parnaíba - SP, 06532-021
      </p>
      <p className="font-openSans text-end">13h00 | traga trajes de banho</p>

      <p className="text-end font-montserrat w-4/5">
        {nome}, confirme sua presença utilizando os botões abaixo:
      </p>

      {/* confirmar ida */}
      <Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="bg-green text-white rounded-md px-4 py-2 w-4/5 transition-all hover:opacity-60 active:translate-y-1">
              VOU
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className='w-11/12 rounded-sm'>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar ida</AlertDialogTitle>
              <AlertDialogDescription>
                {nome}, você está confirmando que vai comparecer ao evento.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Voltar</AlertDialogCancel>
              <DialogTrigger asChild>
                <AlertDialogAction onClick={confirmarPresenca}>Confirmar</AlertDialogAction>
              </DialogTrigger>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <DotLottieReact
                src="/check.lottie"
                autoplay
              />
            </DialogTitle>
            <DialogDescription>
              Agradecemos a confirmação. Nos vemos na festa!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* confirmar não ida */}
      <Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="text-green border border-green rounded-md px-4 py-2 w-4/5 transition-all hover:opacity-60 active:translate-y-1">
              NÃO VOU
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className='w-11/12 rounded-sm'>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar não ida</AlertDialogTitle>
              <AlertDialogDescription>
                {nome}, você está confirmando que não vai comparecer ao evento.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Voltar</AlertDialogCancel>
              <DialogTrigger asChild>
                <AlertDialogAction onClick={recusarPresenca}>Confirmar</AlertDialogAction>
              </DialogTrigger>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <DotLottieReact
                src="/check.lottie"
                autoplay
              />
            </DialogTitle>
            <DialogDescription>
              Agradecemos pela resposta.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </main>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
