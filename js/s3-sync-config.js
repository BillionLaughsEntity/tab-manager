// S3 Configuration Management
let s3Config = {
    accessKeyId: 'user-xzSSvCVMtbrs',
    secretAccessKey: 'xnNtM8Kbh0v92H6n1WcW5tcRzwm9259s',
    bucketName: 'tab-manager',
    region: 'ru-1',
    filename: 'tab-manager-data.xml',
    endpoint: 'https://s3.buckets.ru'
};

function loadS3Config() {
    const savedConfig = localStorage.getItem('tabManagerS3Config');
    if (savedConfig) {
        s3Config = { ...s3Config, ...JSON.parse(savedConfig) };
    }
    return s3Config;
}

function saveS3Config(config) {
    s3Config = { ...s3Config, ...config };
    localStorage.setItem('tabManagerS3Config', JSON.stringify(s3Config));
    return s3Config;
}

function openS3ConfigModal() {
    const modal = document.getElementById('s3-config-modal');
    const config = loadS3Config();
    
    document.getElementById('s3-access-key').value = config.accessKeyId || '';
    document.getElementById('s3-secret-key').value = config.secretAccessKey || '';
    document.getElementById('s3-bucket-name').value = config.bucketName;
    document.getElementById('s3-region').value = config.region;
    document.getElementById('s3-filename').value = config.filename;
    
    modal.style.display = 'block';
}

function initializeS3Config() {
    loadS3Config();
}