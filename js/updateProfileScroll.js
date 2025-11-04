// Call this when profiles change
function updateProfileScroll() {
    const profileTabsContainer = document.getElementById('profile-tabs-container');
    if (profileTabsContainer) {
        const needsScroll = profileTabsContainer.scrollWidth > profileTabsContainer.clientWidth;
        console.log('Profile Scroll Debug:', {
            scrollWidth: profileTabsContainer.scrollWidth,
            clientWidth: profileTabsContainer.clientWidth,
            needsScroll: needsScroll,
            hasScrollableClass: profileTabsContainer.classList.contains('scrollable')
        });
        
        if (needsScroll) {
            profileTabsContainer.classList.add('scrollable');
            console.log('Added scrollable class');
        } else {
            profileTabsContainer.classList.remove('scrollable');
            console.log('Removed scrollable class');
        }
    }
}

// Add mouse wheel scrolling for profile tabs
function setupProfileTabsScrolling() {
    const profileTabsContainer = document.getElementById('profile-tabs-container');
    const workbookTabsContainer = document.getElementById('workbook-tabs-container');
    
    if (profileTabsContainer) {
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
    
    if (workbookTabsContainer) {
        workbookTabsContainer.addEventListener('wheel', (e) => {
            // Only handle horizontal scrolling
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                return;
            }
            
            // Prevent vertical page scrolling
            e.preventDefault();
            
            // Scroll horizontally based on vertical wheel movement
            workbookTabsContainer.scrollLeft += e.deltaY;
        });
    }

    setTimeout(fixProfileTabsScrolling, 300);
}

// Simple scroll check function
function checkProfileScroll() {
    updateProfileScroll();
}