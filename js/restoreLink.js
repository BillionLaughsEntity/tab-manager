// Add this function to restore a link from trash bin
function restoreLink(trashedLink) {
    // Find the original tab
    const profile = profiles.find(p => p.id === trashedLink.origin.profileId);
    if (!profile) {
        alert('Original profile not found. The link cannot be restored.');
        return;
    }

    const environment = profile.environments?.find(env => env.id === trashedLink.origin.environmentId);
    if (!environment) {
        alert('Original environment not found. The link cannot be restored.');
        return;
    }

    const tab = environment.tabs?.find(t => t.id === trashedLink.origin.tabId);
    if (!tab) {
        alert('Original tab not found. The link cannot be restored.');
        return;
    }

    // Remove the origin info and add back to the tab
    const { origin, deletedAt, ...restoredLink } = trashedLink;
    tab.links.push(restoredLink);

    // Remove from trash bin
    trashBin = trashBin.filter(item => item.id !== trashedLink.id);
    saveTrashBin();

    saveWorkbooks();
    renderTrashBinModal();
    
    // If we're currently viewing the tab where the link was restored, refresh the view
    if (currentTab && currentTab.id === tab.id) {
        renderLinks(currentTab);
    }
}