// Update profile color
function updateProfileColor(profile, color) {
    profile.color = color;
    saveWorkbooks();
    renderProfileTabs();
    renderEnvironments(); // Re-render to update environment borders
}