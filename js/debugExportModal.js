// Temporary debug function for export modal
function debugExportModal() {
    console.log('=== DEBUG EXPORT MODAL ===');
    console.log('Export button exists:', !!document.getElementById('export-btn'));
    console.log('Export modal exists:', !!document.getElementById('export-modal'));
    console.log('openExportModal function exists:', typeof openExportModal);
    
    // Test if event listener is attached
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        console.log('Export button onclick:', exportBtn.onclick);
    }
    
    // Manually try to open modal
    const modal = document.getElementById('export-modal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Manually opened modal');
    }
}

// Call this in console to test
// debugExportModal();