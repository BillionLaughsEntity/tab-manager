function setupContainerScrolling() {
    // Profile tabs horizontal scrolling
    const profileContainer = document.querySelector('.profile-tabs-container');
    if (profileContainer) {
        profileContainer.addEventListener('wheel', function(e) {
            if (Math.abs(e.deltaY) > 5) {
                this.scrollLeft += e.deltaY;
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    console.log('Container-only scrolling enabled');
}
