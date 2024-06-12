import { Schedule } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"
import { FaTrash } from "react-icons/fa";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/lib/QueryClient";
import axios from "axios";
import { DELETE_EVENT_URL } from "@/utils/constants";

type TProps = {
  isEditing: boolean,
  event: Schedule,
}

export default function ScheduleItem({ event, isEditing }: TProps) {

  const {
    id, title, day, month, year, startTime, endTime, eventPlace
  } = event;

  const formatingTime = (time: Decimal) => {
    return Number(time).toFixed(2).replace('.', ':')
  }

  const ifHaveStartTime = (startTime && !endTime) ? ` às ${formatingTime(startTime)}h` : ''
  const ifHaveStartTimeAndEndTime = (startTime && endTime) ? ` de ${formatingTime(startTime)}h às ${formatingTime(endTime)}h` : ''

  const deleteEvent = useMutation({
    mutationKey: ['delete-event'],
    mutationFn: (id: number) => {
      console.log(id)
      return axios.delete(DELETE_EVENT_URL + id)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['schedule'] });
    }
  })

  if (queryClient.isMutating({ mutationKey: ['delete-event'] })) return (
    <li className="flex w-full border border-[#24382F] p-1 items-center text-base relative">
      <span>Apagando evento...</span>
    </li>
  )

  return (
    <li className="flex w-full border border-[#24382F] p-1 items-center text-base relative">

      <span className="w-20 h-20 bg-white text-black flex items-center justify-center font-semibold text-3xl">
        {day}
      </span>

      <section className=" flex flex-col ml-3 text-gray-300 font-normal">

        <h4 className="text-white font-semibold text-xl">{title}</h4>
        {
          year ? (
            <span>
              {`${day}/${month}/${year},${ifHaveStartTime}${ifHaveStartTimeAndEndTime}`}
            </span>
          ) : (
            <span>
              {`${day}/${month},${ifHaveStartTime}${ifHaveStartTimeAndEndTime}`}
            </span>)
        }

        <span>{eventPlace}</span>

        {
          isEditing && (
            <Button
            size='icon'
            variant='destructive'
            className="absolute top-0 right-0 p-2 border-none"
            onClick={() => deleteEvent.mutate(id)}
            >
              <FaTrash />
            </Button>
          )
        }

      </section>
    </li>
  )
}