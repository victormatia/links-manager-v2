import prismaClient from "@/lib/PrismaClient";
import { Schedule } from "@prisma/client";

async function main(event: Schedule) {
 const data = await prismaClient.schedule.create({
  data: event
 });
 return data;
}

export const dynamic = 'force-dynamic';
 
export async function POST(req: Request) {
  const body = await req.json();

  return main(body)
    .then(async (data) => {
      await prismaClient.$disconnect();
      return  Response.json(data, { status: 201 });
    })
    .catch(async (e) => {
      console.error(e);
      await prismaClient.$disconnect();
      return  Response.json({ message: e.message }, { status: 500 });
    });
}