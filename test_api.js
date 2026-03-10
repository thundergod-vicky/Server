async function checkApi() {
  try {
    const res = await fetch('http://localhost:3002/payments/summaries');
    const data = await res.json();
    console.log('API Result:', data);
  } catch (err) {
    console.log('API Error:', err.message);
  }
}
checkApi();
