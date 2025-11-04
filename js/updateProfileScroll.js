// Call this when profiles change
function updateProfileScroll() {
    // Just update the scroll state without calling checkProfileScroll
    const profileTabsContainer = document.getElementById('profile-tabs-container');
    if (profileTabsContainer) {
        const needsScroll = profileTabsContainer.scrollWidth > profileTabsContainer.clientWidth;
        if (needsScroll) {
            profileTabsContainer.classList.add('needs-scroll');
        } else {
            profileTabsContainer.classList.remove('needs-scroll');
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