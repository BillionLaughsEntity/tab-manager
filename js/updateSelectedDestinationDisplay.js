// Function to update selected destination display
function updateSelectedDestinationDisplay() {
    let pathDisplay = document.getElementById('selected-destination-path');
    if (!pathDisplay) {
        pathDisplay = document.createElement('div');
        pathDisplay.id = 'selected-destination-path';
        pathDisplay.className = 'selected-destination-path';
        document.querySelector('#move-link-modal .modal-header').after(pathDisplay);
    }
    
    if (selectedDestinationTab && selectedDestinationProfile && selectedDestinationEnvironment) {
        pathDisplay.innerHTML = `
            <strong>Destination:</strong> 
            ${selectedDestinationProfile.name} → 
            ${selectedDestinationEnvironment.name} → 
            ${selectedDestinationTab.name}
        `;
        pathDisplay.style.display = 'block';
    } else {
        pathDisplay.style.display = 'none';
    }
}