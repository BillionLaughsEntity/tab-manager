// Call this when profiles change
function updateProfileScroll() {
    setTimeout(checkProfileScroll, 100); // Small delay to ensure DOM is updated
}

// Call updateProfileScroll after these operations:
// - Adding a new profile
// - Deleting a profile  
// - Renaming a profile
// - Any other operation that changes profile tabs

// Add mouse wheel scrolling for profile tabs
function setupProfileTabsScrolling() {
    const profileTabsContainer = document.getElementById('profile-tabs-container');
    
    profileTabsContainer.addEventListener('wheel', (e) => {
        // Only handle horizontal scrolling
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            return; // Let the browser handle horizontal scrolling
        }
        
        // Prevent vertical page scrolling
        e.preventDefault();
        
        // Scroll horizontally based on vertical wheel movement
        profileTabsContainer.scrollLeft += e.deltaY;
    });
}