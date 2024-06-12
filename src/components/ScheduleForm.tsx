import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Dispatch, SetStateAction } from 'react';
import { Schedule } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import queryClient from '@/lib/QueryClient';
import EventSkeleton from './EventSkeleton';
import { CREATE_EVENT_URL } from '@/utils/constants';

type Tprops = {
  toggle: Dispatch<SetStateAction<boolean>>
}

const schema = z.object({
  title: z.string().min(2).max(100),
  day: z.string().min(1),
  month: z.string().min(1),
  year: z.string().min(4).optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  eventPlace: z.string().min(1).max(100),
});

export default function ScheduleForm({
  toggle,
}: Tprops) {

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const addEvent = useMutation({
    mutationKey: ['create-new-event'],
    mutationFn: async (event: Schedule) => axios.post(CREATE_EVENT_URL, event),
    onSuccess: async () => {
      form.reset();
      await queryClient.invalidateQueries({ queryKey: ['schedule'] });
      toggle((prev) => !prev);
    }
  })

  const closeForm = () => toggle((prev) => !prev);

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
    const newEvent = {
      title: data.title,
      day: Number(data.day),
      month: Number(data.month),
      year: Number(data.year),
      startTime: data.startTime ? parseFloat(data.startTime.replace(':', '.')) : null,
      endTime: data.endTime ? parseFloat(data.endTime.replace(':', '.')) : null,
      eventPlace: data.eventPlace
    } as unknown as Schedule

    addEvent.mutateAsync(newEvent);
  };

  return (
    <Form {...form}>
      <div className="absolute left-0 top-0 flex
        h-screen w-screen flex-col items-center
        justify-center gap-3 backdrop-blur-sm"
      >
        <div className="flex h-auto w-11/12 max-w-96 flex-col gap-1">
          {
            queryClient.isMutating({ mutationKey: ['create-new-event'] }) ? (
              <div className='w-full'>
                <EventSkeleton />
                <div className='text-center mt-2'>Adicionando o novo evento...</div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Novo evento</h3>
                  <Button className="self-end" variant='ghost' onClick={closeForm}>Fechar</Button>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 border border-zinc-800 bg-black p-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input
                            className='rounded-none border-zinc-800 bg-zinc-900  font-semibold text-zinc-200'
                            placeholder="Ex.: Música ao vivo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center gap-4">
                    <FormField
                      control={form.control}
                      name="day"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dia</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              className='rounded-none bg-zinc-900 border-zinc-800  text-zinc-200 font-semibold'
                              placeholder="20" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="month"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mês</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className='rounded-none bg-zinc-900 border-zinc-800  text-zinc-200 font-semibold'
                              placeholder="06" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ano</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className='rounded-none bg-zinc-900 border-zinc-800 text-zinc-200 font-semibold'
                              placeholder="2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="eventPlace"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local</FormLabel>
                        <FormControl>
                          <Input
                            className='rounded-none bg-zinc-900 border-zinc-800  text-zinc-200 font-semibold'
                            placeholder="Tardelli" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="w-full flex gap-4">

                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Início</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              className='bg-zinc-900 border-zinc-800 roundezinc-text-zinc-200e text-zinc-200 font-semibold rounded-none' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fim</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              className='bg-zinc-900 border-zinc-800 roundezinc-text-zinc-200e text-zinc-200 font-semibold rounded-none' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    className="mt-3"
                    size='lg'
                    variant='secondary'
                    type="submit"
                  >
                    Salvar evento
                  </Button>
                </form>
              </>
            )
          }
        </div>
      </div>
    </Form>
  );
}