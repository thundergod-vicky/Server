
const { Client } = require('pg');
require('dotenv').config();

async function checkEnum() {
  const client = new Client({
    connectionString: "postgresql://postgres:%40SouvikBasu%40627@db.jgsbwdnjeahwlitgfxst.supabase.co:5432/postgres"
  });
  await client.connect();
  const res = await client.query(`
    SELECT enumlabel 
    FROM pg_enum 
    JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
    WHERE pg_type.typname = 'Role';
  `);
  console.log('Roles in DB:', res.rows.map(r => r.enumlabel));
  await client.end();
}

checkEnum().catch(console.error);
