require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const session = await prisma.classSession.findFirst({
    where: { title: 'Algebra 102' },
    orderBy: { createdAt: 'desc' }
  });
  console.log("Meeting ID:", session?.meetingId);
  console.log("Session ID:", session?.id);
  
  if (session && session.meetingId) {
     const fetch = require('node-fetch') || globalThis.fetch;
     try {
       const res = await fetch(`http://localhost:3000/zoom/debug-recording/${session.meetingId}`);
       const json = await res.json();
       console.log("Zoom API Debug:", JSON.stringify(json, null, 2));
     } catch (e) {
       console.log("Fetch error:", e);
     }
  } else {
     console.log("No meeting ID for Algebra 102.");
  }
}

main().finally(() => prisma.$disconnect());
