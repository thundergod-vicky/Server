const { Client } = require('pg');

const connectionString = "postgresql://postgres:@SouvikBasu@627@db.jgsbwdnjeahwlitgfxst.supabase.co:5432/postgres";

const client = new Client({
  connectionString: connectionString,
});

async function main() {
  try {
    await client.connect();
    const res = await client.query('SELECT email, role FROM "User"');
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
