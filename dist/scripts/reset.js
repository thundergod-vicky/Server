"use strict";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const email = 'motherfkrr@gmail.com';
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        console.log('USER NOT FOUND');
        return;
    }
    const deleted = await prisma.examResult.deleteMany({
        where: {
            studentId: user.id
        }
    });
    console.log('RESET SUCCESS: Deleted ' + deleted.count + ' results for ' + email);
}
main().finally(()=>prisma.$disconnect());

//# sourceMappingURL=reset.js.map