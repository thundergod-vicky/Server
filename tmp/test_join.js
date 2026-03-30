const fetch = require('node-fetch');

async function testJoin() {
  const sessionId = 'cmncnx51o00018s23g1z4owwa';
  const url = `http://localhost:3002/webinars/join/${sessionId}`;
  
  // Need a valid token. I'll take one from the screenshot or previous messages if possible.
  // Actually, I'll just check if I can hit the endpoint and get a 401/403 or 500.
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization missing - should be 401
    }
  });
  
  console.log('Status:', response.status);
  const data = await response.json();
  console.log('Response:', data);
}

testJoin().catch(console.error);
