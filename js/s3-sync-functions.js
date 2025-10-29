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

async function uploadToS3() {
    try {
        const s3 = initializeAWS();
        const config = loadS3Config();
        
        // Generate XML from current data
        const xmlContent = generateExportXML();
        
        const params = {
            Bucket: config.bucketName,
            Key: config.filename,
            Body: xmlContent,
            ContentType: 'application/xml'
        };

        updateSyncStatus('Uploading to S3...');
        
        await s3.upload(params).promise();
        updateSyncStatus('Successfully uploaded to S3!', 'success');
        
        // Save upload timestamp
        localStorage.setItem('lastS3Upload', new Date().toISOString());
        
    } catch (error) {
        console.error('S3 Upload Error:', error);
        updateSyncStatus(`Upload failed: ${error.message}`, 'error');
    }
}

async function downloadFromS3() {
    try {
        const s3 = initializeAWS();
        const config = loadS3Config();
        
        const params = {
            Bucket: config.bucketName,
            Key: config.filename
        };

        updateSyncStatus('Downloading from S3...');
        
        const data = await s3.getObject(params).promise();
        const xmlContent = data.Body.toString('utf-8');
        
        // Import the XML data
        importFromXML(xmlContent);
        updateSyncStatus('Successfully downloaded from S3!', 'success');
        
        // Save download timestamp
        localStorage.setItem('lastS3Download', new Date().toISOString());
        
    } catch (error) {
        console.error('S3 Download Error:', error);
        if (error.code === 'NoSuchKey') {
            updateSyncStatus('File not found in S3. Upload first?', 'warning');
        } else {
            updateSyncStatus(`Download failed: ${error.message}`, 'error');
        }
    }
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