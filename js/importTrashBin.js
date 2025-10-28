// Helper function to import trash bin
function importTrashBin(trashBinElement) {
    const newTrashBin = [];
    const trashItemElements = trashBinElement.getElementsByTagName('trashItem');
    
    for (let i = 0; i < trashItemElements.length; i++) {
        const itemElement = trashItemElements[i];
        const trashedItem = createTrashItem(itemElement, i);
        
        if (trashedItem) {
            newTrashBin.push(trashedItem);
        }
    }
    
    return newTrashBin;
}