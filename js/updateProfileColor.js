// In updateProfileColor.js
function updateProfileColor(profile, color) {
    // If profile is an ID string, find the profile object
    if (typeof profile === 'string') {
        const currentWorkbook = getCurrentWorkbook();
        if (currentWorkbook && currentWorkbook.profiles) {
            profile = currentWorkbook.profiles.find(p => p.id === profile);
        }
    }
    
    if (profile && profile.color !== undefined) {
        profile.color = color;
        saveWorkbooks();
        renderProfileTabs();
        renderEnvironments(); // Re-render to update environment borders
    }
}