// selectTab.js - Fixed version
function selectTab(tab, environment) {
    console.log('=== SELECT TAB DEBUG ===');
    console.log('Selecting tab:', tab.name);
    console.log('From environment:', environment.name);
    
    currentTab = tab;
    currentEnvironment = environment;
    
    // Update UI to show selected state
    document.querySelectorAll('.tab').forEach(tabEl => {
        tabEl.classList.remove('active');
    });
    
    const tabElement = document.querySelector(`.tab[data-tab-id="${tab.id}"]`);
    if (tabElement) {
        tabElement.classList.add('active');
    } else {
        console.error('Tab element not found for selection:', tab.id);
    }
    
    // Update tab header
    const currentTabName = document.getElementById('current-tab-name');
    if (currentTabName) {
        currentTabName.textContent = tab.name;
    }
    
    // Show/hide appropriate sections
    const linksGrid = document.getElementById('links-grid');
    const noTabsMessage = document.getElementById('no-tabs-message');
    const addLinkSection = document.getElementById('add-link-section');
    
    if (linksGrid) linksGrid.style.display = 'none';
    if (noTabsMessage) noTabsMessage.style.display = 'none';
    if (addLinkSection) addLinkSection.style.display = 'none';
    
    // Render the links for this tab
    renderLinks();
    
    console.log('Tab selected successfully:', tab.name);
}