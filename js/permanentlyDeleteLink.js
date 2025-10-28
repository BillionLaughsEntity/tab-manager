// Add this function to permanently delete a link from trash bin
function permanentlyDeleteLink(trashedLink) {
    if (confirm('Are you sure you want to permanently delete this link? This action cannot be undone.')) {
        trashBin = trashBin.filter(item => item.id !== trashedLink.id);
        saveTrashBin();
        renderTrashBinModal();
    }
}