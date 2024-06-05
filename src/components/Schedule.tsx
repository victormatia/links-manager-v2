'use client'

import { Schedule } from "@prisma/client";
import ScheduleItem from "./ScheduleItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EventSkeleton from "./EventSkeleton";

type TProps = {
  isEditing: boolean
}

export default function Schedule({ isEditing }: TProps) {

  const { data, isLoading } = useQuery<Schedule[]>({
    queryKey: ['schedule'],
    queryFn: async () => {
      return (await axios.get('http://localhost:3000/api/schedule')).data;
    }
  })

  if (isLoading) return (
    <div className='w-full p-1 flex gap-3 border border-[#24382F] items-center'>
      <EventSkeleton />
    </div>
  )

  if (!data?.length) return (
    <>
      <div className='text-center text-zinc-500 m-10'>
        <span className="font-semibold text-2xl">Sem eventos próximos</span>
        <br />
        {
          isEditing && <div className="mt-4 font-light">Clique no botão abaixo para adicionar um novo evento
          </div>
        }
      </div>
    </>
  )

  return (
    <ul className='flex flex-col gap-2 max-h-72 overflow-y-auto scroll'>
      {
        data?.map((event) => (
          <ScheduleItem key={event.id} event={event} isEditing={isEditing} />
        ))
      }
    </ul>
  )
}