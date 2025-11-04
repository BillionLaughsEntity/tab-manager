function fixProfileTabsScrolling() {
    const container = document.querySelector('.profile-tabs-container');
    
    // Remove any existing wheel listeners
    const newContainer = container.cloneNode(true);
    container.parentNode.replaceChild(newContainer, container);
    
    const fixedContainer = document.querySelector('.profile-tabs-container');
    
    fixedContainer.addEventListener('wheel', function(e) {
        // Only handle events that occur within this container
        const rect = this.getBoundingClientRect();
        const isInContainer = e.clientX >= rect.left && e.clientX <= rect.right && 
                              e.clientY >= rect.top && e.clientY <= rect.bottom;
        
        if (!isInContainer) return; // Ignore events outside container
        
        // Check if we have significant vertical wheel movement
        if (Math.abs(e.deltaY) > 5) {
            const currentScroll = this.scrollLeft;
            const newScroll = currentScroll + (e.deltaY * 2);
            
            // Only prevent default if we're actually going to scroll
            const maxScroll = this.scrollWidth - this.clientWidth;
            
            if (newScroll >= 0 && newScroll <= maxScroll) {
                this.scrollLeft = newScroll;
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            } else if (newScroll < 0 && currentScroll > 0) {
                // Scrolling past start - scroll to start
                this.scrollLeft = 0;
                e.preventDefault();
                e.stopPropagation();
            } else if (newScroll > maxScroll && currentScroll < maxScroll) {
                // Scrolling past end - scroll to end
                this.scrollLeft = maxScroll;
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }, { passive: false });
    
    console.log('Fixed profile tabs scrolling - should not break clicks');
}

