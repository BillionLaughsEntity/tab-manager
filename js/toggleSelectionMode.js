// Toggle selection mode
function toggleSelectionMode() {
    isSelectionMode = !isSelectionMode;
    selectedLinks.clear();
    
    const toggleBtn = document.getElementById('toggle-selection-mode-btn');
    
    if (isSelectionMode) {
        // Add checkboxes to all views
        addCheckboxesToAllViews();
        document.getElementById('bulk-action-bar').classList.add('visible');
        updateBulkSelectionCount();
        
        // Update button text
        toggleBtn.innerHTML = '<i class="fas fa-times"></i>Cancel Selection';
    } else {
        // Remove checkboxes from all views
        removeCheckboxesFromAllViews();
        document.getElementById('bulk-action-bar').classList.remove('visible');
        
        // Update button text
        toggleBtn.innerHTML = '<i class="fas fa-check-square"></i>Select Links';
    }
}