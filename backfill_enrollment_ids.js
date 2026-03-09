/**
 * One-time backfill script: Fix enrollment IDs for all users whose
 * enrollmentId prefix doesn't match their current role.
 */

const { Client } = require('pg');
require('dotenv').config();

const DIRECT_URL = "postgresql://postgres:%40SouvikBasu%40627@db.jgsbwdnjeahwlitgfxst.supabase.co:5432/postgres";

const prefixMap = {
  STUDENT: 'STUD',
  TEACHER: 'TEAC',
  PARENT: 'PARE',
  ADMIN: 'ADMI',
  ACADEMIC_OPERATIONS: 'ACAD',
  ACCOUNTS: 'ACCT',
};

async function generateEnrollmentId(client, role, excludeId) {
  const prefix = prefixMap[role] || 'USER';
  const currentYear = new Date().getFullYear().toString().slice(-2);

  const res = await client.query(
    `SELECT "enrollmentId" FROM "User" WHERE "enrollmentId" LIKE $1 AND id != $2`,
    [`${prefix}%`, excludeId]
  );

  let maxSerial = 0;
  for (const row of res.rows) {
    const match = row.enrollmentId?.match(/(\d{4})\//);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxSerial) maxSerial = num;
    }
  }

  const serial = (maxSerial + 1).toString().padStart(4, '0');
  return `${prefix}-${serial}/${currentYear}`;
}

async function backfill() {
  const client = new Client({ connectionString: DIRECT_URL });
  await client.connect();

  const { rows: users } = await client.query(`SELECT id, role, "enrollmentId" FROM "User"`);
  let fixed = 0;

  for (const user of users) {
    const expectedPrefix = prefixMap[user.role] || 'USER';
    const currentId = user.enrollmentId || '';
    const hasCorrectPrefix = currentId.startsWith(expectedPrefix + '-');

    if (!hasCorrectPrefix) {
      const newId = await generateEnrollmentId(client, user.role, user.id);
      await client.query(`UPDATE "User" SET "enrollmentId" = $1 WHERE id = $2`, [newId, user.id]);
      console.log(`Fixed: ${user.role} (${user.id.slice(0, 8)}) → ${currentId} → ${newId}`);
      fixed++;
    }
  }

  if (fixed === 0) {
    console.log('✅ All enrollment IDs already match their roles!');
  } else {
    console.log(`\n✅ Fixed ${fixed} enrollment ID(s).`);
  }

  await client.end();
}

backfill().catch((err) => {
  console.error('❌ Backfill failed:', err.message);
  process.exit(1);
});
