// Fix permanentlyDeleteFromTrash function
function permanentlyDeleteFromTrash(index) {
    const item = trashBin[index];
    if (!item) return;
    
    if (confirm(`Are you sure you want to permanently delete "${item.title}"? This action cannot be undone.`)) {
        trashBin.splice(index, 1);
        saveTrashBin();
        
        // Refresh trash bin modal
        document.getElementById('trash-bin-modal').style.display = 'none';
        setTimeout(() => {
            openTrashBinModal();
        }, 100);
    }
}