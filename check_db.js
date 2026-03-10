const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDb() {
  const teachers = await prisma.user.findMany({ where: { role: 'TEACHER' } });
  const batches = await prisma.batch.findMany();
  console.log('teachers count:', teachers.length);
  console.log('batches count:', batches.length);
  if (teachers.length > 0) console.log('first teacher:', teachers[0].name);
  if (batches.length > 0) console.log('first batch:', batches[0].name);
}

checkDb()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
