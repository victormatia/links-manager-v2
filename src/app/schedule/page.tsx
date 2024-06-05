'use client'

import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Schedule from '@/components/Schedule';
import { useRouter } from 'next/navigation';

export default function SchedulePage() {
  const router = useRouter();

  return (
    <div className='w-11/12 max-w-96 mx-auto mt-5 '>
      <Breadcrumb className='mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/')} >Início</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Agenda</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

     <Schedule isEditing={false} />

      <Button size='lg' className='mt-4 w-full'>
        Contratar
      </Button>
    </div>
  )
}