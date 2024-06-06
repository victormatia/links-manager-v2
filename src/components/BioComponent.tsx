import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const BIO = 'Uma artista itapipoquense compartilha suas experiências musicais através de uma variedade de estilos e influências em suas composições. Seu mais recente single, "Volta", lançado em colaboração com  Lucas Menezes, está disponível em todas as plataformas de streaming. Além disso, Vitória contribui para o grupo "The Maias", uma verdadeira família musical, onde junto com seu pai, Valquirio Maia, na percussão, e sua irmã, Valentina Maia, no vocal e bandolim, formam uma equipe dinâmica que encanta o público com sua harmonia e talento conjunto em festivais e diversos eventos sociais'

export default function BioComponent() {
  return (
    <div className="w-11/12 max-w-96 flex flex-col">
      <p className="line-clamp-3 text-justify">{BIO}</p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="link" className="p-0 self-end" >Ler mais</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="">Sobre Vitória Maia</AlertDialogTitle>
            <AlertDialogDescription>
            { BIO }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}