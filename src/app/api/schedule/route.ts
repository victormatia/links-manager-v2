import prismaClient from "@/lib/PrismaClient";

async function main() {
 const data = await prismaClient.schedule.findMany();
 return data;
}

export const dynamic = 'force-dynamic';
 
export async function GET() {

  return main()
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