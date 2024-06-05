'use client'

import Schedule from "@/components/Schedule";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useRouter } from 'next/navigation';
import ScheduleForm from "@/components/ScheduleForm";
import { useState } from "react";

export default function SchedulePageEdit() {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const openForm = () => setFormIsOpen((prev) => !prev);

  return (
    <div className='w-11/12 max-w-96 mx-auto mt-5'>
      <Breadcrumb className='mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/')} >Início</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/schedule')} >Agenda</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Edição</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      <Schedule isEditing={true} />

      {formIsOpen && <ScheduleForm toggle={setFormIsOpen} />}


        <Button size='lg' className="w-full mt-4" onClick={openForm}>
          Novo evento
        </Button>

    </div>
  )
}