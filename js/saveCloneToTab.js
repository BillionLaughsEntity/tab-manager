// Save clone to tab operation
function saveCloneToTab() {
    if (!window.linksToClone || window.linksToClone.length === 0) return;
    if (!window.selectedCloneDestinationTab || !window.selectedCloneDestinationProfile || !window.selectedCloneDestinationEnvironment) {
        alert('Please select a destination tab');
        return;
    }
    
    // Clone each selected link
    window.linksToClone.forEach(originalLink => {
        const clonedLink = JSON.parse(JSON.stringify(originalLink));
        // Generate new unique ID
        clonedLink.id = 'link-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        // Add the cloned link to the destination tab
        window.selectedCloneDestinationTab.links.push(clonedLink);
    });
    
    saveWorkbooks();
    
    // Show success message
    const isSameProfile = window.selectedCloneDestinationProfile.id === getCurrentProfile().id;
    let message = `Successfully cloned ${window.linksToClone.length} link${window.linksToClone.length !== 1 ? 's' : ''}`;
    
    if (!isSameProfile) {
        message += ` to profile "${window.selectedCloneDestinationProfile.name}"`;
    }
    
    alert(message);
    
    // Refresh appropriate views
    if (isSameProfile && window.selectedCloneDestinationTab === currentTab) {
        // Same tab - refresh current view
        renderLinks(currentTab);
    } else if (isSameProfile) {
        // Same profile, different tab - just refresh environments
        renderEnvironments();
    } else {
        // Different profile - refresh everything
        renderProfileTabs();
        renderEnvironments();
    }
    
    // Clear selection and exit selection mode
    selectedLinks.clear();
    toggleSelectionMode();
    
    // Clean up
    window.linksToClone = null;
    window.selectedCloneDestinationTab = null;
    window.selectedCloneDestinationProfile = null;
    window.selectedCloneDestinationEnvironment = null;
    
    document.getElementById('clone-to-tab-modal').style.display = 'none';
}