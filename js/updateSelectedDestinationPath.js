// Update the destination path display for links
function updateSelectedDestinationPath() {
    if (selectedDestinationTab) {
        // Find the workbook, profile and environment for the selected tab
        let workbookName = '';
        let profileName = '';
        let environmentName = '';
        
        workbooks.forEach(workbook => {
            workbook.profiles.forEach(profile => {
                profile.environments.forEach(environment => {
                    environment.tabs.forEach(tab => {
                        if (tab.id === selectedDestinationTab.id) {
                            workbookName = workbook.name;
                            profileName = profile.name;
                            environmentName = environment.name;
                        }
                    });
                });
            });
        });
        
        const pathElement = document.getElementById('selected-destination-path');
        if (pathElement) {
            pathElement.innerHTML = `
                Selected destination: <strong>${workbookName} → ${profileName} → ${environmentName} → ${selectedDestinationTab.name}</strong>
            `;
            pathElement.style.display = 'block';
        }
    }
}