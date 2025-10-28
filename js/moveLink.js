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

// Also update the save move link button handler
document.getElementById('save-move-link-btn').addEventListener('click', () => {
    if (window.bulkLinksToMove) {
        // Bulk move operation
        if (selectedDestinationTab) {
            saveBulkMoveLinks(selectedDestinationTab);
            moveLinkModal.style.display = 'none';
        } else {
            alert('Please select a destination tab');
        }
    } else {
        // Single move operation
        if (linkToMove && selectedDestinationTab) {
            moveLink(linkToMove, selectedDestinationTab);
            moveLinkModal.style.display = 'none';
        } else {
            alert('Please select a destination tab');
        }
    }
});