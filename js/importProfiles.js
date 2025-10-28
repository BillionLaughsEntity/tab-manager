// Helper function to import profiles
function importProfiles(profilesElement) {
    const newProfiles = [];
    const profileElements = profilesElement.getElementsByTagName('profile');
    
    for (let i = 0; i < profileElements.length; i++) {
        const profileElement = profileElements[i];
        const profile = {
            id: profileElement.getAttribute('id') || 'profile-' + Date.now() + i,
            name: profileElement.getAttribute('name') || 'Imported Profile ' + (i + 1),
            color: profileElement.getAttribute('color') || '#3498db',
            environments: []
        };
        
        const environmentsElement = profileElement.getElementsByTagName('environments')[0];
        if (environmentsElement) {
            profile.environments = importEnvironments(environmentsElement);
        }
        
        newProfiles.push(profile);
    }
    
    return newProfiles;
}