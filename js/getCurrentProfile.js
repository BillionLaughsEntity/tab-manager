// Get the current profile
function getCurrentProfile() {
    const currentWorkbook = getCurrentWorkbook();
    return currentWorkbook ? currentWorkbook.profiles.find(profile => profile.id === currentProfileId) : null;
}