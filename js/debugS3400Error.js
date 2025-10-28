function debugS3400Error() {
    console.log('=== Debugging S3 400 Error ===');
    
    // Test different endpoints and methods
    const tests = [
        { url: '/s3-proxy/tab-manager/', method: 'GET' },
        { url: '/s3-proxy/tab-manager/', method: 'HEAD' },
        { url: '/s3-proxy/tab-manager/test.txt', method: 'PUT', body: 'test' },
    ];
    
    tests.forEach((test, index) => {
        setTimeout(() => {
            console.log(`Test ${index + 1}: ${test.method} ${test.url}`);
            fetch(test.url, {
                method: test.method,
                body: test.body,
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            .then(response => {
                console.log(`Test ${index + 1} - Status: ${response.status}`);
                return response.text();
            })
            .then(body => {
                console.log(`Test ${index + 1} - Body:`, body.substring(0, 100));
            })
            .catch(error => {
                console.error(`Test ${index + 1} - Error:`, error);
            });
        }, index * 1000);
    });
}

// Run debug
setTimeout(debugS3400Error, 2000);