import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ select: { role: true } });
  const roles = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});
  console.log('Roles Count:', roles);
}

main().catch(err => console.error(err)).finally(() => prisma.$disconnect());
