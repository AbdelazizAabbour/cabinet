async function testContactForm() {
    console.log('Starting API Test...');
    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                phone: '123456789',
                message: 'This is a test message.'
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log(' API Test Passed:', data);
        } else {
            console.error(' API Test Failed:', data);
        }
    } catch (error) {
        console.error(' API Test Error:', error.message);
    }
}

testContactForm();
