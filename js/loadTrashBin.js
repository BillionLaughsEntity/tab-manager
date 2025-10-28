// Fix trash bin data loading and saving
function loadTrashBin() {
    const savedTrashBin = localStorage.getItem('tabManagerTrashBin');
    if (savedTrashBin) {
        trashBin = JSON.parse(savedTrashBin);
    } else {
        trashBin = [];
    }
}