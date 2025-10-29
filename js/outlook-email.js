// Outlook Email Functions
function openOutlookEmailModal() {
    const modal = document.getElementById('outlook-email-modal');
    modal.style.display = 'block';
    
    // Clear previous inputs
    document.getElementById('email-from').value = '';
    document.getElementById('email-to').value = '';
    document.getElementById('email-cc').value = '';
    document.getElementById('email-subject').value = '';
    document.getElementById('email-body').value = '';
    
    updateEmailPreview();
}

function updateEmailPreview() {
    const to = document.getElementById('email-to').value || 'recipient@example.com';
    const from = document.getElementById('email-from').value;
    const cc = document.getElementById('email-cc').value;
    const subject = document.getElementById('email-subject').value;
    const body = document.getElementById('email-body').value;
    
    let mailtoUrl = `mailto:${to}`;
    const params = [];
    
    if (from) params.push(`from=${encodeURIComponent(from)}`);
    if (cc) params.push(`cc=${encodeURIComponent(cc)}`);
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    
    if (params.length > 0) {
        mailtoUrl += '?' + params.join('&');
    }
    
    document.getElementById('email-preview-text').textContent = mailtoUrl;
}

function saveOutlookEmailLink() {
    const to = document.getElementById('email-to').value;
    const from = document.getElementById('email-from').value;
    const cc = document.getElementById('email-cc').value;
    const subject = document.getElementById('email-subject').value;
    const body = document.getElementById('email-body').value;
    
    // Validate required fields
    if (!to.trim()) {
        alert('"To" field is required');
        return;
    }
    
    // Construct mailto URL
    let mailtoUrl = `mailto:${to}`;
    const params = [];
    
    if (from) params.push(`from=${encodeURIComponent(from)}`);
    if (cc) params.push(`cc=${encodeURIComponent(cc)}`);
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    
    if (params.length > 0) {
        mailtoUrl += '?' + params.join('&');
    }
    
    // Create link title
    const linkTitle = subject 
        ? `Email: ${subject.substring(0, 30)}${subject.length > 30 ? '...' : ''}`
        : `Email to: ${to.split(';')[0].substring(0, 20)}...`;
    
    // Add the link to current tab
    if (currentTab) {
        const newLink = {
            id: Date.now().toString(),
            title: linkTitle,
            url: mailtoUrl,
            type: 'email'
        };
        
        currentTab.links.push(newLink);
        saveWorkbooks();
        renderLinks();
        closeOutlookEmailModal();
        
        // Show success message
        alert('Outlook email link created successfully! Click it to open Outlook with pre-filled email.');
    } else {
        alert('Please select a tab first');
    }
}

function closeOutlookEmailModal() {
    document.getElementById('outlook-email-modal').style.display = 'none';
}

// Initialize email preview updates
function setupOutlookEmailListeners() {
    const emailInputs = ['email-from', 'email-to', 'email-cc', 'email-subject', 'email-body'];
    emailInputs.forEach(id => {
        document.getElementById(id).addEventListener('input', updateEmailPreview);
    });
    
    document.getElementById('create-outlook-email-btn').addEventListener('click', openOutlookEmailModal);
    document.getElementById('close-outlook-email-modal').addEventListener('click', closeOutlookEmailModal);
    document.getElementById('save-outlook-email-btn').addEventListener('click', saveOutlookEmailLink);
}