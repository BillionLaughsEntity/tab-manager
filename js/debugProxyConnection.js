// Debug function to test the proxy
function debugProxyConnection() {
    console.log('=== DEBUG PROXY CONNECTION ===');
    
    // Test 1: Simple GET request
    fetch('/s3-download')
        .then(response => {
            console.log('GET Test - Status:', response.status);
            console.log('GET Test - Headers:', Object.fromEntries(response.headers.entries()));
            return response.text();
        })
        .then(data => {
            console.log('GET Test - Data length:', data?.length);
        })
        .catch(error => {
            console.error('GET Test - Error:', error);
        });
    
    // Test 2: Simple PUT request
    const testData = '<?xml version="1.0"?><test>hello</test>';
    fetch('/s3-upload', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/xml'
        },
        body: testData
    })
    .then(response => {
        console.log('PUT Test - Status:', response.status);
        console.log('PUT Test - Status Text:', response.statusText);
        return response.text();
    })
    .then(data => {
        console.log('PUT Test - Response:', data);
    })
    .catch(error => {
        console.error('PUT Test - Error:', error);
    });
}

// Run debug after page loads
setTimeout(debugProxyConnection, 2000);