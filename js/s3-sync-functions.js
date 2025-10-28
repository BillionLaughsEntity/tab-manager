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

// Enhanced S3 functions with proper authentication
function uploadToS3(data) {
    return new Promise((resolve, reject) => {
        console.log('Uploading to S3...');
        
        // Create a simple form-based upload as fallback
        const formData = new FormData();
        const blob = new Blob([data], { type: 'application/xml' });
        formData.append('file', blob, 'tab-manager-data.xml');
        
        // Try multiple approaches
        attemptUpload(data)
            .then(resolve)
            .catch(error => {
                console.log('Primary upload failed, trying fallback...', error);
                fallbackUpload(data).then(resolve).catch(reject);
            });
    });
}

// Primary upload attempt
function attemptUpload(data) {
    return fetch('/s3-proxy/tab-manager/tab-manager-data.xml', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/xml',
        },
        body: data
    })
    .then(response => {
        console.log('Upload response:', response.status, response.statusText);
        if (response.ok) {
            return { success: true, message: 'Upload successful' };
        } else {
            return response.text().then(errorText => {
                throw new Error(`Upload failed: ${response.status} - ${errorText}`);
            });
        }
    });
}

// Fallback upload with different approach
function fallbackUpload(data) {
    // Try POST instead of PUT
    return fetch('/s3-proxy/tab-manager/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `file=${encodeURIComponent(data)}&filename=tab-manager-data.xml`
    })
    .then(response => {
        if (response.ok) {
            return { success: true, message: 'Upload successful (fallback)' };
        } else {
            throw new Error(`Fallback upload failed: ${response.status}`);
        }
    });
}

// Enhanced download function
function downloadFromS3() {
    return fetch('/s3-proxy/tab-manager/tab-manager-data.xml', {
        method: 'GET',
        headers: {
            'Accept': 'application/xml, text/xml, */*'
        }
    })
    .then(response => {
        console.log('Download response:', response.status);
        if (response.ok) {
            return response.text();
        } else if (response.status === 404) {
            return null; // File doesn't exist yet
        } else {
            return response.text().then(errorText => {
                throw new Error(`Download failed: ${response.status} - ${errorText}`);
            });
        }
    });
}

// Enhanced test function
function testS3Connection() {
    return new Promise((resolve) => {
        console.log('Testing S3 connection...');
        
        // Just test if we can reach the S3 endpoint
        fetch('/s3-proxy/tab-manager/', {
            method: 'HEAD'
        })
        .then(response => {
            console.log('Connection test response:', response.status);
            resolve({
                success: response.status !== 400 && response.status !== 403,
                status: response.status,
                message: `S3 endpoint responded with status: ${response.status}`
            });
        })
        .catch(error => {
            console.error('Connection test error:', error);
            resolve({
                success: false,
                message: `Connection failed: ${error.message}`
            });
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

// Add this function to s3-sync-functions.js
function openS3SyncModal() {
    console.log('Opening S3 Sync Modal...');
    const modal = document.getElementById('s3-sync-modal');
    if (modal) {
        modal.style.display = 'block';
        
        // Update sync status
        const syncStatus = document.getElementById('sync-status');
        if (syncStatus) {
            syncStatus.innerHTML = '<p>Sync your data with S3 storage</p>';
        }
    } else {
        console.error('S3 Sync Modal not found');
    }
}

// Also add close function
function closeS3SyncModal() {
    const modal = document.getElementById('s3-sync-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialize on load
initializeS3Config();