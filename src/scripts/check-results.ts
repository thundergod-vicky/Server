import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { email: { contains: 'mother' } },
    include: { examResults: true }
  });

  console.log('--- USER RESULTS REPORT ---');
  users.forEach(u => {
    console.log(`User: ${u.email} (ID: ${u.id})`);
    console.log(`Results: ${u.examResults.length}`);
    u.examResults.forEach(r => {
        console.log(`  - Exam ID: ${r.examId}, Submitted: ${r.submittedAt}`);
    });
  });

  if (users.length > 0) {
      const res = await prisma.examResult.deleteMany({
          where: { studentId: { in: users.map(u => u.id) } }
      });
      console.log(`Successfully DELETED ${res.count} results for these users.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
