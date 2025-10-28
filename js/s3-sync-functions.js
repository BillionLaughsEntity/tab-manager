// Enhanced S3 sync functions with proper proxy handling
let s3Config = {
    accessKeyId: '',
    secretAccessKey: '',
    bucketName: 'tab-manager',
    filename: 'tab-manager-data.xml',
    region: 'ru-1'
};

// Initialize S3 config from localStorage
function initializeS3Config() {
    const savedConfig = localStorage.getItem('s3Config');
    if (savedConfig) {
        Object.assign(s3Config, JSON.parse(savedConfig));
    }
}

// Test S3 connection using proxy
function testS3Connection() {
    return new Promise((resolve, reject) => {
        console.log('Testing S3 connection via proxy...');
        
        // Use the proxy endpoint
        fetch('/s3-download', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xml'
            }
        })
        .then(response => {
            console.log('Test connection response status:', response.status);
            
            if (response.status === 200 || response.status === 404) {
                // 200 = file exists, 404 = file doesn't exist but connection works
                resolve({ success: true, status: response.status });
            } else {
                resolve({ 
                    success: false, 
                    status: response.status,
                    message: `Server responded with status: ${response.status}`
                });
            }
        })
        .catch(error => {
            console.error('Test connection error:', error);
            resolve({ 
                success: false, 
                message: `Network error: ${error.message}` 
            });
        });
    });
}

// Upload to S3 using proxy
function uploadToS3(data) {
    return new Promise((resolve, reject) => {
        console.log('Uploading to S3 via proxy...');
        
        fetch('/s3-upload', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/xml',
                // Add S3-specific headers that might be required
                'x-amz-acl': 'private'
            },
            body: data
        })
        .then(response => {
            console.log('Upload response status:', response.status, response.statusText);
            
            if (response.ok) {
                resolve({ success: true, message: 'Upload successful' });
            } else {
                // Try to get error details from response
                return response.text().then(errorText => {
                    throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
                });
            }
        })
        .catch(error => {
            console.error('Upload error:', error);
            reject(error);
        });
    });
}

// Download from S3 using proxy
function downloadFromS3() {
    return new Promise((resolve, reject) => {
        console.log('Downloading from S3 via proxy...');
        
        fetch('/s3-download', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xml'
            }
        })
        .then(response => {
            console.log('Download response status:', response.status);
            
            if (response.ok) {
                return response.text();
            } else if (response.status === 404) {
                // File doesn't exist yet - this is OK
                resolve(null);
            } else {
                throw new Error(`Download failed: ${response.status} ${response.statusText}`);
            }
        })
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            console.error('Download error:', error);
            reject(error);
        });
    });
}

// Enhanced configuration function
function configureS3(accessKey, secretKey, bucketName, region, filename) {
    s3Config.accessKeyId = accessKey;
    s3Config.secretAccessKey = secretKey;
    s3Config.bucketName = bucketName || 'tab-manager';
    s3Config.region = region || 'ru-1';
    s3Config.filename = filename || 'tab-manager-data.xml';
    
    // Save to localStorage
    localStorage.setItem('s3Config', JSON.stringify(s3Config));
    
    return testS3Connection();
}

// Initialize on load
initializeS3Config();