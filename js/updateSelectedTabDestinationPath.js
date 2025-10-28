// Add function to show selected tab destination path
function updateSelectedTabDestinationPath() {
    if (selectedDestinationEnvironment && selectedDestinationProfile) {
        // Find the workbook for the selected profile
        let workbookName = '';
        workbooks.forEach(workbook => {
            if (workbook.profiles.some(p => p.id === selectedDestinationProfile.id)) {
                workbookName = workbook.name;
            }
        });
        
        const pathElement = document.createElement('div');
        pathElement.className = 'selected-destination-path';
        pathElement.innerHTML = `
            Selected destination: <strong>${workbookName} → ${selectedDestinationProfile.name} → ${selectedDestinationEnvironment.name}</strong>
        `;
        
        // Remove any existing path display
        const existingPath = document.querySelector('#move-tab-destinations .selected-destination-path');
        if (existingPath) {
            existingPath.remove();
        }
        
        // Add the path display at the top of destinations
        const destinationsContainer = document.getElementById('move-tab-destinations');
        destinationsContainer.insertBefore(pathElement, destinationsContainer.firstChild);
    }
}