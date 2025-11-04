function resetProfileFunctionality() {
    console.log('=== RESETTING PROFILE FUNCTIONALITY ===');
    
    // Remove all event listeners by cloning the container
    const container = document.querySelector('.profile-tabs-container');
    const newContainer = container.cloneNode(true);
    container.parentNode.replaceChild(newContainer, container);
    
    // Re-render profile tabs to ensure proper event attachment
    if (typeof renderProfileTabs === 'function') {
        renderProfileTabs();
    }
    
    console.log('Profile functionality reset');
}

