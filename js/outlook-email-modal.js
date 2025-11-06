/**
 * Outlook Email Modal - Creates and manages the Outlook email modal
 */

function createOutlookEmailModal() {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'outlook-email-modal';
    modal.style.display = 'none';
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Create Outlook Email Link</h3>
                <span class="close-modal">&times;</span>
            </div>
            <div class="form-group">
                <label for="email-from">From (optional - usually auto-filled by Outlook)</label>
                <input type="email" id="email-from" placeholder="sender@example.com">
            </div>
            <div class="form-group">
                <label for="email-to">To (required, separate multiple with semicolons)</label>
                <input type="text" id="email-to" placeholder="recipient1@example.com; recipient2@example.com" required>
            </div>
            <div class="form-group">
                <label for="email-cc">CC (optional, separate multiple with semicolons)</label>
                <input type="text" id="email-cc" placeholder="cc1@example.com; cc2@example.com">
            </div>
            <div class="form-group">
                <label for="email-subject">Subject (optional)</label>
                <input type="text" id="email-subject" placeholder="Email subject">
            </div>
            <div class="form-group">
                <label for="email-body">Body (optional)</label>
                <textarea id="email-body" placeholder="Email body content" rows="4"></textarea>
            </div>
            <div class="email-preview" id="email-preview">
                <strong>Preview:</strong> <span id="email-preview-text">mailto:...</span>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" id="close-outlook-email-modal">Cancel</button>
                <button class="modal-btn modal-btn-primary" id="save-outlook-email-btn">Create Email Link</button>
            </div>
        </div>
    `;
    
    // Add to document body
    document.body.appendChild(modal);
    
    return modal;
}

/**
 * Initialize Outlook Email Modal
 */
function initOutlookEmailModal() {
    // Create the modal if it doesn't exist
    let modal = document.getElementById('outlook-email-modal');
    if (!modal) {
        modal = createOutlookEmailModal();
    }
    
    // Setup event listeners for the modal
    setupOutlookEmailModalListeners();
    
    return modal;
}

/**
 * Setup event listeners for Outlook Email Modal
 */
function setupOutlookEmailModalListeners() {
    const modal = document.getElementById('outlook-email-modal');
    if (!modal) return;
    
    // Close modal events
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('#close-outlook-email-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeOutlookEmailModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeOutlookEmailModal);
    }
    
    // Save button event
    const saveBtn = modal.querySelector('#save-outlook-email-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveOutlookEmailLink);
    }
    
    // Input change events for live preview
    const inputs = ['email-from', 'email-to', 'email-cc', 'email-subject', 'email-body'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', updateEmailPreview);
        }
    });
}

/**
 * Open Outlook Email Modal
 */
function openOutlookEmailModal() {
    const modal = document.getElementById('outlook-email-modal');
    if (!modal) {
        console.error('Outlook email modal not found');
        return;
    }
    
    // Reset form
    document.getElementById('email-from').value = '';
    document.getElementById('email-to').value = '';
    document.getElementById('email-cc').value = '';
    document.getElementById('email-subject').value = '';
    document.getElementById('email-body').value = '';
    
    // Update preview
    updateEmailPreview();
    
    // Show modal
    modal.style.display = 'flex';
    
    // Focus on first input
    setTimeout(() => {
        document.getElementById('email-to').focus();
    }, 100);
}

/**
 * Close Outlook Email Modal
 */
function closeOutlookEmailModal() {
    const modal = document.getElementById('outlook-email-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Make functions globally available
window.createOutlookEmailModal = createOutlookEmailModal;
window.initOutlookEmailModal = initOutlookEmailModal;
window.openOutlookEmailModal = openOutlookEmailModal;
window.closeOutlookEmailModal = closeOutlookEmailModal;