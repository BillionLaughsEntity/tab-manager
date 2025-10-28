// Update the deleteLink function to use trash bin
function deleteLink(link, tab) {
    if (!link || !tab) return;
    
    // Create a trash item with all necessary information for restoration
    const trashItem = {
        id: 'trash-' + Date.now(),
        type: 'link',
        originalId: link.id,
        data: link,
        parentTab: {
            id: tab.id,
            name: tab.name
        },
        parentEnvironment: currentEnvironment ? {
            id: currentEnvironment.id,
            name: currentEnvironment.name
        } : null,
        parentProfile: getCurrentProfile() ? {
            id: getCurrentProfile().id,
            name: getCurrentProfile().name
        } : null,
        parentWorkbook: getCurrentWorkbook() ? {
            id: getCurrentWorkbook().id,
            name: getCurrentWorkbook().name
        } : null,
        deletedAt: new Date().toISOString()
    };
    
    // Add to trash bin
    trashBin.push(trashItem);
    saveTrashBin();
    
    // Remove from current tab
    tab.links = tab.links.filter(l => l.id !== link.id);
    
    // Save workbooks and refresh UI
    saveWorkbooks();
    renderLinks(tab);
    
    // Show confirmation message
    // alert(`"${link.title}" moved to trash bin`);
}