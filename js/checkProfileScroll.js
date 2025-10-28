function checkProfileScroll() {
    const container = document.getElementById('profile-tabs-container');
    const isScrollable = container.scrollWidth > container.clientWidth;
    
    if (isScrollable) {
        container.classList.add('scrollable');
    } else {
        container.classList.remove('scrollable');
    }
}