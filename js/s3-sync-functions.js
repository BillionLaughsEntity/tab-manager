// S3 Sync Functions
function initializeAWS() {
    const config = loadS3Config();
    
    if (!config.accessKeyId || !config.secretAccessKey) {
        throw new Error('S3 configuration incomplete. Please configure access keys.');
    }

    AWS.config.update({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        region: config.region
    });

    const s3 = new AWS.S3({
        endpoint: config.endpoint,
        s3ForcePathStyle: true,
        signatureVersion: 'v4'
    });

    return s3;
}

// Updated upload function using proxy
function uploadToS3(data) {
    // Use Netlify proxy instead of direct S3
    const proxyUrl = `/s3-proxy/tab-manager/tab-manager-data.xml`;
    
    return fetch(proxyUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/xml',
        },
        body: data
    })
    .then(response => {
        if (!response.ok) throw new Error('Upload failed');
        return response;
    });
}


// Updated download function
function downloadFromS3() {
    const proxyUrl = `/s3-proxy/tab-manager/tab-manager-data.xml`;
    
    return fetch(proxyUrl)
    .then(response => {
        if (!response.ok) throw new Error('Download failed');
        return response.text();
    });
}

async function testS3Connection() {
    try {
        const s3 = initializeAWS();
        const config = loadS3Config();
        
        updateSyncStatus('Testing S3 connection...');
        
        const params = {
            Bucket: config.bucketName,
            MaxKeys: 1
        };

        await s3.listObjectsV2(params).promise();
        updateSyncStatus('S3 connection successful!', 'success');
        
    } catch (error) {
        console.error('S3 Connection Test Error:', error);
        updateSyncStatus(`Connection failed: ${error.message}`, 'error');
    }
}

function updateSyncStatus(message, type = 'info') {
    const statusElement = document.getElementById('sync-status');
    statusElement.innerHTML = `<p class="sync-status-${type}">${message}</p>`;
    
    // Add last sync timestamps if available
    const lastUpload = localStorage.getItem('lastS3Upload');
    const lastDownload = localStorage.getItem('lastS3Download');
    
    if (lastUpload) {
        statusElement.innerHTML += `<small>Last upload: ${new Date(lastUpload).toLocaleString()}</small><br>`;
    }
    if (lastDownload) {
        statusElement.innerHTML += `<small>Last download: ${new Date(lastDownload).toLocaleString()}</small>`;
    }
}

function openS3SyncModal() {
    const modal = document.getElementById('s3-sync-modal');
    updateSyncStatus('Ready to sync with S3 storage');
    modal.style.display = 'block';
}

// Helper function to generate XML for export (reuse your existing export function)
function generateExportXML() {
    const exportXmlContent = document.getElementById('export-xml-content');
    // Trigger XML generation without showing modal
    const originalDisplay = exportModal.style.display;
    exportModal.style.display = 'none';
    
    // Use your existing export functionality
    if (typeof generateExportData === 'function') {
        return generateExportData();
    } else {
        // Fallback: use the existing export textarea content
        exportBtn.click(); // This will populate the export textarea
        return exportXmlContent.value;
    }
}