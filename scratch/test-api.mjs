// Test API using native fetch
async function runTests() {
  const url = 'http://localhost:3000/api/teklif';
  
  console.log('=== TEST 1: Valid Post Payload ===');
  const res1 = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Ahmet Yilmaz',
      phone: '5321234567',
      fromDistrict: 'Seyhan',
      toDistrict: 'Cukurova',
      rooms: '3+1',
      elevator: 'evet',
      website: ''
    })
  });
  console.log('Status:', res1.status);
  console.log('Response:', await res1.json());
  console.log();

  console.log('=== TEST 2: Invalid Phone Payload ===');
  const res2 = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Ahmet Yilmaz',
      phone: '12345',
      fromDistrict: 'Seyhan',
      toDistrict: 'Cukurova',
      rooms: '3+1',
      elevator: 'evet',
      website: ''
    })
  });
  console.log('Status:', res2.status);
  console.log('Response:', await res2.json());
  console.log();

  console.log('=== TEST 3: Honeypot Bot Protection Payload ===');
  const res3 = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Ahmet Yilmaz',
      phone: '5321234567',
      fromDistrict: 'Seyhan',
      toDistrict: 'Cukurova',
      rooms: '3+1',
      elevator: 'evet',
      website: 'some-bot-value'
    })
  });
  console.log('Status:', res3.status);
  console.log('Response:', await res3.json());
  console.log();

  console.log('=== TEST 4: Rate Limiting (Sending multiple requests to exceed limit) ===');
  // We already sent 2 successful/honeypot requests in this run. Let's send more.
  for (let i = 1; i <= 3; i++) {
    console.log(`Sending request #${i + 2}...`);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Rate Limit Test',
        phone: '5321234567',
        fromDistrict: 'Seyhan',
        toDistrict: 'Cukurova',
        rooms: '3+1',
        elevator: 'evet',
        website: ''
      })
    });
    console.log(`Request #${i + 2} Status:`, res.status);
    console.log(`Request #${i + 2} Response:`, await res.json());
  }
}

runTests().catch(err => {
  console.error('Error running API test:', err);
});
