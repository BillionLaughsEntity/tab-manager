// Delete a profile
function deleteProfile(profileId) {
    const currentWorkbook = getCurrentWorkbook();
    if (currentWorkbook.profiles.length <= 1) {
        alert('You cannot delete the last profile.');
        return;
    }
    
    if (confirm('Are you sure you want to delete this profile? All environments and links will be lost.')) {
        currentWorkbook.profiles = currentWorkbook.profiles.filter(profile => profile.id !== profileId);
        saveWorkbooks();
        renderProfileTabs();
        
        // Switch to the first profile if the current one was deleted
        if (currentProfileId === profileId && currentWorkbook.profiles.length > 0) {
            switchProfile(currentWorkbook.profiles[0].id);
        }
    }
}