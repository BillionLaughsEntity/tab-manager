// Fix restoreFromTrash function
function restoreFromTrash(index) {
    const item = trashBin[index];
    if (!item) return;
    
    // Find the destination tab
    let destinationTab = null;
    let destinationEnvironment = null;
    let destinationProfile = null;
    let destinationWorkbook = null;
    
    // Try to find the original location
    workbooks.forEach(workbook => {
        if (workbook.id === item.origin.workbookId) {
            destinationWorkbook = workbook;
            workbook.profiles.forEach(profile => {
                if (profile.id === item.origin.profileId) {
                    destinationProfile = profile;
                    profile.environments.forEach(environment => {
                        if (environment.id === item.origin.environmentId) {
                            destinationEnvironment = environment;
                            environment.tabs.forEach(tab => {
                                if (tab.id === item.origin.tabId) {
                                    destinationTab = tab;
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    
    // If original location not found, use current location
    if (!destinationTab) {
        destinationWorkbook = getCurrentWorkbook();
        destinationProfile = getCurrentProfile();
        destinationEnvironment = currentEnvironment;
        destinationTab = currentTab;
    }
    
    // Create the restored link
    const restoredLink = {
        id: 'link-' + Date.now(), // New ID since original is lost
        title: item.title,
        url: item.url,
        isMultiLink: item.isMultiLink,
        isSearchLink: item.isSearchLink,
        urls: item.urls || [],
        linkCount: item.linkCount || 1
    };
    
    // Add to destination tab
    if (!destinationTab.links) {
        destinationTab.links = [];
    }
    destinationTab.links.push(restoredLink);
    
    // Remove from trash
    trashBin.splice(index, 1);
    
    // Save changes
    saveWorkbooks();
    saveTrashBin();
    
    // Update UI
    renderEnvironments();
    if (currentTab === destinationTab) {
        renderLinks(currentTab);
    }
    
    // Close and reopen modal to refresh
    document.getElementById('trash-bin-modal').style.display = 'none';
    setTimeout(() => {
        openTrashBinModal();
    }, 100);
    
    alert(`"${item.title}" restored successfully`);
}