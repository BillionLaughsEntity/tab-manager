function workingProfileTabsScroll() {
    const container = document.querySelector('.profile-tabs-container');
    
    // First, ensure CSS is applied
    container.style.overflowX = 'auto';
    container.style.overflowY = 'hidden';
    container.style.flexWrap = 'nowrap';
    
    // Remove and re-add to clear any stuck state
    const parent = container.parentNode;
    const clone = container.cloneNode(true);
    parent.replaceChild(clone, container);
    
    const newContainer = parent.querySelector('.profile-tabs-container');
    
    // Working wheel handler
    newContainer.addEventListener('wheel', function(e) {
        // Only handle significant vertical wheel movement
        if (Math.abs(e.deltaY) > 10) {
            // Store current scroll position
            const currentScroll = this.scrollLeft;
            
            // Apply scroll
            this.scrollLeft += e.deltaY * 1.5;
            
            // Check if scroll actually happened
            if (this.scrollLeft !== currentScroll) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Scroll successful:', currentScroll, '->', this.scrollLeft);
            } else {
                console.log('Scroll failed - position unchanged');
            }
        }
    }, { passive: false });
    
    console.log('Profile tabs scroll handler activated');
}

