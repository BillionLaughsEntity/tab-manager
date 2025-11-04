function debugProfileClicks() {
    const container = document.querySelector('.profile-tabs-container');
    if (!container) {
        console.log('Profile container not found for debug');
        return;
    }
    
    // Remove any existing listeners
    const newContainer = container.cloneNode(true);
    container.parentNode.replaceChild(newContainer, container);
    
    const debugContainer = document.querySelector('.profile-tabs-container');
    
    // Add multiple listeners to catch clicks at different phases
    debugContainer.addEventListener('click', function(e) {
        console.log('=== PROFILE CLICK CAPTURED ===');
        console.log('Target:', e.target);
        console.log('Current target:', e.currentTarget);
        console.log('Event phase:', e.eventPhase);
        
        const profileTab = e.target.closest('.profile-tab');
        if (profileTab) {
            console.log('✅ Profile tab clicked:', profileTab);
            console.log('✅ Profile ID:', profileTab.dataset.profileId);
            console.log('✅ Has active class:', profileTab.classList.contains('active'));
        } else {
            console.log('❌ Click not on profile tab');
        }
        
        // Don't prevent default - let the normal flow continue
    }, true); // Use capture phase
    
    console.log('Debug click listener added');
}