// Setup event listeners for modular modals
function setupModalEventListeners() {
    console.log('Setting up modal event listeners...');
    
    // Add event listeners for the reorder workbooks modal
    const closeReorderWorkbooksModal = document.getElementById('close-reorder-workbooks-modal');
    const saveReorderWorkbooksBtn = document.getElementById('save-reorder-workbooks-btn');
    
    if (closeReorderWorkbooksModal) {
        closeReorderWorkbooksModal.addEventListener('click', function() {
            const modal = document.getElementById('reorder-workbooks-modal');
            if (modal) modal.style.display = 'none';
        });
    }
    
    if (saveReorderWorkbooksBtn) {
        saveReorderWorkbooksBtn.addEventListener('click', function() {
            // This should call your existing saveReorderedWorkbooks function
            if (typeof saveReorderedWorkbooks === 'function') {
                saveReorderedWorkbooks();
            }
        });
    }
    
    // Add close event for the modal background
    const reorderWorkbooksModal = document.getElementById('reorder-workbooks-modal');
    if (reorderWorkbooksModal) {
        reorderWorkbooksModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
        
        // Close button event
        const closeBtn = reorderWorkbooksModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                reorderWorkbooksModal.style.display = 'none';
            });
        }
    }
}