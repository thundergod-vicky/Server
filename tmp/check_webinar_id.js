const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sessionId = 'cmncnx51o00018s23g1z4owwa';
  const session = await prisma.classSession.findUnique({
    where: { id: sessionId },
    include: { webinarAccount: true }
  });
  console.log('Session ID:', sessionId);
  console.log('Webinar ID:', session?.webinarId);
  console.log('Webinar Account ID:', session?.webinarAccountId);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
