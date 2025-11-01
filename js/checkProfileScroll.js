function updateProfileScroll() {
    const profileTabsContainer = document.getElementById('profile-tabs-container');
    if (!profileTabsContainer) return;
    
    // Force scrollbar to appear if content overflows
    profileTabsContainer.style.overflowX = 'auto';
    
    // Optional: Add a class when scrolling is needed
    const needsScroll = profileTabsContainer.scrollWidth > profileTabsContainer.clientWidth;
    if (needsScroll) {
        profileTabsContainer.classList.add('needs-scroll');
    } else {
        profileTabsContainer.classList.remove('needs-scroll');
    }
}

// Call this after rendering profiles and on window resize
window.addEventListener('resize', updateProfileScroll);