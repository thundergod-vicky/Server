import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('--- Parent-Student Links ---');
  const links = await prisma.parentStudent.findMany({
    include: {
      parent: { select: { email: true, name: true } },
      student: { select: { email: true, name: true } }
    }
  });
  console.log(JSON.stringify(links, null, 2));

  console.log('\n--- Parent Requests ---');
  const requests = await prisma.parentRequest.findMany({
    include: {
      parent: { select: { email: true, name: true } }
    }
  });
  console.log(JSON.stringify(requests, null, 2));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
