const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const secret = process.env.BIOMETRIC_API_KEY_SECRET || "biometric-integration-secret-key-2025";

// Payload with a identifier for the biometric system
const payload = { 
  sub: 'biometric-system',
  description: 'Adhyayan Biometric Integration Key'
};

// Sign the token WITHOUT an expiration date (making it an API Key)
const token = jwt.sign(payload, secret);

console.log('\n' + '='.repeat(50));
console.log('ADHYAYAN BIOMETRIC API KEY GENERATED');
console.log('='.repeat(50));
console.log('\nYour API Key (Bearer Token):\n');
console.log(token);
console.log('\n' + '='.repeat(50));
console.log('INSTRUCTIONS:');
console.log('1. Copy the token above.');
console.log('2. Provide it to your biometric vendor.');
console.log('3. They must include it in the "Authorization" header:');
console.log('   Authorization: Bearer <TOKEN_HERE>');
console.log('='.repeat(50) + '\n');
