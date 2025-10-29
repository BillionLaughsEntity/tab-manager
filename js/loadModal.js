// Load modal from external file
async function loadModal(modalPath) {
    try {
        const response = await fetch(modalPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const modalHTML = await response.text();
        
        // Create a temporary container
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = modalHTML;
        const modalElement = tempDiv.firstElementChild;
        
        // Insert before the first script tag
        const firstScript = document.querySelector('script');
        document.body.insertBefore(modalElement, firstScript);
        
        console.log(`Successfully loaded modal: ${modalPath}`);
        return modalElement;
    } catch (error) {
        console.error(`Error loading modal ${modalPath}:`, error);
        // Create a fallback modal so the app doesn't break
        return createFallbackModal();
    }
}

// Fallback modal in case loading fails
function createFallbackModal() {
    const fallbackModal = document.createElement('div');
    fallbackModal.className = 'modal';
    fallbackModal.id = 'reorder-workbooks-modal';
    fallbackModal.innerHTML = `
        <div class="reorder-links-modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Reorder Workbooks</h3>
                <span class="close-modal">&times;</span>
            </div>
            <p>Change the order of workbooks:</p>
            <div class="reorder-links-list" id="reorder-workbooks-list">
                <!-- Workbooks will be populated here -->
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn-secondary" id="close-reorder-workbooks-modal">Cancel</button>
                <button class="modal-btn modal-btn-primary" id="save-reorder-workbooks-btn">Save Order</button>
            </div>
        </div>
    `;
    
    const firstScript = document.querySelector('script');
    document.body.insertBefore(fallbackModal, firstScript);
    
    return fallbackModal;
}