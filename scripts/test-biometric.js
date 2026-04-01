const jwt = require('jsonwebtoken');

const secret = "biometric-integration-secret-key-2025";
const payload = { sub: 'biometric-system' };

const token = jwt.sign(payload, secret);
console.log('Generated Token:', token);

async function testAttendance() {
  const fetch = (await import('node-fetch')).default;
  const url = 'http://localhost:3002/biometrics/attendence-log';
  
  const body = {
    employee_code: "E1023",
    log_datetime: "2025-09-19 08:45:00",
    log_time: "08:45:00",
    downloaded_at: "2025-09-19 08:46:00",
    device_sn: "SN-009128"
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAttendance();
