function fixProfileTabsScrolling() {
    const container = document.querySelector('.profile-tabs-container');
    
    // Remove any existing wheel listeners to avoid conflicts
    const newContainer = container.cloneNode(true);
    container.parentNode.replaceChild(newContainer, container);
    
    // Add robust wheel handler
    newContainer.addEventListener('wheel', function(e) {
        console.log('Wheel event captured:', e.deltaY);
        
        // Convert vertical wheel to horizontal scroll
        if (Math.abs(e.deltaY) > 0) {
            this.scrollLeft += e.deltaY * 1.5; // Adjust sensitivity
            e.preventDefault();
            e.stopPropagation();
            console.log('Scrolled to:', this.scrollLeft);
        }
    }, { passive: false, capture: true });
    
    console.log('Profile tabs scrolling fixed');
}