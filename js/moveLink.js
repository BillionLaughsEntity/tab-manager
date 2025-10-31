// js/moveLink.js - UPDATED VERSION (core function only)

// Fix moveLink to properly move (not duplicate) the link
function moveLink(link, destinationTab) {
    console.log('Moving link:', link.title, 'to tab:', destinationTab.name);
    
    // Find the actual link object in the current tab
    const linkIndex = currentTab.links.findIndex(l => l.id === link.id);
    if (linkIndex === -1) {
        console.error('Link not found in current tab');
        return;
    }
    
    // Remove link from current tab (using splice to get the actual object)
    const [movedLink] = currentTab.links.splice(linkIndex, 1);
    
    // Add link to destination tab
    if (!destinationTab.links) {
        destinationTab.links = [];
    }
    destinationTab.links.push(movedLink);
    
    saveWorkbooks();
    renderEnvironments();
    
    // Refresh the current tab display
    if (currentTab) {
        renderLinks(currentTab);
    }
    
    // Show success message
    alert(`Link "${movedLink.title}" moved successfully to "${destinationTab.name}"`);
}

// REMOVED: All event listener code from this file
// The event listeners will be handled by move-link-modal.js