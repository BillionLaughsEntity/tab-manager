// Update selected destination display for clone
function updateCloneDestinationDisplay() {
    const pathDisplay = document.getElementById('clone-destination-path');
    
    if (window.selectedCloneDestinationTab && window.selectedCloneDestinationProfile && window.selectedCloneDestinationEnvironment) {
        pathDisplay.innerHTML = `
            <strong>Destination:</strong> 
            ${window.selectedCloneDestinationProfile.name} → 
            ${window.selectedCloneDestinationEnvironment.name} → 
            ${window.selectedCloneDestinationTab.name}
        `;
        pathDisplay.style.display = 'block';
    } else {
        pathDisplay.style.display = 'none';
    }
}