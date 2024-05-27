'use client'

import { Schedule } from '@prisma/client'
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {

  const { data: schedule, isLoading } = useQuery<Schedule[]>({
    queryKey: ['schedule'],
    queryFn: () => [],
  })

  const [todo, setTodo] = useState<Schedule>({
    id: 0,
    name: '',
    date: new Date(),
  })

  // const [schedule, setSchedule] = useState<Schedule[]>([]);

  // const saveTodo = () => {
  //   setSchedule((prev) => [...prev, todo])
  // }

  if (isLoading) return <span>Carrregando...</span>

  return (
    <main>
      <form className="flex flex-col w-1/2 mx-auto mt-4 gap-1">
        <label className="font-medium">Event: </label>
        <input className="p-1 rounded-sm text-green-100 bg-transparent border-green-100 border-2" value={todo.name} type="text" placeholder="ex: comprar pão"  onChange={({target}) => setTodo((prev) => ({ ...prev,  name: target.value}))}/>
        <label className="font-medium">Date: </label>
        <input className="p-1 rounded-sm text-green-100 bg-transparent border-green-100 border-2" type="date" placeholder="ex: comprar pão" />
        <button className="border-2 border-green-100 text-green-100 font-medium mt-2 rounded-sm">Save</button>
      </form>
      <div className="w-1/2 bg-green-100 h-[1px] mx-auto mt-4" />
      <ul>
        {
          schedule?.map((item) => <li  className="border-green-100 border-2" key={item.id}>{ item.name }</li>)
        }
      </ul>
    </main>
  )
}