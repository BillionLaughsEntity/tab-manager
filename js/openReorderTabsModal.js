// Open reorder tabs modal
function openReorderTabsModal(environment) {
    const reorderTabsList = document.getElementById('reorder-tabs-list');
    reorderTabsList.innerHTML = '';
    
    if (!environment.tabs || environment.tabs.length === 0) {
        reorderTabsList.innerHTML = '<div style="padding: 20px; text-align: center;">No tabs to reorder</div>';
        return;
    }
    
    environment.tabs.forEach((tab, index) => {
        const tabItem = document.createElement('div');
        tabItem.className = 'reorder-link-item';
        tabItem.dataset.tabId = tab.id;
        
        tabItem.innerHTML = `
            <i class="fas fa-grip-lines"></i>
            <div class="reorder-link-title">${tab.name}</div>
            <div class="reorder-link-url">${tab.links ? tab.links.length : 0} links</div>
            <div class="reorder-actions">
                <button class="reorder-btn move-up-btn" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="reorder-btn move-down-btn" ${index === environment.tabs.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-down"></i>
                </button>
            </div>
        `;
        
        reorderTabsList.appendChild(tabItem);
        
        // Add event listeners for move up/down buttons
        const moveUpBtn = tabItem.querySelector('.move-up-btn');
        const moveDownBtn = tabItem.querySelector('.move-down-btn');
        
        moveUpBtn.addEventListener('click', () => {
            moveTabUp(tab.id, environment);
            openReorderTabsModal(environment); // Refresh the modal
        });
        
        moveDownBtn.addEventListener('click', () => {
            moveTabDown(tab.id, environment);
            openReorderTabsModal(environment); // Refresh the modal
        });
    });
    
    document.getElementById('reorder-tabs-modal').style.display = 'flex';
}