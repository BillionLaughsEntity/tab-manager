function setupConservativeScrolling() {
    const container = document.querySelector('.profile-tabs-container');
    if (!container) return;
    
    console.log('Setting up conservative scrolling...');
    
    container.addEventListener('wheel', function(e) {
        // Only handle significant vertical wheel movement
        if (Math.abs(e.deltaY) > 10 && Math.abs(e.deltaX) === 0) {
            const currentScroll = this.scrollLeft;
            const maxScroll = this.scrollWidth - this.clientWidth;
            
            // Only prevent default if we're actually going to scroll
            const willScroll = (e.deltaY > 0 && currentScroll < maxScroll) || 
                             (e.deltaY < 0 && currentScroll > 0);
            
            if (willScroll) {
                this.scrollLeft += e.deltaY;
                e.preventDefault();
                console.log('Scrolling profile tabs:', this.scrollLeft);
            }
        }
        // Allow the event to continue for click handling
    }, { passive: false });
    
    console.log('Conservative scrolling enabled');
}