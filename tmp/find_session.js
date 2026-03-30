const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sessions = await prisma.classSession.findMany({
    where: { 
      title: 'Test Class 1'
    },
    include: { webinarAccount: true }
  });
  console.log('Found Sessions:', JSON.stringify(sessions, null, 2));
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
