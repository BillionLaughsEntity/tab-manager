// Clone selected links
function cloneSelectedLinks() {
    if (selectedLinks.size === 0) return;
    
    // Create clones of selected links
    const linksToClone = Array.from(selectedLinks).map(linkId => 
        currentTab.links.find(link => link.id === linkId)
    );
    
    // Clone each link with new IDs
    linksToClone.forEach(originalLink => {
        const clonedLink = JSON.parse(JSON.stringify(originalLink));
        clonedLink.id = 'link-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        // Add the cloned link to the current tab
        currentTab.links.push(clonedLink);
    });
    
    // Save and refresh
    saveWorkbooks();
    renderLinks(currentTab);
    
    // Show success message
    // alert(`Successfully cloned ${linksToClone.length} link${linksToClone.length !== 1 ? 's' : ''}`);
    
    // Clear selection and exit selection mode (optional)
    // selectedLinks.clear();
    // toggleSelectionMode();
}