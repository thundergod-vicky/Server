import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const students = await prisma.user.findMany({
    where: { role: 'STUDENT' },
    select: { id: true, name: true, enrollmentId: true }
  });
  console.log('Students found:', students.length);
  students.forEach(s => console.log(`- ${s.name} (${s.enrollmentId})`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
