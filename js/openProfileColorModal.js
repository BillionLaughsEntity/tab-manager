// Add this function to your main JavaScript file or profiles.js
function openProfileColorModal(profile) {
    // Use the existing color modal but pass the profile info
    openColorModal(profile.id, profile.color || '#3498db');
}