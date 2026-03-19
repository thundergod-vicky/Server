import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'motherfkrr@gmail.com';
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error('User not found');
    return;
  }

  const result = await prisma.examResult.deleteMany({
    where: { studentId: user.id },
  });

  console.log('Successfully removed results for ' + email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
