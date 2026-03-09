
const { Client } = require('pg');
require('dotenv').config();

async function checkIds() {
  const client = new Client({
    connectionString: "postgresql://postgres.jgsbwdnjeahwlitgfxst:%40SouvikBasu%40627@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&statement_cache_size=0"
  });
  await client.connect();
  const res = await client.query(`
    SELECT "enrollmentId", role 
    FROM "User" 
    ORDER BY "enrollmentId" DESC;
  `);
  console.log('Enrollment IDs in DB:', res.rows);
  await client.end();
}

checkIds().catch(console.error);
