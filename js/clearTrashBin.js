// Fix clearTrashBin function
function clearTrashBin() {
    if (trashBin.length === 0) {
        alert('Trash bin is already empty');
        return;
    }
    
    if (confirm(`Are you sure you want to permanently delete all ${trashBin.length} items from the trash bin? This action cannot be undone.`)) {
        trashBin = [];
        saveTrashBin();
        
        // Refresh trash bin modal
        document.getElementById('trash-bin-modal').style.display = 'none';
        setTimeout(() => {
            openTrashBinModal();
        }, 100);
        
        alert('Trash bin emptied successfully');
    }
}
