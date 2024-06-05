'use client'

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const WPP_URL = 'https://api.whatsapp.com/send?phone=5585997888850&text=Ol%C3%A1%20Maia,%20curti%20muito%20seu%20trabalho%20e%20tenho%20interesse%20em%20te%20contratar!';

export default function ActSection() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <Button size='lg' asChild>
        <a href={WPP_URL} target="_blank" rel="noopener noreferrer">Contratar</a>
      </Button>
      <Button size='lg' onClick={() => router.push('/schedule')}>Agenda</Button>
      <Button size='lg' asChild>
        <a href='' target="_blank" rel="noopener noreferrer">Youtube</a>
      </Button>
    </div>
  )
}