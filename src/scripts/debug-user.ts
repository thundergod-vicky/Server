import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const email = 'tathagat.saha@gmail.com';
  console.log(`Checking user: ${email}`);
  
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      parentOf: {
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      },
      parentRequests: true
    }
  });
  
  if (!user) {
    console.log('User not found');
  } else {
    console.log('User found:', {
      id: user.id,
      name: user.name,
      role: user.role,
      parentOfCount: user.parentOf.length,
      parentRequestsCount: user.parentRequests.length
    });
    console.log('Links:', JSON.stringify(user.parentOf, null, 2));
    console.log('Requests:', JSON.stringify(user.parentRequests, null, 2));
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
