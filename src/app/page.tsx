'use client';

import Title from '@/components/Title';
import { useSearchParams } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home() {
  const searchParams = useSearchParams();

  const nome = searchParams.get('p');

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
              VOU IR
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar ida</AlertDialogTitle>
              <AlertDialogDescription>
                {nome}, você está confirmando que vai comparecer ao evento.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Voltar</AlertDialogCancel>
              <DialogTrigger asChild>
                <AlertDialogAction>Confirmar</AlertDialogAction>
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
              NÃO VOU IR
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar não ida</AlertDialogTitle>
              <AlertDialogDescription>
                {nome}, você está confirmando que não vai comparecer ao evento.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Voltar</AlertDialogCancel>
              <DialogTrigger asChild>
                <AlertDialogAction>Confirmar</AlertDialogAction>
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
