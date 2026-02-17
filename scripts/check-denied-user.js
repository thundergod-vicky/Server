const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUser() {
  const userId = 'cmlkqtu9800003wvg1avdrc6c';
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true, name: true }
  });
  console.log('User found:', user);
  
  const allTeachers = await prisma.user.findMany({
    where: { role: 'TEACHER' },
    select: { id: true, email: true, name: true }
  });
  console.log('All Teachers:', allTeachers);
  
  await prisma.$disconnect();
}

checkUser();
