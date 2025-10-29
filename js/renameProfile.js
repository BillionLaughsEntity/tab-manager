// Rename a profile
function renameProfile(profile, newName) {
    profile.name = newName;
    saveWorkbooks();
    renderProfileTabs();
}