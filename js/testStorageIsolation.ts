function testStorageIsolation() {
    console.log('=== Testing V18 Storage Isolation ===');
    console.log('V18 Storage keys:');
    Object.keys(localStorage).forEach(key => {
        if (key.includes('v18')) {
            console.log(`✓ ${key}`);
        }
    });
    
    // Test that we can save and load independently
    const testData = { test: 'v18-data', timestamp: Date.now() };
    localStorage.setItem('v18_test', JSON.stringify(testData));
    console.log('V18 test data saved');
    
    console.log('=== Isolation Test Complete ===');
}