function debugProfileClicks() {
    const container = document.querySelector('.profile-tabs-container');
    if (!container) return;
    
    // Non-destructive approach - just add a passive listener
    container.addEventListener('click', function(e) {
        const profileTab = e.target.closest('.profile-tab');
        if (profileTab) {
            console.log('Debug: Profile tab clicked - ID:', profileTab.dataset.profileId);
        }
    }, { passive: true }); // Passive doesn't interfere with other handlers
}