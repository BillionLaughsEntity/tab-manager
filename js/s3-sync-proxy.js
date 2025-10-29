// S3 Sync with CORS Proxy
const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/'; // Public proxy
// Alternative proxies: 
// - https://api.codetabs.com/v1/proxy?quest=
// - https://corsproxy.io/?

async function uploadToS3WithProxy() {
    try {
        const config = loadS3Config();
        const xmlContent = generateExportXML();
        
        updateSyncStatus('Uploading to S3 via proxy...');
        
        // Use direct HTTP PUT with proxy
        const response = await fetch(`${CORS_PROXY_URL}https://s3.buckets.ru/${config.bucketName}/${config.filename}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/xml',
                'x-amz-acl': 'private'
            },
            body: xmlContent
        });

        if (response.ok) {
            updateSyncStatus('Successfully uploaded to S3 via proxy!', 'success');
            localStorage.setItem('lastS3Upload', new Date().toISOString());
        } else {
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }
        
    } catch (error) {
        console.error('Proxy Upload Error:', error);
        updateSyncStatus(`Upload failed: ${error.message}`, 'error');
    }
}

async function downloadFromS3WithProxy() {
    try {
        const config = loadS3Config();
        
        updateSyncStatus('Downloading from S3 via proxy...');
        
        const response = await fetch(`${CORS_PROXY_URL}https://s3.buckets.ru/${config.bucketName}/${config.filename}`);
        
        if (response.ok) {
            const xmlContent = await response.text();
            importFromXML(xmlContent);
            updateSyncStatus('Successfully downloaded from S3 via proxy!', 'success');
            localStorage.setItem('lastS3Download', new Date().toISOString());
        } else if (response.status === 404) {
            updateSyncStatus('File not found in S3. Upload first?', 'warning');
        } else {
            throw new Error(`Download failed: ${response.status} ${response.statusText}`);
        }
        
    } catch (error) {
        console.error('Proxy Download Error:', error);
        updateSyncStatus(`Download failed: ${error.message}`, 'error');
    }
}

async function testS3ConnectionWithProxy() {
    try {
        const config = loadS3Config();
        
        updateSyncStatus('Testing S3 connection via proxy...');
        
        const response = await fetch(`${CORS_PROXY_URL}https://s3.buckets.ru/${config.bucketName}?list-type=2&max-keys=1`);
        
        if (response.ok) {
            updateSyncStatus('S3 connection successful via proxy!', 'success');
        } else {
            throw new Error(`Connection test failed: ${response.status} ${response.statusText}`);
        }
        
    } catch (error) {
        console.error('Proxy Connection Test Error:', error);
        updateSyncStatus(`Connection failed: ${error.message}`, 'error');
    }
}