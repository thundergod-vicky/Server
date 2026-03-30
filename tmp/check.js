const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const session = await prisma.classSession.findUnique({
    where: { id: 'cmncmyow30002w423ncd7vtqh' }
  });
  console.log(session);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
