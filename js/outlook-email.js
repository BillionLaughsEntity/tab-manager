// Temporary debug function
function debugCurrentTabState() {
    console.log('=== DEBUG CURRENT TAB STATE ===');
    console.log('currentWorkbookId:', currentWorkbookId);
    console.log('currentProfileId:', currentProfileId);
    console.log('currentEnvironment:', currentEnvironment);
    console.log('currentTab:', currentTab);
    
    if (currentTab) {
        console.log('Current tab has links:', currentTab.links.length);
    } else {
        console.log('No current tab selected!');
        console.log('Available workbooks:', workbooks);
    }
    console.log('================================');
}


// Outlook Email Functions
function openOutlookEmailModal() {
    debugCurrentTabState(); // Add this line
    // Check if a tab is selected
    if (!currentTab) {
        alert('Please select a tab first before creating an email link.');
        // Optional: Auto-select first available tab
        if (workbooks.length > 0 && workbooks[0].profiles.length > 0) {
            const firstProfile = workbooks[0].profiles[0];
            if (firstProfile.environments.length > 0) {
                const firstEnvironment = firstProfile.environments[0];
                if (firstEnvironment.tabs.length > 0) {
                    currentTab = firstEnvironment.tabs[0];
                    alert('Auto-selected first available tab: ' + currentTab.name);
                }
            }
        }
        if (!currentTab) return;
    }
    
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
    
    // Validate current tab
    if (!currentTab) {
        alert('No tab selected. Please select a tab first.');
        closeOutlookEmailModal();
        return;
    }
    
    // Construct mailto URL
    let mailtoUrl = `mailto:${to}`;
    const params = [];
    
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
    const newLink = {
        id: Date.now().toString(),
        title: linkTitle,
        url: mailtoUrl,
        type: 'email'
    };
    
    currentTab.links.push(newLink);
    saveWorkbooks();
    
    // Use a safer approach to render links
    try {
        if (typeof renderLinks === 'function') {
            renderLinks();
        } else {
            // Fallback: manually update the display
            const linksContainer = document.getElementById('links-container');
            const linksGrid = document.getElementById('links-grid');
            if (linksGrid) {
                const linkElement = createLinkCard(newLink);
                linksGrid.appendChild(linkElement);
            }
        }
    } catch (error) {
        console.error('Error rendering links:', error);
        // At least save the data even if rendering fails
        alert('Email link created successfully! You may need to refresh the view.');
    }
    
    closeOutlookEmailModal();
}

function closeOutlookEmailModal() {
    document.getElementById('outlook-email-modal').style.display = 'none';
}

// Initialize email preview updates
function setupOutlookEmailListeners() {
    const emailInputs = ['email-from', 'email-to', 'email-cc', 'email-subject', 'email-body'];
    emailInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updateEmailPreview);
        }
    });
    
    const createBtn = document.getElementById('create-outlook-email-btn');
    if (createBtn) {
        createBtn.addEventListener('click', openOutlookEmailModal);
    }
    
    const closeBtn = document.getElementById('close-outlook-email-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeOutlookEmailModal);
    }
    
    const saveBtn = document.getElementById('save-outlook-email-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveOutlookEmailLink);
    }
}