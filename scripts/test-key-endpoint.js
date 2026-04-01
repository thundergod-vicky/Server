async function testGenerateKey() {
  const baseUrl = 'http://localhost:3002';
  
  console.log('--- Testing Biometric Key Generation ---');
  
  try {
    // 1. Unauthenticated request
    console.log('1. Trying unauthenticated request...');
    const response = await fetch(`${baseUrl}/biometrics/generate-key`);
    console.log(`Expected result: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.log(`Error during fetch: ${error.message}`);
  }

  console.log('\n--- Verification complete. ---');
}

testGenerateKey();
