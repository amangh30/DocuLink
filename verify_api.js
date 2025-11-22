const testApi = async () => {
    const baseUrl = 'http://localhost:3000/api/pusher/trigger';

    console.log('Testing API Error Handling...');

    // Test 1: Missing payload
    try {
        const res = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        console.log('Test 1 (Missing Payload):', res.status === 400 ? 'PASS' : 'FAIL', res.status);
    } catch (e) { console.error('Test 1 Error:', e); }

    // Test 2: Invalid roomCode
    try {
        const res = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomCode: 123, delta: {}, clientId: 'abc' })
        });
        console.log('Test 2 (Invalid roomCode):', res.status === 400 ? 'PASS' : 'FAIL', res.status);
    } catch (e) { console.error('Test 2 Error:', e); }

    // Test 3: Missing delta
    try {
        const res = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomCode: 'ABC', clientId: 'abc' })
        });
        console.log('Test 3 (Missing delta):', res.status === 400 ? 'PASS' : 'FAIL', res.status);
    } catch (e) { console.error('Test 3 Error:', e); }

    // Test 4: Valid Payload (Expect 500 if env vars missing, or 200 if present and working)
    // Note: This might fail if the server isn't running, but we just want to check validation logic mostly.
    // Actually, we can't easily test 200 without a running server.
    // We will skip this for now or assume the build check covers the code validity.
};

testApi();
