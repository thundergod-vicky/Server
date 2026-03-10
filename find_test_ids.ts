import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { name: { contains: 'TEST', mode: 'insensitive' } },
    select: { id: true, name: true, enrollmentId: true }
  });
  console.log('Found users:', JSON.stringify(users, null, 2));
}

main().catch(err => console.error(JSON.stringify(err, null, 2))).finally(() => prisma.$disconnect());
