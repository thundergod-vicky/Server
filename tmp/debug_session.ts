import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  const sessionId = 'cmncmyow30002w423ncd7vtqh';

  const session = await prisma.classSession.findUnique({
    where: { id: sessionId },
    include: { webinarAccount: true },
  });

  console.log('Session Data:', JSON.stringify(session, null, 2));
  await prisma.$disconnect();
}

main();
