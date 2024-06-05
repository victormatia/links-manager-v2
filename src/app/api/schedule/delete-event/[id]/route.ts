import prismaClient from "@/lib/PrismaClient";

async function main(id: number) {
 return prismaClient.schedule.delete({
  where: { id: Number(id) }
 });
}

export const dynamic = 'force-dynamic';

type TParams = { params: { id: number } }
 
export async function DELETE(_req: Request, { params: { id } }: TParams) {
  return main(id)
    .then(async (data) => {
      await prismaClient.$disconnect();
      return  Response.json(data, { status: 200 });
    })
    .catch(async (e) => {
      console.error(e);
      await prismaClient.$disconnect();
      return  Response.json({ message: e.message }, { status: 500 });
    });
}