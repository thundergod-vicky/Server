const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sessionId = 'cmncnkk3a0001cs23xfm5qyso';
  const session = await prisma.classSession.findUnique({
    where: { id: sessionId },
    include: { webinarAccount: true }
  });
  console.log('Session ID:', sessionId);
  console.log('Result:', JSON.stringify(session, null, 2));
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
