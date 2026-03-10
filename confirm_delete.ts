import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.user.count({
    where: { name: { contains: 'TEST', mode: 'insensitive' } }
  });
  console.log('Test users remaining count:', count);
}

main().catch(console.error).finally(() => prisma.$disconnect());
