"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _client = require("@prisma/client");
const prisma = new _client.PrismaClient();
async function main() {
    const email = 'motherfkrr@gmail.com';
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        console.error('User not found');
        return;
    }
    const result = await prisma.examResult.deleteMany({
        where: {
            studentId: user.id
        }
    });
    console.log('Successfully removed results for ' + email);
}
main().catch((e)=>{
    console.error(e);
    process.exit(1);
}).finally(async ()=>{
    await prisma.$disconnect();
});

//# sourceMappingURL=reset-user.js.map